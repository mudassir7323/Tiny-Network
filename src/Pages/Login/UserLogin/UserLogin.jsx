import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import loginImage from './User-Login-image.jpg'; // Adjust the image path as per your project structure

const UserLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-4/5 max-w-4xl">
        
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Don't have an account yet? <a href="#" className="text-indigo-600 hover:underline">Sign Up</a>
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter 6 characters or more"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
            </div>
            <div className="flex items-center mb-6">
              <input
                id="remember"
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-3">or login with</p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 p-8  justify-center items-center">
          <img
            src={loginImage} // Correct path to the image
            alt="login illustration"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
