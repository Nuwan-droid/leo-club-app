import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
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
  handleBackClick,
  addToCart,
  userInfo,
  token  // Make sure token is passed as prop
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

  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#EF4444',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Yellow': '#F59E0B',
    'Gray': '#6B7280',
    'Dark Blue': '#1E40AF',
    'Dark Green': '#047857',
    'Purple': '#8B5CF6',
    'Pink': '#EC4899',
    'Orange': '#F97316',
    'Brown': '#A3725F',
    'Navy': '#1E3A8A',
    'Maroon': '#7F1D1D',
  };

  const validateSelection = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return false;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return false;
    }
    return true;
  };

  const validateVisitorInfo = (info) => {
    if (!info.firstName.trim() || !info.lastName.trim() || !info.email.trim() ||
        !info.mobile.trim() || !info.address.trim()) {
      return "All fields are required";
    }
    if (!/^[0-9]{10}$/.test(info.mobile)) {
      return "Mobile number must be exactly 10 digits";
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(info.email)) {
      return "Invalid email address";
    }
    return null;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };
    addToCart(cartItem);
  };

  const handleBuyNow = async () => {
    if (!validateSelection()) return;
    if (isProcessingPayment) return;
    if (!userInfo) {
      setShowVisitorForm(true);
      return;
    }
    await proceedToPay(userInfo);
  };

  const proceedToPay = async (info) => {
    setIsProcessingPayment(true);
    try {
      const totalAmount = (product.price * quantity).toFixed(2);
      const orderId = `PRODUCT-${product.id}-${Date.now()}`;
      
      const paymentPayload = {
        order_id: orderId,
        amount: totalAmount,
        currency: "LKR",
        productId: product.id,
        productName: product.name,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        unitPrice: product.price,
        totalAmount: totalAmount
      };

      // Add visitor info only if not a member
      if (!userInfo) {
        paymentPayload.first_name = info.firstName;
        paymentPayload.last_name = info.lastName;
        paymentPayload.email = info.email;
        paymentPayload.phone = info.mobile;
        paymentPayload.address = info.address;
      }

      // Prepare headers - include token if user is logged in (member)
      const headers = {
        "Content-Type": "application/json"
      };

      if (token && userInfo) {
        headers.Authorization = `Bearer ${token}`;
        console.log(`Making payment request as member: ${userInfo.email}`);
      } else {
        console.log('Making payment request as visitor');
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

      // Create and submit PayHere form
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
    if (error) {
      toast.error(error);
      return;
    }
    await proceedToPay(visitorInfo);
  };

  const images = Array.isArray(product.additionalImages) ? [product.image, ...product.additionalImages] : [product.image];

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
            <img 
              src={selectedImage || 'default-image.jpg'} 
              alt={product.name} 
              className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="w-full h-20 rounded overflow-hidden">
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
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
          <div className="text-3xl font-bold text-blue-800 mb-2">Rs {product.price}.00</div>
          {product.originalPrice && (
            <div className="text-red-500 text-sm">(Rs. {product.originalPrice})</div>
          )}

          <div>
            <h3 className="font-bold text-gray-800 mb-3">SELECT SIZE</h3>
            <div className="flex space-x-2">
              {(Array.isArray(product.sizes) ? product.sizes : []).map((size) => (
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

          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">SELECT COLOR</h3>
              <div className="flex space-x-3">
                {(Array.isArray(product.colors) ? product.colors : []).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: colorMap[color] || '#000000' }}
                    className={`w-10 h-10 rounded-full border-2 ${
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
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 text-gray-800"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold px-4 text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border text-gray-800 border-gray-300 rounded hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-800">
                Rs {(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 font-bold h-fit py-3 px-6 rounded-lg bg-white text-black border-2 border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to cart</span>
            </button>
            {showVisitorForm && !userInfo ? (
              <VisitorForm
                visitorInfo={visitorInfo}
                setVisitorInfo={setVisitorInfo}
                onProceed={handleVisitorProceed}
                isProcessing={isProcessingPayment}
              />
            ) : (
              <button 
                onClick={handleBuyNow}
                disabled={isProcessingPayment}
                className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isProcessingPayment 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                <ShoppingCart size={20} />
                <span>{isProcessingPayment ? 'Processing...' : 'Buy Now'}</span>
              </button>
            )}
          </div>

          {product.material && (
            <div className="pt-6 border-t">
              <h3 className="font-bold text-gray-800 mb-2">PRODUCT MATERIAL</h3>
              <ul className="text-gray-600 space-y-1">
                {(Array.isArray(product.material) ? product.material : []).map((material, index) => (
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