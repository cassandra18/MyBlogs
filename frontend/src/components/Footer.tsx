import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscription = async () => {
    try {
      const response = await fetch("https://cassys-web.onrender.com/api/email/subcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Subscription successful!", {
          position: "top-center",
          autoClose: 5000,
        });
        setEmail("");
      } else {
        toast.error("Error subscribing. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error subscribing. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="bg-black relative w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', opacity: 0.9 }}>
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
        <div className="grid lg:grid-cols-6 gap-8">
          <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">
            {/* Links sections */}
            <div>
              <p className="font-medium tracking-wide">I am</p>
              <ul className="mt-2 space-y-2">
                {["Happy", "Loved", "Content", "Able"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/about"
                      className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide">Fashion</p>
              <ul className="mt-2 space-y-2">
                {["News", "Aesthetics", "Inspo", "DIY"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/blogs"
                      className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide">Mental Health</p>
              <ul className="mt-2 space-y-2">
                {["Journals", "Mood", "Games", "Happiness"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/blogs"
                      className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide">Contact</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="https://www.linkedin.com/in/cassandra-lelei-88987a269" className="text-gray-500 hover:text-orange-500">
                    <FaLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/cassandra18" className="text-gray-500 hover:text-orange-500">
                    <FaGithub />
                  </Link>
                </li>
                <li>
                  <Link to="https://x.com/LelCassandra?t=3buzTiV9hqiVe1T4fJNdZw&s=09" className="text-gray-500 hover:text-orange-500">
                    <FaTwitter />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Subscription section */}
          <div className="md:max-w-md lg:col-span-2">
            <p className="font-medium tracking-wide text-gray-900 text-center">Subscribe to my emails</p>
            <form
              className="mt-4 flex flex-col sm:flex-row items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscription();
              }}
            >
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-transparent text-gray-700 placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="h-10 px-6 rounded-full bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
