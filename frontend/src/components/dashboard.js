// Dashboard.js
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/post/post-by-author', {
          headers: { 'Authorization': `Bearer ${yourToken}` },
        });

        if (!response.ok) throw new Error('Failed to fetch blogs');

        const blogsData = await response.json();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Your Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
