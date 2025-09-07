import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

import ProductGrid from '../Elements/Product Shop/ProductGrid';
import ProductDetail from '../Elements/Product Shop/ProductDetail';
import CartSidebar from '../Elements/Product Shop/CartSidebar';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User info state, auto-filled from localStorage if exists, null for visitors
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Load user info from localStorage if logged in
    const storedUser = localStorage.getItem('leoUserInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }

    // Fetch products
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
      } catch (err) {
        console.error('Error fetching products:', err);
      }
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

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors relative"
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
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
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        userInfo={userInfo}
      />
    </div>
  );
};

export default Shop;