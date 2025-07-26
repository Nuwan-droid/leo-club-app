
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";
import { useNavigate } from "react-router-dom";

export default function Login({ onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, user } = data;

        localStorage.setItem("leoToken", token);

        onClose();

        // Optional: Redirect based on user role
        if (user?.leoStatus === "member") {
          navigate("/memberportal");
        }else if(user?.leoStatus === "admin") {
          navigate("/admin");
        }
        else {
          navigate("/newmemberpayment");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full md:h-[600px] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-black hover:font-bold hover:text-gray-600 focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 pl-2 pr-2 cursor-pointer"
          aria-label="Close login form"
        >
          &#x2715;
        </button>

        <div className="w-full md:w-1/2 h-48 md:h-auto">
          <img src={logo} alt="Leo Club Logo" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-black">
            Welcome Back to the LEO CLUB website
          </h2>

          <form
            onSubmit={handleLogin}
            className="flex flex-col space-y-6 max-w-sm mx-auto md:mx-0 flex-1 justify-center"
            noValidate
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />

            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
              <label className="flex items-center space-x-2 ml-4">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline mr-4">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="login p-2 m-4"
              label={loading ? "Logging in..." : "Login"}
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          
          </form>
        </div>
      </div>
    </div>
  );
}





// import { useState, useEffect } from "react";
// import Button from "./Button";
// import Input from "./Input";
// import logo from "../../assets/lion.svg";

// export default function Login({ onClose, onSwitchToSignUp }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     document.body.classList.add("no-scroll");
//     return () => document.body.classList.remove("no-scroll");
//   }, []);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setError("");
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError("");
//   };

//   const handleRememberMeChange = (e) => {
//     setRememberMe(e.target.checked);
//   };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");
  
//   try {
//     const res = await fetch("http://localhost:5000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       const { token } = data;
//       localStorage.setItem('leoToken', token); // save token to localStorage
//       onClose(); // close modal

//       // redirect to member portal
//       window.location.href = '/memberportal';
//     } else {
//       setError(data.message || "Login failed");
//     }
//   } catch (err) {
//     console.error("Error logging in:", err);
//     setError("Server error");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full md:h-[600px] overflow-hidden">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-black hover:font-bold hover:text-gray-600 focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 pl-2 pr-2 cursor-pointer"
//           aria-label="Close login form"
//         >
//           &#x2715;
//         </button>

//         <div className="w-full md:w-1/2 h-48 md:h-auto">
//           <img src={logo} alt="Leo Club Logo" className="w-full h-full object-cover" />
//         </div>

//         <div className="w-full md:w-1/2 p-8 flex flex-col">
//           <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-black">
//             Welcome Back to the LEO CLUB website
//           </h2>

//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col space-y-6 max-w-sm mx-auto md:mx-0 flex-1 justify-center"
//             noValidate
//           >
//             <Input
//               type="email"
//               placeholder="Enter The Email"
//               required
//               value={email}
//               onChange={handleEmailChange}
//               autoComplete="email"
//             />
//             <Input
//               type="password"
//               placeholder="Enter The Password"
//               required
//               value={password}
//               onChange={handlePasswordChange}
//               autoComplete="current-password"
//             />

//             <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
//               <label className="flex items-center space-x-2 ml-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={handleRememberMeChange}
//                   className="form-checkbox h-4 w-4 text-blue-600"
//                 />
//                 <span>Remember Me</span>
//               </label>
//               <a href="#" className="text-blue-600 hover:underline mr-4">
//                 Forgot Password?
//               </a>
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="login p-2 m-4"
//               label={loading ? "Logging in..." : "Login"}
//             />

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <p className="text-center text-sm text-gray-500 mt-8">
//               Don't have an account?{" "}
//               <a
//                 href="#"
//                 className="text-blue-600 hover:underline"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onSwitchToSignUp();
//                 }}
//               >
//                 Sign Up
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import Button from "./Button";
// import Input from "./Input";
// import logo from "../../assets/lion.svg";
// import { useNavigate } from "react-router-dom";

// export default function Login({ onClose, onSwitchToSignUp }) {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const navigate = useNavigate();
//   useEffect(() => {
//     document.body.classList.add("no-scroll");
//     return () => document.body.classList.remove("no-scroll");
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // 🔐 Hardcoded credentials for testing
//     const testEmail = "test@example.com";
//     const testPassword = "test1234";

//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: testEmail, password: testPassword }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const { token } = data;
//         localStorage.setItem("leoToken", token);
//         onClose();
//         navigate("/memberportal");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full md:h-[600px] overflow-hidden">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-black hover:font-bold hover:text-gray-600 focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 pl-2 pr-2 cursor-pointer"
//           aria-label="Close login form"
//         >
//           &#x2715;
//         </button>

//         <div className="w-full md:w-1/2 h-48 md:h-auto">
//           <img src={logo} alt="Leo Club Logo" className="w-full h-full object-cover" />
//         </div>

//         <div className="w-full md:w-1/2 p-8 flex flex-col">
//           <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-black">
//             Welcome Back to the LEO CLUB website
//           </h2>

//           <form
//             onSubmit={handleLogin}
//             className="flex flex-col space-y-6 max-w-sm mx-auto md:mx-0 flex-1 justify-center"
//             noValidate
//           >
//             <Input
//               type="email"
//               placeholder="Email (ignored in test)"
//               value="test@example.com"
//               disabled
//             />
//             <Input
//               type="password"
//               placeholder="Password (ignored in test)"
//               value="test1234"
//               disabled
//             />

//             <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
//               <label className="flex items-center space-x-2 ml-4 cursor-not-allowed">
//                 <input
//                   type="checkbox"
//                   disabled
//                   className="form-checkbox h-4 w-4 text-blue-600"
//                 />
//                 <span>Remember Me</span>
//               </label>
//               <a href="#" className="text-blue-600 hover:underline mr-4">
//                 Forgot Password?
//               </a>
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="login p-2 m-4"
//               label={loading ? "Logging in..." : "Login with Test Data"}
//             />
        
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <p className="text-center text-sm text-gray-500 mt-8">
//               Don't have an account?{" "}
//               <a
//                 href="#"
//                 className="text-blue-600 hover:underline"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onSwitchToSignUp();
//                 }}
//               >
//                 Sign Up
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }