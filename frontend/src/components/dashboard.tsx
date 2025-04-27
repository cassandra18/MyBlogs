import React, { useState, useEffect } from "react";
import Blogs from "./Blogs";
import Pagination from "./pagination";
import Categories from "./categories";
import Sidebar from "./sidebar";
import { Post } from "../types/post";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Blogs per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>([]); // posts is an array of objects
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]); // New state for categories
  const [token, setToken] = useState(""); // State to hold the JWT token

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://cassys-web.onrender.com/api/categories"); // Adjust based on your backend
        const data = await response.json();
        const categoryNames = data.map((cat: { name: string }) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set categories to an empty array if there's an error
      }
    };

    fetchCategories();
  }, []);

  // Fetch posts by category and page
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `https://cassys-web.onrender.com/api/post/post-by-author?page=${currentPage}&limit=${pageSize}`;

        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch blogs');

        const data = await response.json();
        console.log(data);
        setPosts(data); // Set the fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token, currentPage, pageSize, selectedCategory]);

  // Retrieve the JWT token from localStorage
  const retrieveToken = () => {
    const storedToken = localStorage.getItem('token'); // Assuming token is stored in local storage
    if (storedToken) {
      setToken(storedToken);
    }
  };

  useEffect(() => {
    retrieveToken(); // Call retrieveToken function on component mount
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActiveCategory(category);
  };

  return (
    <>
      {/* Category section */}
      <div className="max-w-3/4">
        <div>
          <Categories
            onSelectCategory={handleCategoryChange}
            selectedCategory={selectedCategory}
            activeCategory={activeCategory}
            categories={categories} // Pass the categories prop
          />
        </div>

        {/* All blogs container */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Blogs section */}
          <Blogs
            blogs={posts}
            currentPage={currentPage}
            selectedCategory={selectedCategory}
            pageSize={pageSize}
          />

          {/* Sidebar component */}
          <div>
            <Sidebar />
          </div>
        </div>

        {/* Pagination */}
        <div>
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            posts={posts}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
