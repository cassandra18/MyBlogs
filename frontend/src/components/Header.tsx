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
    <header className=" bg-black text-white font-bold fixed top-0 left-0 right-0" style={{ opacity: 0.5, height: "50px" }}>
      <nav className="px-2 py-2 max-w-7xl mx-auto flex justify-between items-center">
        <h1>
          <Link to="/" className="text-xl font-bold">
            Cassy's <span className="text-orange-500">Web</span>
          </Link>
        </h1>

        {/* navitems for lg devices */}
        <ul className="md:flex gap-12 text-lg hidden">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink to={path}  className={({ isActive }) =>
                isActive ? "active" : ""}>{link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* menu icons*/}
        <div className="text-white md:flex items-center gap-4 hidden">
          <Link to="https://www.linkedin.com/in/cassandra-lelei-88987a269" className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out">
            <FaLinkedin />
          </Link>
          <Link to="https://github.com/cassandra18"className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out" >
            <FaGithub />
          </Link>
          <Link to="https://x.com/LelCassandra?t=3buzTiV9hqiVe1T4fJNdZw&s=09" className="hover:text-orange-500 duration-200 hover:scale-110 transition ease-in-out">
            <FaTwitter />
          </Link>
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
      <div>
        <ul
          className={`md:hidden gap-12 text-lg text-black
          block
          space-y-4
          px-4
          py-6
          mt-16
          bg-white
          ${ isMenuOPen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden" }`}
        >
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink onClick={ toggleMenu } to={path} className={({ isActive }) =>
                isActive ? "active" : ""}>{link}</NavLink>
                <Link to="/login">
            <button
              className="bg-orange-500 px-4 py-2
           text-white
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
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
