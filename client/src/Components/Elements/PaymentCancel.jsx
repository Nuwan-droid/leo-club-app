export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6">You have cancelled your payment. No charges were made.</p>
      <div className="flex gap-4">
        <a
          href="/membership"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry Payment
        </a>
        <a
          href="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
