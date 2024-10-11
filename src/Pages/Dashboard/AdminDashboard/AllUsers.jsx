import React, { useState } from "react";

const AllUsers = () => {
  // Dummy user data
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", category: "buyer" },
    { id: 2, name: "Bob Smith", category: "seller" },
    { id: 3, name: "Charlie Brown", category: "buyer" },
    { id: 4, name: "Daisy Miller", category: "seller" },
    { id: 5, name: "Ethan Hunt", category: "buyer" },
    { id: 6, name: "Fiona Green", category: "seller" },
  ]);

  const [filter, setFilter] = useState("all"); // State to manage filter selection

  // Filter users based on selected category
  const filteredUsers = users.filter((user) => {
    return filter === "all" || user.category === filter;
  });

  // Function to delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

      {/* Filter Options */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === "all"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === "buyer"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setFilter("buyer")}
        >
          Buyers
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            filter === "seller"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setFilter("seller")}
        >
          Sellers
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">Category: {user.category}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
