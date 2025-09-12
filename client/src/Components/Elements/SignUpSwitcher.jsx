import { useState } from "react";
import AdminSignUp from "./AdminSignUp";
import SignUp from "./SignUp";

export default function SignUpSwitcher({ onClose }) {
  const [mode, setMode] = useState("admin"); // default admin form

  const switchToMember = () => setMode("member");
  const switchToAdmin = () => setMode("admin");

  return (
    <>
      {mode === "admin" ? (
        <AdminSignUp 
          onClose={onClose} 
          onSwitchToMember={switchToMember} 
        />
      ) : (
        <SignUp 
          onClose={onClose} 
          onSwitchToAdmin={switchToAdmin} 
        />
      )}
    </>
  );
}
