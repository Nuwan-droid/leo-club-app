import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
     <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        {isLogin ? (
          <Login
            onClose={onClose}
            onSwitchToSignUp={() => setIsLogin(false)}
          />
        ) : (
          <SignUp
            onClose={onClose}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
}
