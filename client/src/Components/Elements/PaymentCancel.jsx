import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("❌ Payment cancelled.");
    const timer = setTimeout(() => {
      navigate("/"); // redirect to home
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment Cancelled ❌</h1>
      <p className="mt-2">Redirecting to home...</p>
    </div>
  );
}
