import React from "react";
import BuyerImage from "./Buyer.png";
import SellerImage from "./Seller.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

function Signup() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      {/* Main Title */}
      <Navbar/>
      <h1 className="text-4xl font-bold text-white mb-4">Tiny Task Networks</h1>
      
      {/* Subtitle */}
      <h2 className="text-2xl text-white mb-8">Select one of the following</h2>

      {/* Sections Container */}
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {/* Buyer Section */}
        <div 
        onClick={()=>navigate("/Buyer-Signup")}
        className="group w-full md:w-80 h-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <img
            src={BuyerImage}
            alt="Buyer"
            className="w-full h-64 object-cover"
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-500 transition duration-300">
              Buyer
            </h2>
            <p className="text-gray-600 mt-2">Join as a buyer to explore services.</p>
          </div>
        </div>

        {/* Seller Section */}
        <div
        onClick={() => navigate("/SignupMenu")}
        className="group w-full md:w-80 h-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <img
            src={SellerImage}
            alt="Seller"
            className="w-full h-64 object-cover"
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-500 transition duration-300">
              Seller
            </h2>
            <p className="text-gray-600 mt-2">Join as a seller to offer your services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
