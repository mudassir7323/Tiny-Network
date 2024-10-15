import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerLogout() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Loader state
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loader

    // Simulate logout delay (e.g., an API call can be placed here)
    setTimeout(() => {
      localStorage.removeItem("UserloginToken"); // Remove token
      navigate("/User-login"); // Redirect after logout
      setIsLoggingOut(false); // Hide loader after logout is complete
    }, 2000); // Simulating 2 seconds delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Main Logout Button */}
      <button
        onClick={() => setShowPopup(true)} // Show popup on click
        className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:text-white hover:rotate-6 hover:shadow-2xl"
      >
        Logout
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)} // Close popup
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout} // Confirm logout
                className={`${
                  isLoggingOut
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white py-2 px-4 rounded-lg transition duration-300`}
              >
                {isLoggingOut ? (
                  <span className="loader border-white border-2 border-t-transparent rounded-full w-4 h-4 inline-block animate-spin mr-2"></span>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerLogout;
