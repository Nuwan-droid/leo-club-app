import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";

export default function Login() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full md:h-[600px] overflow-hidden">
    
    {/* Mobile: Image on top, Desktop: Left side */}
    <div className="w-full md:w-1/2 h-48 md:h-auto">
      <img src={logo} alt="Sample" className="w-full h-full object-cover  " />
    </div>

    {/* Form */}
    <div className="w-full md:w-1/2 p-8 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-black">
        Welcome Back to the LEO CLUB website
      </h2>

      <form className="flex flex-col space-y-6 max-w-sm mx-auto md:mx-0 flex-1 justify-center">
        <Input type="text" placeholder="Enter The Email" />
        <Input type="password" placeholder="Enter The Password" />

        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
          <label className="flex items-center space-x-2 ml-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-blue-600 hover:underline mr-4">
            Forgot Password?
          </a>
        </div>

        <Button type="submit" className="login p-2 m-4" label="Login" />

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  </div>
</div>


  );
}
