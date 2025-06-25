import React from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';

const ProductDetail = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  selectedImage,
  setSelectedImage,
  handleBackClick
}) => {
  const colorMap = {
    'Black': 'bg-black',
    'Dark Blue': 'bg-blue-900',
    'Dark Green': 'bg-green-900'
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={handleBackClick}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <div key={i} className="w-full h-20 rounded overflow-hidden">
                <img
                  src={img}
                  alt={`Product view ${i + 1}`}
                  className={`w-full h-full object-cover cursor-pointer transition-all duration-200 ${
                    selectedImage === img ? 'ring-2 ring-yellow-400' : 'hover:opacity-80'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name} 2025</h1>
          <div className="text-3xl font-bold text-gray-800 mb-2">Rs {product.price}.00</div>
          {product.originalPrice && (
            <div className="text-red-500 text-sm">(Rs. {product.originalPrice})</div>
          )}

          <div>
            <h3 className="font-bold text-gray-800 mb-3">SELECT SIZE</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg font-bold ${
                    selectedSize === size
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-yellow-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.colors && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">SELECT COLOR</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${colorMap[color]} ${
                      selectedColor === color ? 'ring-2 ring-yellow-400' : ''
                    } border-gray-300 hover:scale-110 transition-transform`}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-bold text-gray-800 mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100  text-gray-800"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold px-4  text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border  text-gray-800 border-gray-300 rounded hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button className="w-full font-bold py-3 px-6 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2">
            <ShoppingCart size={20} />
            <span>Buy Now</span>
          </button>

          {product.material && (
            <div className="pt-6 border-t">
              <h3 className="font-bold text-gray-800 mb-2">PRODUCT MATERIAL</h3>
              <ul className="text-gray-600 space-y-1">
                {product.material.map((material, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
