import Button  from "../Elements/Button";
import Input from "../Elements/Input";

export default function Login() {
  return (
    <div className="fixed top-1/2 left-1/2 w-3/4 max-w-[900px] h-150 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex overflow-hidden">

      {/* Left half: Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="https://via.placeholder.com/280x280"
          alt="Sample"
          className="max-w-full max-h-full object-contain"
        />
      </div>




      {/* Right half: Form */}

      <div className="w-1/2 p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-[black]"> Welcome Back to the LEO CLUB website </h2>
       
        <form className="flex flex-col space-y-4" >
          <Input
            type="text"
            placeholder="Enter The Email"
            className=""
           
          />
          <Input
            type="password"
            placeholder="Enter The Password"
            className="i"
             
          />
          <Button
            type="submit"
            className="login p-2"
            label="Login"
         />
           
        
        </form>
        <br/>
        <p className="text-center text-sm text-gray-500">Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a></p>
      </div>

      {/* Right half: Image */}
      
    </div>
  );
}
