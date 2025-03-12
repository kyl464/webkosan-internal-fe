import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Untuk mendapatkan path halaman aktif

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const router = useRouter(); // Dapatkan path halaman saat ini
  console.log("Current Path:", router.pathname); // Debugging

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 border-gray-200 transition-all duration-300 ${
        scrolling ? "bg-[#F8F3D9] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold text-white">
            Namaweb
          </span>
        </a>

        {/* Button & Mobile Menu */}
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <button
            type="button"
            className="text-gray-600 font-semibold bg-[#EBE5C2] hover:bg-[#D6CBA8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
          >
            Get started
          </button>
        </div>

        {/* Navbar Menu */}
        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex space-x-8 font-medium">
            {[
              { name: "Home", path: "/home" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`block py-2 px-3 rounded-sm transition-colors duration-200 ${
                    router.pathname === item.path
                      ? "text-[#EBE5C2] font-semibold" // Warna tulisan hitam & tebal saat aktif
                      : "text-white hover:text-[#EBE5C2]"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
