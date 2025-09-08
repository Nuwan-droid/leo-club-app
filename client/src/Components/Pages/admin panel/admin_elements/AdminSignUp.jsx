import { useState, useEffect } from "react";
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import logo from "../../../../assets/lion.svg";
import { toast } from "react-toastify";

export default function AdminSignUp({ onClose }) {
  // Local state to manage modal visibility if parent doesn't provide onClose
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose(); // call parent handler if provided
    } else {
      setVisible(false); // otherwise hide locally
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    enrollmentNo: "",
    mobile: "",
    adminRole: "",
    position: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roleToPosition = {
    it_director: "IT Director",
    membership_admin: "Membership Admin",
    event_coordinator: "Event Coordinator",
    chief_editor: "Chief Editor",
    treasurer: "Treasurer",
  };

  useEffect(() => {
    if (formData.adminRole) {
      setFormData((prev) => ({
        ...prev,
        position: roleToPosition[formData.adminRole] || "",
      }));
    }
  }, [formData.adminRole]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "address",
      "enrollmentNo",
      "mobile",
      "adminRole",
    ];

    for (let f of requiredFields) {
      if (!formData[f]?.trim()) return `Field ${f} is required`;
    }

    if (!validateMobile(formData.mobile))
      return "Mobile number must be exactly 10 digits";

    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";

    if (!validatePassword(formData.password))
      return "Password must be 8+ chars with uppercase, lowercase, number & symbol.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      return;
    }

    const payload = {
      role: "admin",
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      address: formData.address.trim(),
      enrollmentNo: formData.enrollmentNo.trim(),
      mobile: formData.mobile.trim(),
      adminRole: formData.adminRole,
      position: formData.position,
    };

    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/admin-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Admin signup response:", data);

      if (res.ok) {
        handleClose(); // close modal on success
        toast.success("🎉 Admin registered successfully!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(data.message || "Admin sign up failed.");
        setError(data.message || "Admin sign up failed.");
      }
    } catch (err) {
      console.error("Admin signup error:", err);
      toast.error("Server error during signup");
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null; // hide modal if not visible

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center px-2 sm:px-0">
      <div className="relative top-[10px] rounded-xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden bg-white">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-black hover:font-bold hover:text-[#999999] focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 px-2 text-sm"
          aria-label="Close admin signup form"
        >
          &#x2715;
        </button>

        <div className="w-full md:w-1/2 h-40 md:h-auto">
          <img
            src={logo}
            alt="Leo Club Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-8 mb-4 sm:mb-6">
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Dropdown inside form, above heading */}
            <div className="mb-4">
              <select
                name="adminRole"
                value={formData.adminRole}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Admin Role *</option>
                <option value="it_director">IT Director</option>
                <option value="membership_admin">Membership Admin</option>
                <option value="event_coordinator">Event Coordinator</option>
                <option value="chief_editor">Chief Editor</option>
                <option value="treasurer">Treasurer</option>
              </select>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
              Admin Registration
            </h2>

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
              Password must be 8+ characters with uppercase, lowercase, number,
              and symbol.
            </p>

            {formData.position && (
              <p className="text-sm text-gray-700 mt-2 ml-1">
                Position: <strong>{formData.position}</strong>
              </p>
            )}

            <div className="flex flex-col gap-2 mt-4">
              <Button
                type="submit"
                className="login p-2"
                label={isLoading ? "Registering..." : "Register Admin"}
                disabled={isLoading}
              />
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
