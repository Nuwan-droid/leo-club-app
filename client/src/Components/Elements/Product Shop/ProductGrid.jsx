import React from 'react';

const ProductGrid = ({ products, handleProductClick }) => (
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mt-10 mb-20 text-gray-800">Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
          onClick={() => handleProductClick(product)}
        >
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            {product.badge && (
              <div className="absolute bottom-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                {product.badge}
              </div>
            )}
          </div>
          <div className="p-1">
            <div className="bg-yellow-400 text-black px-3 py-2 rounded-b-lg">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-blue-800">Rs {product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-gray-600">
                    (Rs. {product.originalPrice})
                  </span>
                )}
              </div>
              <p className="text-sm mt-1">{product.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductGrid;