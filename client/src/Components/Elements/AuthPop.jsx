import React, { useState } from "react";
import Login from "./Login.jsx";
import SignUp from "./SignUp";
import AdminSignUp from "./AdminSignUp";

function AuthPop({ onClose, defaultMode = "login" }) {
  // Allow "signup" as alias for "member"
  const [mode, setMode] = useState(
    defaultMode === "signup" ? "member" : defaultMode
  );

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl relative">
        {mode === "login" && (
          <Login
            onClose={onClose}
            onSwitchToSignUp={() => setMode("member")}
          />
        )}

        {(mode === "member" || mode === "signup") && (
          <SignUp
            onClose={onClose}
            onSwitchToLogin={() => setMode("login")}
            onSwitchToAdmin={() => setMode("admin")}
          />
        )}

        {mode === "admin" && (
          <AdminSignUp
            onClose={onClose}
            onSwitchToMember={() => setMode("member")}
          />
        )}
      </div>
    </div>
  );
}

export default AuthPop;
