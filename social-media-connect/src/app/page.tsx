// src/app/page.tsx
"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import '../styles/global.css'
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Media Management on a Single Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            View every social media account - and its content - on ONE dashboard.
            Leave comments, interact with posts, or directly engage with followers,
            without juggling dozens of disconnected applications.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup" className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200">
              
                Subscribe Now
              
            </Link>
            <Link href="/demo" className="btn bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200">
              
                Watch Demo
              
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaFacebookF size={40} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unified Dashboard</h3>
              <p className="text-gray-600">
                Manage all your social media accounts from a single, intuitive dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaTwitter size={40} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Engagement</h3>
              <p className="text-gray-600">
                Interact with your audience directly without switching between different platforms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaInstagram size={40} className="text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Content Scheduling</h3>
              <p className="text-gray-600">
                Schedule posts across all your social media channels to maintain a consistent presence.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaLinkedinIn size={40} className="text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-gray-600">
                Gain insights into your social media performance with comprehensive analytics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaFacebookF size={40} className="text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with your team in real-time to manage social media strategies effectively.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaTwitter size={40} className="text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
              <p className="text-gray-600">
                Monitor the effectiveness of your campaigns and adjust strategies based on data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Plan</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
            {/* Free Plan */}
            <div className="border rounded-lg p-6 w-full md:w-1/3 shadow-lg">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Free</h3>
              <p className="text-center text-gray-600 mb-6">$0/month</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Manage up to 3 social accounts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Basic Analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Content Scheduling</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="/signup" className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                  
                    Get Started
                  
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-lg p-6 w-full md:w-1/3 shadow-lg">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Pro</h3>
              <p className="text-center text-gray-600 mb-6">$29/month</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Manage up to 10 social accounts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Team Collaboration</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="/signup" className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                  
                    Subscribe Now
                  
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-6 w-full md:w-1/3 shadow-lg">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Enterprise</h3>
              <p className="text-center text-gray-600 mb-6">Contact Us</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Unlimited Social Accounts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Custom Analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>24/7 Premium Support</span>
                </li>
              </ul>
              <div className="text-center">
                <Link href="/contact" className="btn bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                  
                    Contact Us
                  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">See Our Platform in Action</h2>
          <p className="text-gray-600 mb-8">
            Watch a live demo to understand how our platform can revolutionize your social media management.
          </p>
          <div className="flex justify-center">
            <Link href="/demo" className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200">
              
                Watch Demo
              
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} MySaaS. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
