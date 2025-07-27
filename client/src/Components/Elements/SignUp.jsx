import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";

export default function SignUp({ onClose, onSwitchToLogin }) {
  const [leoStatus, setLeoStatus] = useState("member");
  const [formData, setFormData] = useState({
    memberId: "",
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!leoStatus) {
      toast.error("Please select your membership status");
      return;
    }

    if (leoStatus === "member" && !formData.memberId.trim()) {
      toast.error("Member ID is required for members");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

     if (!formData.password || !validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");
      return;
    }

    const payload = {
      leoStatus,
      memberId: formData.memberId.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      address: formData.address.trim(),
      birthday: formData.birthday,
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      password: formData.password.trim(),
    };

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");

    try {
      const res = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("🎉 Registered successfully! Please log in.", {
          duration: 4000,
        });
        console.log("✅ User registered:", data);
        onSwitchToLogin();
      } else {
        toast.error(data.message || "Sign up failed");
      }
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      console.error("Signup error:", err);
      toast.error("Server error. Please try again.");
    }
  };

  const handleProceedToPay = () => {
    console.log("Redirecting to payment...");
    toast.success("Redirecting to payment gateway...");
    // Add your payment redirect logic here
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
                placeholder="Member ID"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className="border p-2 mb-4 w-full rounded"
                required
              />
            )}

            <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 p-1">
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                type="date"
                placeholder="Birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="tel"
                placeholder="Mobile no"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">
  Must be 8+ characters with uppercase, lowercase, number & symbol.
</p>


            <div className="flex flex-col gap-2 mt-3 sm:mt-4 ml-2 sm:ml-4">
              {leoStatus === "not-member" ? (
                <>
                  <p className="text-black text-sm">Be a Member</p>
                  <p className="text-black text-sm">Membership Fee: Rs400.00</p>
                  <Button
                    type="button"
                    className="login p-2 mt-2"
                    label="Proceed to Pay"
                    onClick={handleProceedToPay}

                  />
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                </>
              ) : (
                <Button type="submit" className="login p-2 mt-3 sm:mt-4" label="Sign Up"  />
              )}

              {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
              )}

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}