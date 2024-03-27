import React, { useState, useEffect } from "react";
import Blogs from "./Blogs";
import Pagination from "./pagination";
import Categories from "./categories";
import Sidebar from "./sidebar";

interface Post {
  title: string;
  content: string;
  _id: number;
  authorName: string;
  createdAt: Date;
  imageUrl: string;
  comments: string;
  ratings: number;
  category: string;
}

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; //  Blogs per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>([]); // posts is an array of objects
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // useEffect is used to connect a component to an external system.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `http://localhost:3000/api/post/get-all-posts?page=${currentPage}&limit=${pageSize}`;

        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setPosts(data); // Set the fetched data as posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage, pageSize, selectedCategory]);

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActiveCategory(category);
  };

  return (
    <div>
      {/* Category section */}
      <div className="max-w-7xl mx-auto">
        <Categories
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
        />

        {/* All blogs container */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Blogs section */}
          <Blogs
            blogs={posts}
            currentPage={currentPage}
            selectedCategory={selectedCategory} // Pass selectedCategory to Blogs
            pageSize={pageSize}
          />

          {/* Sidebar component */}
          <Sidebar />
        </div>

        {/* Pagination */}
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
