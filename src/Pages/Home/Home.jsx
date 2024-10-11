import React from 'react';
import Navbar from '../../Components/Navbar';
import { Link, animateScroll as scroll } from 'react-scroll';

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Sticky Header */}      
      <Navbar/>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-500 to-blue-300 text-white">
        <h2 className="text-5xl font-extrabold">Welcome to Tiny Task Network</h2>
        <p className="mt-4 text-lg">Connecting freelancers with clients for amazing projects.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Our Services</h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Web Development</h4>
              <p>Build responsive and modern websites.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Graphic Design</h4>
              <p>Create stunning visuals for your brand.</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Content Writing</h4>
              <p>Engaging content that resonates with your audience.</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Digital Marketing</h4>
              <p>Boost your online presence with effective strategies.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">SEO Services</h4>
              <p>Improve your search engine rankings.</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Consultation</h4>
              <p>Expert advice tailored to your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-600">About Us</h3>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            We are a dedicated team connecting talented freelancers with clients around the world. Our mission is to create opportunities and deliver excellence.
          </p>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Join Our Network</h3>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            Become part of a thriving community of freelancers and clients. Together, we can achieve amazing things.
          </p>
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
