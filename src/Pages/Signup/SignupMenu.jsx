import React from "react";
import Navbar from "../../Components/Navbar";

const services = [
  { title: "Web Development", description: "Build responsive and modern websites." },
  { title: "Graphic Design", description: "Create stunning visuals for your brand." },
  { title: "Content Writing", description: "Engaging content that resonates with your audience." },
  { title: "Digital Marketing", description: "Boost your online presence with effective strategies." },
  { title: "SEO Services", description: "Improve your search engine rankings." },
  { title: "Consultation", description: "Expert advice tailored to your needs." },
  { title: "Mobile App Development", description: "Create apps for iOS and Android." },
  { title: "UI/UX Design", description: "Design user-friendly interfaces." },
  { title: "Web Development", description: "Build responsive and modern websites." },
  { title: "Graphic Design", description: "Create stunning visuals for your brand." },
  { title: "Content Writing", description: "Engaging content that resonates with your audience." },
  { title: "Digital Marketing", description: "Boost your online presence with effective strategies." },
  { title: "SEO Services", description: "Improve your search engine rankings." },
  { title: "Consultation", description: "Expert advice tailored to your needs." },
  { title: "Mobile App Development", description: "Create apps for iOS and Android." },
  { title: "UI/UX Design", description: "Design user-friendly interfaces." },
  { title: "Data Analysis", description: "Analyze and interpret complex data." },
  // Add more services as needed
];

function SignupMenu() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 flex flex-col">
      <Navbar />
      <div className="flex-grow flex -z-0 items-center justify-center">
        <div className="container mt-14 mx-auto text-center z-10 px-4 py-10">
          <h3 className="text-3xl font-semibold text-white mb-10">Choose Your Service</h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.title} // Using title as a key assuming it's unique
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border-4 border-transparent hover:border-blue-300 hover:border-opacity-60"
                style={{
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)", // Custom shiny effect
                }}
              >
                <h4 className="text-xl font-semibold text-gray-800">{service.title}</h4>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupMenu;
