import React, { useState } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      window.location.href = '/'; // Redirect to the homepage
    } else {
      // Scroll to top if on the homepage
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tiny Task Network</h1>
        <div className="md:hidden">
          <button onClick={toggleNav} className="text-white focus:outline-none">
            {isNavOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className={`hidden md:flex md:items-center md:space-x-6`}>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
                onClick={handleHomeClick} // Home link functionality
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="network"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
              >
                Network
              </Link>
            </li>
            <li>
              <button
                onClick={() => { navigate("/Login"); }}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden bg-gray-800 p-4 absolute top-16 left-0 w-full z-20">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
                onClick={handleHomeClick} // Home link functionality
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
                onClick={toggleNav} // Close menu on item click
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
                onClick={toggleNav} // Close menu on item click
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="network"
                smooth={true}
                duration={500}
                className="text-white hover:text-blue-300 transition duration-200 cursor-pointer"
                onClick={toggleNav} // Close menu on item click
              >
                Network
              </Link>
            </li>
            <li>
              <button 
                onClick={() => { navigate("/Login"); }}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </li>
          </ul>
          {/* Additional content hidden on mobile */}
          <div className="hidden md:block mt-4 text-white">
            {/* This content will be hidden on mobile */}
            <p>Your additional content here</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
