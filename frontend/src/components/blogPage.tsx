import React, { useState, useEffect } from "react";
import Blogs from "./Blogs";
import Pagination from "./pagination";
import Categories from "./categories";
import Sidebar from "./sidebar";
import { Post } from "../types/post";

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]); // <-- New!

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `https://cassys-web.onrender.com/api/post?page=${currentPage}&limit=${pageSize}`;

        if (selectedCategory) {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response Data:", data);
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [currentPage, pageSize, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://cassys-web.onrender.com/api/categories"); // <-- Adjust based on your backend
        const data = await response.json();
        const categoryNames = data.map((cat: { name: string }) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActiveCategory(category);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Categories filter */}
        <Categories
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
          categories={categories} // <-- Pass dynamic categories
        />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-12 mt-8">
          <div className="flex-1">
            <Blogs
              blogs={posts}
              currentPage={currentPage}
              selectedCategory={selectedCategory}
              pageSize={pageSize}
            />
          </div>
          <div className=" sm:w-1/5 lg:w-1/6">
            <Sidebar />
          </div>
        </div>

        <Pagination
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          posts={posts}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default BlogPage;
