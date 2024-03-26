import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900  bottom-0 left-0 right-0">
      <div className="px-4 pt-16 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
        <div className="grid lg:grid-cols-6 mb-0">
          <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-white">Category</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    World
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
                    References
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-white">Fashion</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    World
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
                    References
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
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    World
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
                    References
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium tracking-wide text-white">Contact</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-gray-500 transition-colors duration-300 hover:text-orange-500"
                  >
                    World
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
                    References
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:max-w-md lg:col-span-2 lg:mt-0 mt-5">
            <p className="font-medium tracking-wide text-whiteh-full">Subscription</p>
            <form className="mt-4 flex flex-col md:flex-row">
              <div className="flex py-2 space-x-2">
                <label className="text-gray-500 " >Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="w-full h-8 px-4 rounded  focus:outline-none border "
                />
                </label>
                <button
                  type="button"
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
