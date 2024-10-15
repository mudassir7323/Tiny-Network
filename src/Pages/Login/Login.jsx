import React from "react";
import AdminImage from "./Admin.jpeg"; // Make sure to replace with the correct path for the Admin image
import UserImage from "./User.png"; // Make sure to replace with the correct path for the User image
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
            {/* Main Title */}
            <Navbar />
            <h1 className="text-4xl font-bold text-white mb-4">Tiny Task Networks</h1>
            
            {/* Subtitle */}
            <h2 className="text-2xl text-white mb-8">Select one of the following</h2>

            {/* Sections Container */}
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
                {/* Admin Section */}
                <div 
                    onClick={() => navigate("/Admin-login")}
                    className="group w-full md:w-80 h-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                >
                    <img
                        src={AdminImage}
                        alt="Admin"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-500 transition duration-300">
                            Admin Login
                        </h2>
                        <p className="text-gray-600 mt-2">Login as an admin to manage the platform.</p>
                    </div>
                </div>

                {/* User Section */}
                <div
                    onClick={() => navigate("/User-login")}
                    className="group w-full md:w-80 h-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                >
                    <img
                        src={UserImage}
                        alt="User"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-500 transition duration-300">
                            User Login
                        </h2>
                        <p className="text-gray-600 mt-2">Login as a user to access your account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
