import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaGithubSquare ,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import { Separator } from "./ui/separator";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Separator className="my-8" />

    <footer className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">Rahul Restaurant & Hotels</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Luxury & Comfort with Every Stay
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Acha Khao Healthy Khao Mast Raho 🚀
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="mt-2 space-y-2 flex flex-col">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
            >
              Home
            </Link>
            <Link
              to={"/restaurant/menuId"}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/booking"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
            >
              Book a Room
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            📍 Koderma, Jharkhand, India
          </p>
          <p className="text-gray-600 dark:text-gray-400">📞 +91 9973162148</p>
          <p className="text-gray-600 dark:text-gray-400">
            ✉️ support@modihotels.com
          </p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 flex justify-center space-x-6">
        <a
          href="https://www.facebook.com/rahulrajmodi.48"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-600 text-2xl transition duration-300"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com/rahulrajmodi.48"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-pink-600 text-2xl transition duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/rahul-raj-11a946224/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-800 text-2xl transition duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/RahulRaj__48"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-blue-400 text-2xl transition duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="https://github.com/Rahul-2148"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-gray-800 text-2xl transition duration-300"
        >
          <FaGithubSquare  />
        </a>
        <a
          href="https://www.youtube.com/@RahulRaj-ed1ud"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-white hover:text-red-600 text-2xl transition duration-300"
        >
          <FaYoutube />
        </a>
      </div>

      {/* Date, Time & Copyright Section */}
      <div className="text-center mt-6 text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          📅 {currentDateTime.toLocaleDateString("en-GB")} | 🕒{" "}
          {currentDateTime.toLocaleTimeString()}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          © {currentDateTime.getFullYear()} Rahul Restaurant & Hotels. All
          rights reserved.
        </p>
      </div>

      {/* Play Store & App Store Links */}
      <div className="flex justify-center mt-6 space-x-4">
        <a
          href="https://play.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          <SiGoogleplay className="text-xl mr-2" />
          <span className="text-sm">Google Play</span>
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          <SiAppstore className="text-xl mr-2" />
          <span className="text-sm">App Store</span>
        </a>
      </div>

      {/* YouTube Channel Link */}
      <div className="flex justify-center mt-6">
        <a
          href="https://www.youtube.com/@RahulRaj-vx7ov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          <FaYoutube className="text-xl mr-2" />
          <span className="text-sm">Our YouTube Channel</span>
        </a>
      </div>
    </footer>
    </>
  );
};

export default Footer;
