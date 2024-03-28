import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";


const Footer: React.FC = () => {
  const [email, setEmail] = useState(""); // staore the email input

  const handleSubscription = async () => {
    try {
      //Send a post request to the backend API endpoint
      const response = await fetch("http://localhost:3000/api/subcribe", {
        method: "POST",
        "headers": {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      //If the request is successful, display a success message to the user
      if (response.ok) {
        toast.success("Subscription successful!",{
          position: "top-center", // Adjust position as needed
          autoClose: 5000, // Close after 5 seconds
        });
      
      } else {
        toast.error("Error subscribing. Please try again later.", {
          position: "top-center", // Adjust position as needed
          autoClose: 5000, // Close after 5 seconds
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error subscribing. Please try again later.", {
        position: "top-center", // Adjust position as needed
        autoClose: 5000, // Close after 5 seconds
      });
    }
    
  }
  return (
    <div className="bottom-0 left-0 right-0"  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="px-4 pt-16 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
        <div className="grid lg:grid-cols-6 mb-0">
          <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-white">I am</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Happy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Loved
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Content
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Able
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-white">Fashion</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/blogs"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blogs"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Aesthetics
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blogs"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Inspo
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blogs"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    DIY
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-white">
                Mental Health
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/blogs"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Journals
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Mood
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Games
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    Happiness
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-white">Contact</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="https://www.linkedin.com/in/cassandra-lelei-88987a269"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    <FaLinkedin />
                  </Link>
                </li>

                <li>
                  <Link
                    to="https://github.com/cassandra18"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                     <FaGithub />
                  </Link>
                </li>

                <li>
                  <Link
                    to="https://x.com/LelCassandra?t=3buzTiV9hqiVe1T4fJNdZw&s=09"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    <FaTwitter />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:max-w-md lg:col-span-2 lg:mt-0 mt-5">
            <p className="font-medium tracking-wide text-whiteh-full">Subscription</p>
            <form className="mt-4 flex flex-col md:flex-row"
            onSubmit={ (e) => {
              e.preventDefault();
              handleSubscription();
            }}>
              <div className="flex py-2 space-x-2">
                <label className="text-gray-500 " >Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="w-full h-8 px-4 rounded  focus:outline-none border "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                </label>
                <button
                  type="submit"
                  className="inline-flex px-6 items-center rounded border text-gray-500 
                                justify-center font-medium tracking-wide transition duration-200 shadow-md hover:bg-orange-200 focus:outline-none "
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
