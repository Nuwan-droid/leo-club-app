import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name") || "User";

 toast.success(
  <span>
    <strong>{name}</strong> Successfully Registered! Your registration will be reviewed by the admin.🥰
  </span>,
  { autoClose: 5000 } 
);

    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment Successful ✅</h1>
      <p className="mt-2">Redirecting to home...</p>
    </div>
  );
}
