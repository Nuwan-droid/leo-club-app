import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";
import { useState } from "react";

export default function SignIn() {
  const [show, setShow] = useState(true);
  const [leoStatus, setLeoStatus] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {show && (
        <div className="relative top-[100px] rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
          {/* Close Button */}
          <button
            onClick={(e) => handleClose(e)}
            className="absolute top-2 right-2 bg-[gold] bg-opacity-50 rounded-full text-[black] hover:font-bold hover:text-[#999999] focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 pl-2 pr-2 cursor-pointer"
            aria-label="Close login form"
          >
            &#x2715;
          </button>

          {/* Left Image Panel */}
          <div className="w-full md:w-1/2 h-48 md:h-auto">
            <img
              src={logo}
              alt="Sample"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-10">
              Get Membership
            </h2>

            <form method="#">
              {/* Radio buttons */}
              <div className="grid grid-cols-1 gap-3 p-2 mb-4 sm:grid-cols-2">
                <label className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="leoStatus"
                    value="member"
                    onChange={(e) => setLeoStatus(e.target.value)}
                    className="accent-blue-600 w-5 h-5"
                  />
                  Already LEO Member
                </label>

                <label className="flex items-center gap-2 text-gray-800 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="leoStatus"
                    value="not-member"
                    onChange={(e) => setLeoStatus(e.target.value)}
                    className="accent-blue-600 w-5 h-5"
                  />
                  Not a LEO Member
                </label>
              </div>

              {/* Member ID input if member */}
              {leoStatus === "member" && (
                <Input type="text" placeholder="Member ID" />
              )}

              {/* Input grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-1">
                <Input className="mt-2" type="text" placeholder="First Name" />
                <Input className="mt-2" type="text" placeholder="Address" />
                <Input type="text" placeholder="Last Name" />
                <Input type="date" placeholder="Birthday" />
                <Input type="email" placeholder="Email" />
                <Input type="number" placeholder="Mobile no" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm Password" />
              </div>

              {/* Action Button: Conditional Rendering */}
              <div className="flex flex-col gap-2 mt-4 ml-4">
                {leoStatus === "not-member" ? ((   
                    <>  <div className="grid grid-cols-1 gap-1 mb-0 mt-100">
                          <p className="text-[black] text-sm "> Be a Member </p>
                          <p className="text-[black] text-sm "> Membership Fee : Rs400.00 </p>
                         </div>
                  <Button
                    type="button"
                   className="login p-2 mt-2"
                    label="Proceed to Pay"
                  />
                   </>
                )) : (
                  <Button
                    type="submit"
                    className="login p-2 mt-4"
                    label="Sign Up"
                  />
                )}

                <p className="text-center text-sm text-gray-500 mt-2">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    LOGIN HERE
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
