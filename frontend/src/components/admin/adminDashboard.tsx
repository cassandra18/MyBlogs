import React from "react";
import Layout from "./layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Warm Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-orange-500">Welcome, Admin! 👋</h1>
          <p className="mt-2 text-gray-600 text-lg">Manage your blog content, users, and settings all from here.</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Posts Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-orange-100 rounded-2xl shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-black mb-2">120</h2>
            <p className="text-gray-700">Total Posts</p>
          </motion.div>

          {/* Users Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-orange-100 rounded-2xl shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-black mb-2">45</h2>
            <p className="text-gray-700">Total Users</p>
          </motion.div>

          {/* Comments Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-orange-100 rounded-2xl shadow-md hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-black mb-2">320</h2>
            <p className="text-gray-700">Total Comments</p>
          </motion.div>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Link to="/admin/add-post" className="block p-6 bg-white border border-orange-400 rounded-2xl text-center hover:bg-orange-100 transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">➕ Add New Post</h3>
            <p className="text-gray-600">Create and publish a new blog post.</p>
          </Link>

          <Link to="/users" className="block p-6 bg-white border border-orange-400 rounded-2xl text-center hover:bg-orange-100 transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">👥 Manage Users</h3>
            <p className="text-gray-600">View and edit users of the site.</p>
          </Link>

          <Link to="/comments" className="block p-6 bg-white border border-orange-400 rounded-2xl text-center hover:bg-orange-100 transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">📝 Manage Comments</h3>
            <p className="text-gray-600">Approve, delete, or review comments.</p>
          </Link>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDashboard;
