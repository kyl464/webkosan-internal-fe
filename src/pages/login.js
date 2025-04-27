import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session) window.location.href = "/home";
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8F3D9] rounded-tl-[70px] rounded-r-lg"
      style={{
        background: "linear-gradient(to right, #514D3E 30%, #F8F3D9 100%)",
      }}
    >
      {/* Header */}
      <header className="bg-[#514D3E] py-12 p-6  text-indigo-50 rounded-br-[90px]">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="bg-white px-4 py-6 rounded font-bold">
            LOGO WEBSITE
          </div>
          <h1 className="text-4xl mt-14 font-bold">Sign In</h1>
        </div>
        <h1 className="max-w-screen-xl pt-10 mx-auto mt-2 text-2xl">
          Find your perfect stay — join us now!
        </h1>
      </header>

      {/* Form */}
      <main className="flex-grow flex bg-[#F8F3D9] rounded-tl-[90px] items-center justify-center px-4">
        <div className="p-10 rounded-lg w-full max-w-xl ">
          {/* Google Sign In */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center space-x-2 border border-gray-400 rounded-full py-2 mb-6 hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="h-5"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-400" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          {/* Email/Password */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email/Username"
              className="w-full px-4 py-2 mb-4 bg-[#F8F3D9] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 bg-[#F8F3D9] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  // SVG Eye Off (baru)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.02 10.02 0 0112 20c-5.52 0-10-4.48-10-10a10.02 10.02 0 012.06-6.06"></path>
                    <path d="M1 1l22 22"></path>
                    <path d="M9.88 9.88a3 3 0 014.24 4.24"></path>
                  </svg>
                ) : (
                  // SVG Eye (tetap sama)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#514D3E] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#514D3E] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
