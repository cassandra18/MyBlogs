import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-300 relative">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-30 flex flex-col justify-center items-center w-10 h-10 md:hidden bg-orange-500 rounded-full p-2 shadow-md"
          onClick={toggleSidebar}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white mb-1"
            animate={{
              rotate: isSidebarOpen ? 45 : 0,
              y: isSidebarOpen ? 6 : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white mb-1"
            animate={{
              opacity: isSidebarOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white"
            animate={{
              rotate: isSidebarOpen ? -45 : 0,
              y: isSidebarOpen ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            key="sidebar"
            initial={{ x: isMobile ? -250 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -250 : 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className={`${
              isMobile
                ? "fixed top-0 left-0 h-full z-20 w-64"
                : "w-64 h-auto static"
            } bg-gray-200 border-r-2 border-orange-500 shadow-md flex flex-col p-6`}
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-10 border-b-2 border-orange-400 pb-2">
              Admin Panel
            </h2>

            <ul className="space-y-6 text-lg">
              {[
                { to: "/", label: "Dashboard" },
                { to: "/users", label: "Users" },
                { to: "/admin/add-post", label: "Posts" },
                { to: "/comments", label: "Comments" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block hover:text-orange-500 ${
                      location.pathname === link.to
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-auto p-4 md:p-8 ${!isMobile ? "" : ""}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
