import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';

import leoTshirt from '../../../src/assets/Shop/leoTshirt.jpg';

import leoBand from '../../../src/assets/Shop/leoBand.jpg'; 
import lapsleeve from '../../../src/assets/Shop/lapsleeve1.png';

import tshirtSide1 from '../../../src/assets/Shop/leoTshirt_Front.png';
import tshirtSide2 from '../../../src/assets/Shop/leoTshirt_back.png';

import lapCoverSide1 from '../../../src/assets/Shop/lapsleeve2.png';
import lapCoverSide2 from '../../../src/assets/Shop/lapsleeve3.png';

import ProductGrid from '../Elements/Product Shop/ProductGrid';
import ProductDetail from '../Elements/Product Shop/ProductDetail';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const products = [
    {
      id: 1,
      name: 'LEO T Shirt',
      price: 1800,
      originalPrice: 2000,
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

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
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
        />
      ) : (
        <ProductGrid
          products={products}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default Shop;
