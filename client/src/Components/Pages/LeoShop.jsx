import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

import ProductGrid from '../Elements/Product Shop/ProductGrid';
import ProductDetail from '../Elements/Product Shop/ProductDetail';
import CartSidebar from '../Elements/Product Shop/CartSidebar';

// Utility for unique cart item id (fixes duplicate key bug)
function getCartItemId(item) {
  let prodId = typeof item.productId === 'object' && item.productId !== null
    ? item.productId._id || item.productId.id || JSON.stringify(item.productId)
    : item.productId;
  return `${prodId}-${item.size}-${item.color || ''}`;
}

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedToken = localStorage.getItem('leoToken');
        if (!storedToken) {
          loadLocalCart();
          setIsLoadingAuth(false);
          return;
        }
        const response = await fetch('http://localhost:5001/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
          setToken(storedToken);
          await loadPersistentCart(storedToken);
          await syncLocalCartWithServer(storedToken);
        } else {
          localStorage.removeItem('leoToken');
          loadLocalCart();
        }
      } catch (error) {
        localStorage.removeItem('leoToken');
        loadLocalCart();
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkAuthStatus();
  }, []);

  const loadLocalCart = () => {
    try {
      const localCart = localStorage.getItem('leoCart');
      if (localCart) {
        const cartData = JSON.parse(localCart);
        setCartItems(Array.isArray(cartData) ? cartData : []);
      }
    } catch (error) { /* ignore */ }
  };

  const saveLocalCart = (items) => {
    try {
      localStorage.setItem('leoCart', JSON.stringify(items));
    } catch (error) { /* ignore */ }
  };

  const loadPersistentCart = async (authToken) => {
    try {
      setCartLoading(true);
      const response = await fetch('http://localhost:5001/api/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.cart.items || []);
        }
      } else {
        loadLocalCart();
      }
    } catch (error) {
      loadLocalCart();
    } finally {
      setCartLoading(false);
    }
  };

  const syncLocalCartWithServer = async (authToken) => {
    try {
      const localCart = localStorage.getItem('leoCart');
      if (!localCart) return;
      const localCartItems = JSON.parse(localCart);
      if (!Array.isArray(localCartItems) || localCartItems.length === 0) return;
      const response = await fetch('http://localhost:5001/api/cart/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ localCartItems })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.cart.items || []);
          localStorage.removeItem('leoCart');
          toast.success('Your cart has been updated!');
        }
      }
    } catch (error) { /* ignore */ }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products/allproducts');
        const data = await res.json();
        const transformedProducts = data.map(product => ({
          ...product,
          id: product._id || product.id,
          image: product.mainImage,
          additionalImages: Array.isArray(product.additionalImages) ? product.additionalImages : []
        }));
        setProducts(transformedProducts);
      } catch (err) { /* ignore */ }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || '');
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor('');
    }
    setQuantity(1);
    setSelectedImage(product.mainImage || null);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
    setSelectedImage(null);
  };

  const addToCart = async (item) => {
    if (userInfo && token) {
      await addToPersistentCart(item);
    } else {
      addToLocalCart(item);
    }
    setIsCartOpen(true);
  };

  const addToPersistentCart = async (item) => {
    try {
      setCartLoading(true);
      const payload = {
        productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size,
        color: item.color || '',
        quantity: item.quantity
      };
      const response = await fetch('http://localhost:5001/api/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.cart.items || []);
          toast.success('Item added to cart!');
        }
      } else {
        addToLocalCart(item);
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      addToLocalCart(item);
      toast.error('Error adding item to cart');
    } finally {
      setCartLoading(false);
    }
  };

  const addToLocalCart = (item) => {
    setCartItems(prevItems => {
      const itemId = getCartItemId(item);
      const existingItem = prevItems.find(cartItem => getCartItemId(cartItem) === itemId);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(cartItem =>
          getCartItemId(cartItem) === itemId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        newItems = [...prevItems, { ...item, id: itemId }];
      }
      saveLocalCart(newItems);
      toast.success('Item added to cart!');
      return newItems;
    });
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    if (userInfo && token) {
      await updatePersistentCartItem(itemId, newQuantity);
    } else {
      updateLocalCartItem(itemId, newQuantity);
    }
  };

  const updatePersistentCartItem = async (itemId, newQuantity) => {
    try {
      const item = cartItems.find(item => getCartItemId(item) === itemId);
      if (!item) return;
      const response = await fetch('http://localhost:5001/api/cart/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
          size: item.size,
          color: item.color || '',
          quantity: newQuantity
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.cart.items || []);
        }
      } else {
        updateLocalCartItem(itemId, newQuantity);
      }
    } catch (error) {
      updateLocalCartItem(itemId, newQuantity);
    }
  };

  const updateLocalCartItem = (itemId, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        getCartItemId(item) === itemId ? { ...item, quantity: newQuantity } : item
      );
      saveLocalCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = async (itemId) => {
    if (userInfo && token) {
      await removeFromPersistentCart(itemId);
    } else {
      removeFromLocalCart(itemId);
    }
  };

  const removeFromPersistentCart = async (itemId) => {
    try {
      const item = cartItems.find(item => getCartItemId(item) === itemId);
      if (!item) return;
      const response = await fetch('http://localhost:5001/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
          size: item.size,
          color: item.color || ''
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.cart.items || []);
          toast.success('Item removed from cart');
        }
      } else {
        removeFromLocalCart(itemId);
      }
    } catch (error) {
      removeFromLocalCart(itemId);
    }
  };

  const removeFromLocalCart = (itemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => getCartItemId(item) !== itemId);
      saveLocalCart(newItems);
      toast.success('Item removed from cart');
      return newItems;
    });
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 mt-20 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors relative"
          disabled={cartLoading}
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          {cartLoading && (
            <div className="absolute inset-0 bg-purple-600 bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleBackClick={handleBackClick}
          addToCart={addToCart}
          userInfo={userInfo}
          token={token}
        />
      ) : (
        <ProductGrid
          products={products}
          handleProductClick={handleProductClick}
        />
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems.map(item => ({
          ...item,
          id: getCartItemId(item)
        }))}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        userInfo={userInfo}
        token={token}
      />
    </div>
  );
};

export default Shop;