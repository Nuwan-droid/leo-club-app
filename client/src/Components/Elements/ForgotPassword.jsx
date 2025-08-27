// import { useState } from "react";
// import Input from "./Input";
// import Button from "./Button";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5001/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Password reset link sent to your email.");
//         setEmail("");
//       } else {
//         toast.error(data.message || "Something went wrong.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Forgot Password
//         </h2>
//         <Input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full mt-4"
//           label={loading ? "Sending..." : "Send Reset Link"}
//         />
//         <ToastContainer position="top-right" autoClose={3000} />
//       </form>
//     </div>
//   );
// }
