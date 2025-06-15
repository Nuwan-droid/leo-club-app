import Button from "./Button";
import Input from "./Input";
import logo from "../../assets/lion.svg";
import { useState, useEffect } from "react";

export default function SignUp({ onClose, onSwitchToLogin }) {
  const [leoStatus, setLeoStatus] = useState("");

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/1 z-50 flex items-center justify-center px-2 sm:px-0">
      <div className="relative top-[10px] rounded-xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden bg-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[gold] bg-opacity-50 rounded-full text-[black] hover:font-bold hover:text-[#999999] focus:ring-2 focus:ring-[gold] focus:ring-opacity-50 p-1 px-2 text-sm"
        >
          &#x2715;
        </button>

        <div className="w-full md:w-1/2 h-40 md:h-auto">
          <img src={logo} alt="Sample" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-8 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
            Get Membership
          </h2>

          <form>
            <div className="grid grid-cols-1 gap-2 sm:gap-3 p-1 sm:p-2 mb-3 sm:mb-4 sm:grid-cols-2">
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

            {leoStatus === "member" && (
              <Input type="text" placeholder="Member ID" />
            )}

            <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 p-1">
              <Input className="mt-1 sm:mt-2" type="text" placeholder="First Name" />
              <Input className="mt-1 sm:mt-2" type="text" placeholder="Address" />
              <Input type="text" placeholder="Last Name" />
              <Input type="date" placeholder="Birthday" />
              <Input type="email" placeholder="Email" />
              <Input type="number" placeholder="Mobile no" />
              <Input type="password" placeholder="Password" />
              <Input type="password" placeholder="Confirm Password" />
            </div>

            <div className="flex flex-col gap-2 mt-3 sm:mt-4 ml-2 sm:ml-4">
              {leoStatus === "not-member" ? (
                <>
                  <div className="flex flex-col">
                    <p className="text-[black] text-sm">Be a Member</p>
                    <p className="text-[black] text-sm">Membership Fee: Rs400.00</p>
                  </div>
                  <Button type="button" className="login p-2 mt-2" label="Proceed to Pay" />
                </>
              ) : (
                <Button type="submit" className="login p-2 mt-3 sm:mt-4" label="Sign Up" />
              )}

              <p className="text-center text-sm text-gray-500 mt-0">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToLogin();
                  }}
                >
                  LOGIN HERE
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
