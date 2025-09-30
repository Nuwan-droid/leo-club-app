import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

function VisitorForm({ visitorInfo, setVisitorInfo, onProceed, isProcessing }) {
  return (
    <div className="mb-4 text-black">
      <h3 className="font-bold text-gray-800 mb-2">Enter your details for checkout</h3>
      <div className="grid grid-cols-1 gap-2">
        <input
          type="text"
          placeholder="First Name"
          value={visitorInfo.firstName}
          onChange={e => setVisitorInfo({ ...visitorInfo, firstName: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={visitorInfo.lastName}
          onChange={e => setVisitorInfo({ ...visitorInfo, lastName: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={visitorInfo.email}
          onChange={e => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={visitorInfo.mobile}
          onChange={e => setVisitorInfo({ ...visitorInfo, mobile: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={visitorInfo.address}
          onChange={e => setVisitorInfo({ ...visitorInfo, address: e.target.value })}
          className="border p-2 rounded mb-2"
        />
      </div>
      <button
        className={`w-full bg-yellow-400 text-black font-bold py-2 rounded-xl mt-2 hover:bg-yellow-500 transition ${
          isProcessing ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={isProcessing}
        onClick={onProceed}
      >
        {isProcessing ? "Processing..." : "Proceed to Pay"}
      </button>
    </div>
  );
}

function getCartItemKey(item) {
  let prodId = typeof item.productId === 'object' && item.productId !== null
    ? item.productId._id || item.productId.id || JSON.stringify(item.productId)
    : item.productId;
  return `${prodId}-${item.size}-${item.color || ''}`;
}

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  userInfo,
  token
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: ""
  });

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const validateVisitorInfo = (info) => {
    if (!info.firstName.trim() || !info.lastName.trim() || !info.email.trim() ||
        !info.mobile.trim() || !info.address.trim()) return "All fields are required";
    if (!/^[0-9]{10}$/.test(info.mobile)) return "Mobile number must be exactly 10 digits";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(info.email)) return "Invalid email address";
    return null;
  };

const proceedToPay = async (info) => {
  setIsProcessingPayment(true);
  try {
    const itemsSummary = cartItems.map(item =>
      `${item.name} (Size: ${item.size}${item.color ? `, Color: ${item.color}` : ""}) x${item.quantity}`
    ).join(", ");

    const orderId = `CART-${Date.now()}`;
    const paymentPayload = {
      order_id: orderId,
      amount: totalAmount,
      items: itemsSummary,
      currency: "LKR",
      cart: cartItems.map(item => ({
        productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
        name: item.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Only for visitors
    if (!userInfo) {
      paymentPayload.first_name = info.firstName;
      paymentPayload.last_name = info.lastName;
      paymentPayload.email = info.email;
      paymentPayload.phone = info.mobile;
      paymentPayload.address = info.address;
    }

    // Add Authorization header for members
    const headers = { "Content-Type": "application/json" };
    if (token && userInfo) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch("http://localhost:5001/api/payment/payhere-init", {
      method: "POST",
      headers,
      body: JSON.stringify(paymentPayload),
    });
    
      const paymentData = await response.json();

      if (!response.ok) {
        toast.error(paymentData.message || "Payment initialization failed.");
        setIsProcessingPayment(false);
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.payhere.lk/pay/checkout";
      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Failed to connect to payment server.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleVisitorProceed = async () => {
    const error = validateVisitorInfo(visitorInfo);
    if (error) { toast.error(error); return; }
    await proceedToPay(visitorInfo);
  };

  const handleCartBuyNow = async () => {
    if (cartItems.length === 0) { toast.error("No items in cart to purchase."); return; }
    if (isProcessingPayment) return;
    if (!userInfo) { setShowVisitorForm(true); return; }
    await proceedToPay(userInfo);
  };

  const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" onClick={onClose} />}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200 bg-blue-800 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <ShoppingCart size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <p className="text-sm">{cartItems.length} items</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white" style={{ maxHeight: "calc(100vh - 184px)" }}>
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
              {cartItems.map((item, index) => {
                const itemKey = getCartItemKey(item);
                return (
                  <div key={itemKey} className="group bg-white rounded-xl p-4 shadow border hover:border-blue-300 transition">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
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
                            onClick={() => handleQuantityUpdate(itemKey, item.quantity - 1)}
                            className="p-1 bg-gray-100 text-blue-800 border rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityUpdate(itemKey, item.quantity + 1)}
                            className="p-1 bg-gray-100 text-blue-800 border rounded-full hover:bg-green-100 hover:text-green-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(itemKey)}
                          className="text-red-500 hover:text-red-900 p-1 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
             
              {cartItems.length > 0 && showVisitorForm && !userInfo && (
                <VisitorForm
                  visitorInfo={visitorInfo}
                  setVisitorInfo={setVisitorInfo}
                  onProceed={handleVisitorProceed}
                  isProcessing={isProcessingPayment}
                />
              )}
            </div>
          )}
        </div>


        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-200 sticky bottom-0 w-full" style={{ zIndex: 51 }}>
            <div className="p-6">
              <div className="p-4 mb-4 bg-blue-50 rounded flex justify-between font-semibold text-black">
                <span>Total Amount:</span>
                <span className="text-xl text-blue-800">Rs {totalAmount}.00</span>
              </div>
             
              {!showVisitorForm || userInfo ? (
                <button
                  className={`w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                    isProcessingPayment ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCartBuyNow}
                  disabled={isProcessingPayment}
                >
                  <ShoppingCart size={20} />
                  <span>{isProcessingPayment ? "Processing..." : "Buy Now"}</span>
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;