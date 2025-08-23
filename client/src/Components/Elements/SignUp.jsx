import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";
import { toast } from "react-toastify";

export default function SignUp({ onClose }) {
  const [leoStatus, setLeoStatus] = useState("member");
  const [formData, setFormData] = useState({
    leo_Id: "",
    firstName: "",
    lastName: "",
    enrollmentNo: "",
    address: "",
    birthday: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const validateEnrollmentNo = (enrollmentNo) => {
    const regex = /^[a-zA-Z0-9]{5,}$/;
    return regex.test(enrollmentNo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    if (!leoStatus) {
      setError("Please select your membership status");
      toast.error("Please select your membership status");
      setIsLoading(false);
      return;
    }

    if (leoStatus === "member" && !formData.leo_Id.trim()) {
      setError("Leo ID is required for members");
      toast.error("Leo ID is required for members");
      setIsLoading(false);
      return;
    }

    if (!formData.enrollmentNo.trim()) {
      setError("Enrollment number is required");
      toast.error("Enrollment number is required");
      setIsLoading(false);
      return;
    }

    if (!validateEnrollmentNo(formData.enrollmentNo)) {
      setError("Enrollment number must be at least 5 alphanumeric characters");
      toast.error("Enrollment number must be at least 5 alphanumeric characters");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required");
      toast.error("Email and password are required");
      setIsLoading(false);
      return;
    }

    if (!formData.password || !validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."
      );
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."
      );
      setIsLoading(false);
      return;
    }

    const payload = {
      leo_Id: formData.leo_Id.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      enrollmentNo: formData.enrollmentNo.trim(),
      address: formData.address.trim(),
      birthday: formData.birthday,
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      password: formData.password.trim(),
      role: "member",
    };

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API response:", data); // Debug API response

      if (res.ok) {
        onClose(); // Close the popup immediately
        toast.success("🎉 Your registration part done! You will receive Email after admin approval", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setError(data.message || "Sign up failed");
        toast.error(data.message || "Sign up failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error");
      toast.error("Server error during signup");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleProceedToPay = () => {
    setError("");
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "birthday",
      "email",
      "mobile",
      "password",
      "confirmPassword",
      "enrollmentNo",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]?.trim());

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields before proceeding to payment.");
      toast.error("Please fill in all required fields before proceeding to payment.");
      setIsLoading(false);
      return;
    }

    if (!validateEnrollmentNo(formData.enrollmentNo)) {
      setError("Enrollment number must be at least 5 alphanumeric characters");
      toast.error("Enrollment number must be at least 5 alphanumeric characters");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."
      );
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."
      );
      setIsLoading(false);
      return;
    }

    // Note: After payment, you may need to call the signup API to save the user.
    const orderId = `LEO-${Date.now()}`;
    const paymentData = {
      merchant_id: "YOUR_MERCHANT_ID",
      return_url: "https://your-site.com/payment-success",
      cancel_url: "https://your-site.com/payment-cancel",
      notify_url: "https://your-api.com/api/payment/payhere-notify",
      order_id: orderId,
      items: "Leo Club Membership",
      amount: "400.00",
      currency: "LKR",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.mobile,
      address: formData.address,
      city: "Colombo",
      country: "Sri Lanka",
      custom_1: formData.enrollmentNo,
      custom_2: formData.birthday,
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.payhere.lk/pay/checkout";

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center px-2 sm:px-0">
      <div className="relative top-[10px] rounded-xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden bg-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-black hover:font-bold hover:text-[#999999] focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 px-2 text-sm"
          aria-label="Close signup form"
        >
          &#x2715;
        </button>

        <div className="w-full md:w-1/2 h-40 md:h-auto">
          <img src={logo} alt="Leo Club Logo" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
            Get Membership
          </h2>

          <form onSubmit={leoStatus === "member" ? handleSubmit : (e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-2 sm:gap-3 p-1 sm:p-2 mb-3 sm:mb-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                <input
                  type="radio"
                  name="leoStatus"
                  value="member"
                  checked={leoStatus === "member"}
                  onChange={(e) => setLeoStatus(e.target.value)}
                  className="accent-blue-600 w-5 h-5"
                />
                Already LEO Member
              </label>

              <label className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                <input
                  type="radio"
                  name="leoStatus"
                  value="not-member"
                  checked={leoStatus === "not-member"}
                  onChange={(e) => setLeoStatus(e.target.value)}
                  className="accent-blue-600 w-5 h-5"
                />
                Not a LEO Member
              </label>
            </div>

            {leoStatus === "member" && (
              <Input
                type="text"
                placeholder="Leo ID *"
                name="leo_Id"
                value={formData.leo_Id}
                onChange={handleChange}
                className="border p-2 mb-4 w-full rounded"
                required
              />
            )}

            <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 p-1">
              <Input
                type="text"
                placeholder="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                placeholder="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                placeholder="Address *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                placeholder="Enrollment No *"
                name="enrollmentNo"
                value={formData.enrollmentNo}
                onChange={handleChange}
                required
              />
              <Input
                type="date"
                placeholder="Birthday *"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                placeholder="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                placeholder="Mobile no *"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                placeholder="Password *"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password *"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <p className="text-xs text-gray-500 mt-1 ml-1">
              Password must be 8+ characters with uppercase, lowercase, number, and symbol.
            </p>

            <div className="flex flex-col gap-2 mt-3 sm:mt-4 ml-2 sm:ml-4">
              {leoStatus === "not-member" ? (
                <>
                  <p className="text-black text-sm">Be a Member</p>
                  <p className="text-black text-sm">Membership Fee: Rs400.00</p>
                  <Button
                    type="button"
                    className="login p-2 mt-2"
                    label={isLoading ? "Processing..." : "Proceed to Pay"}
                    disabled={isLoading}
                    onClick={handleProceedToPay}
                  />
                  {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                </>
              ) : (
                <Button
                  type="submit"
                  className="login p-2 mt-3 sm:mt-4"
                  label={isLoading ? "Signing Up..." : "Sign Up"}
                  disabled={isLoading}
                />
              )}
              {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


