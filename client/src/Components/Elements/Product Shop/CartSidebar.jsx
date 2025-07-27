// CartSidebar.jsx
import React from 'react';
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) => {
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" 
          onClick={onClose} 
        />
      )}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200 bg-blue-800 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <ShoppingCart size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-sm">{cartItems.length} items</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white/10 p-2 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {cartItems.length === 0 ? (
            <div className="text-center mt-16 text-black">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={32} />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2 text-gray-500">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-xl p-4 shadow border hover:border-blue-300 transition"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: <span className="text-blue-800">{item.size}</span>
                        {item.color && <span> • Color: <span className="text-blue-800">{item.color}</span></span>}
                      </p>
                      <p className="font-bold text-blue-800 mt-1">Rs {item.price}.00</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-gray-100 text-blue-800 border rounded-full hover:bg-red-100 hover:text-red-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-100 text-blue-800 border rounded-full hover:bg-green-100 hover:text-green-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-900 p-1 rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="p-4 mb-4 bg-blue-50 rounded">
              <div className="flex justify-between items-center text-black font-semibold">
                <span>Total Amount:</span>
                <span className="text-xl text-blue-800">Rs {totalAmount}.00</span>
              </div>
            </div>
            <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition transform hover:scale-105 active:scale-95">
              <span className="flex items-center justify-center space-x-2">
                <ShoppingCart size={20} />
                <span>Buy Now</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;