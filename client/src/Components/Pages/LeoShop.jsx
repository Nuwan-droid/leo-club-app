import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft, X } from 'lucide-react';

import leoTshirt from '../../../src/assets/Shop/leoTshirt.jpg';
import leoBand from '../../../src/assets/Shop/leoBand.jpg'; 
import lapsleeve from '../../../src/assets/Shop/lapsleeve1.png';
import tshirtSide1 from '../../../src/assets/Shop/leoTshirt_Front.png';
import tshirtSide2 from '../../../src/assets/Shop/leoTshirt_back.png';
import lapCoverSide1 from '../../../src/assets/Shop/lapsleeve2.png';
import lapCoverSide2 from '../../../src/assets/Shop/lapsleeve3.png';

import ProductGrid from '../Elements/Product Shop/ProductGrid';
import ProductDetail from '../Elements/Product Shop/ProductDetail';

import CartSidebar from './../Elements/Product Shop/CartSidebar';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Add cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'LEO T Shirt',
      price: 1800,
      originalPrice:2000,
      image: leoTshirt,
      images: [leoTshirt, tshirtSide1, tshirtSide2],
      description: 'Official T Shirt of LEO Club',
      material: ['Crocodile(220 GSM)', 'Machine-wash'],
      sizes: ['XS','S','M', 'L', 'XL', 'XXL', 'XXXL'],
      badge: 'HURRY UP Guys'
    },
    {
      id: 2,
      name: 'LEO Band',
      price: 300,
      image: leoBand,
      images: [leoBand],
      description: 'Official Hand Band of LEO Club',
      sizes: ['One Size']
    },
    {
      id: 3,
      name: 'Lap Sleeve Case',
      price: 3500,
      image: lapsleeve,
      images: [lapsleeve, lapCoverSide1, lapCoverSide2],
      description: 'Official Lap Sleeve case of LEO Club',
      sizes: ['One Size'],
      colors: ['Black', 'Dark Blue', 'Dark Green']
    }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors ? product.colors[0] : '');
    setQuantity(1);
    setSelectedImage(product.image);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
    setSelectedImage(null);
  };

  // Add cart functions
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
      {/* Add floating cart button */}
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
          addToCart={addToCart} // Pass addToCart function
        />
      ) : (
        <ProductGrid
          products={products}
          handleProductClick={handleProductClick}
        />
      )}

      {/* Add CartSidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default Shop;