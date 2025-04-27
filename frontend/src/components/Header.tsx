import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

//I am declaring a constant variable Header whch is a functional component.
//Header takes no props and impliments arrow function
const Header: React.FC = () => {
  //menu states
  const [isMenuOPen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOPen);
  };

  //Nav items
  const navItems = [
    { path: "/", link: "Home" },
    //{ path: "/blogs", link: "Blogs" },
    { path: "/blogs", link: "Blogs" },
    { path: "/about", link: "About" },
    { path: "/contact", link: "Contact" },
  ];
  return (
    <header
      className="  fixed top-0 left-0 right-0"
      
    >
      <nav className="px-2 text-white font-bold py-2 mx-auto flex justify-between items-center" style={{ backdropFilter: "blur(10px)", background: "rgba(0, 0, 0, 0.3)" }}>
        <h1>
          <Link to="/" className="text-xl font-bold text-black">
            Cassy's <span className="text-orange-600">Web</span>
          </Link>
        </h1>

        {/* navitems for lg devices */}
        <ul className="md:flex gap-12 text-lg hidden">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* menu icons*/}
        <div className="text-white md:flex items-center gap-4 hidden">
          <a
            href="https://www.linkedin.com/in/cassandra-lelei-88987a269" target="_blank" rel="noopener noreferrer"
            className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/cassandra18"  target="_blank" rel="noopener noreferrer"
            className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/LelCassandra?t=3buzTiV9hqiVe1T4fJNdZw&s=09"  target="_blank" rel="noopener noreferrer"
            className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out"
          >
            <FaTwitter />
          </a>
          <Link to="/signin">
            <button
              className="bg-white px-2
           text-black
            font-medium round
           hover:bg-orange-500
           hover:text-black
            duration-200 hover:scale-110
            transition ease-in-out
            rounded"
            >
              Login
            </button>
          </Link>
        </div>

        {/* Mobile menu btn, visible only on mobile screens */}
        <div className="md:hidden">
          <button
            className="text-white font-bold text-2xl"
            onClick={toggleMenu}
          >
            {isMenuOPen ? <FaXmark /> : <IoIosMenu />}
          </button>
        </div>
      </nav>

      {/* menu items for mobiile phones */}
      
      <div className={`md:hidden ${isMenuOPen ? "" : "hidden"}`}>
        <ul
          className=" text-lg text-black font-bold
          space-y-4
          px-4
          py-6"
          style={{ backdropFilter: "blur(10px)", background: "rgba(0, 0, 0, 0.3)" }}
        >
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                onClick={toggleMenu}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link}
              </NavLink>
            </li>
          ))}
           <Link to="/login">
          <button
            className="bg-orange-500 px-2 mt-4
           text-black
            font-medium round
           hover:bg-orange-700
           hover:text-black
            duration-200 hover:scale-110
            transition ease-in-out
            rounded"
            style={{opacity: "0.9"}}
          >
            login
          </button>
        </Link>
        </ul>
       
      </div>
    </header>
  );
};

export default Header;
