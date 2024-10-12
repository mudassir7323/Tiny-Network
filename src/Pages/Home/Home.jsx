import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import image1 from "./About1.jpg";
import image2 from "./About.avif";
import image3 from "./image1.jpg";
import image4 from "./image2.jpeg";
import image5 from "./image3.webp";
import image6 from "./image4.jpeg";


const Home = () => {
  const networkData = [
    { title: "Freelancers", value: 1200 },
    { title: "Clients", value: 1200 },
    { title: "Projects Completed", value: 13999 },
    { title: "Ongoing Projects", value: 1400 },
  ];

  // Array of images for the hero section
  const heroImages = [image3, image4, image5, image6];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to change the image every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [heroImages.length]);

  return (
    <div className="bg-gray-100">
      {/* Sticky Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-500 to-blue-300 text-white">
        {/* Render Image with Fade Transition */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hero ${index + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                position: index === currentIndex ? 'absolute' : 'absolute',
                top: 0,
                left: 0,
              }}
            />
          ))}
        </div>

        {/* Hero Text Overlay */}
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold">Welcome to Tiny Task Network</h2>
          <p className="mt-4 text-lg">Connecting freelancers with clients for amazing projects.</p>
        </div>

        {/* Background Overlay for Text */}
        <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Our Services</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">Web Development</h4>
              <p>Build responsive and modern websites.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md hover:bg-green-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">Graphic Design</h4>
              <p>Create stunning visuals for your brand.</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">Content Writing</h4>
              <p>Engaging content that resonates with your audience.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow-md hover:bg-red-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">Digital Marketing</h4>
              <p>Boost your online presence with effective strategies.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:bg-purple-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">SEO Services</h4>
              <p>Improve your search engine rankings.</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-md hover:bg-pink-200 transition-all duration-300">
              <h4 className="text-xl font-semibold">Consultation</h4>
              <p>Expert advice tailored to your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-200">
        <div className="container mx-auto">
          {/* Centered Heading */}
          <h3 className="text-3xl font-semibold text-center text-blue-600">About Us</h3>

          {/* First Section with Image on the Left */}
          <div className="flex flex-col md:flex-row items-center mt-8">
            {/* Image on the Left with Padding */}
            <div className="md:w-1/2 mt-6 md:mt-0 px-6">
              <img src={image1} alt="About Us" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 p-6 text-center md:text-left">
              <p className="text-lg text-gray-700">
                Welcome to <span className="font-semibold">Tiny Task Network</span>, the ultimate platform connecting talented freelancers with clients from all corners of the globe. Whether you're a freelancer looking to showcase your skills or a business seeking expert solutions, we are here to bridge the gap and bring exceptional talent together with incredible opportunities.
              </p>
            </div>
          </div>

          {/* Second Section with Image on the Right */}
          <div className="flex flex-col md:flex-row items-center mt-12">
            <div className="md:w-1/2 p-6 text-center md:text-left">
              <p className="text-lg text-gray-700">
                At <span className="font-semibold">Tiny Task Network</span>, our mission is simple yet profound: to empower freelancers and businesses by providing a space where creativity, expertise, and excellence converge. We believe freelancing is more than just a job—it’s a way for individuals to harness their passion and skills while providing companies with innovative and flexible solutions to help them grow.
              </p>
            </div>
            {/* Image on the Right */}
            <div className="md:w-1/2 mt-6 md:mt-0 px-6">
              <img src={image2} alt="Mission" className="rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <h4 className="text-2xl font-semibold text-blue-500">A Global Network</h4>
            <p className="mt-4 text-lg text-gray-700">
              Our platform transcends geographical boundaries, bringing together a diverse and talented community of freelancers from various industries. Businesses of all sizes can tap into this wealth of talent to find the right expert for their needs.
            </p>
            <h4 className="text-2xl font-semibold text-blue-500 mt-8">Your Success is Our Success</h4>
            <p className="mt-4 text-lg text-gray-700">
              We are committed to providing ongoing support to both freelancers and clients. Whether you're here to hire or be hired, you're in the right place. Let’s take your career or business to the next level!
            </p>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Join Our Network</h3>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            Become part of a thriving community of freelancers and clients. Together, we can achieve amazing things.
          </p>
          <div className="mt-10 mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {networkData.map((item, index) => (
              <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="mt-2 text-4xl font-extrabold text-blue-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Tiny Task Network. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
