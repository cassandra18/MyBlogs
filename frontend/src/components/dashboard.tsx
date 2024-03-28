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

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; //  Blogs per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>([]); // posts is an array of objects
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [token, setToken] = useState(""); // State to hold the JWT token

  //useEffect is used to connect a component to an external system. For this case, it connects us to a browser API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `http://localhost:3000/api/post/post-by-author?page=${currentPage}&limit=${pageSize}`;

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
        setPosts(data); // the state of the blog post changes froman empty array to the fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token, currentPage, pageSize, selectedCategory]);

  const retrieveToken = () => {
      const storedToken = localStorage.getItem('token'); // Assuming token is stored in local storage
       if (storedToken) {
        setToken(storedToken);
       }
     };

     useEffect(() => {
     retrieveToken(); // Call retrieveToken function on component mount
     }, []);

  //page changing button
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //category changing btn
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActiveCategory(category);
  };

  return (
    <div>

      {/* category section */}
      <div className="max-w-7xl mx-auto">
        <div>
          <Categories
            onSelectCategory={handleCategoryChange}
            selectedCategory={selectedCategory}
            activeCategory={activeCategory}
          />
        </div>

        {/* All blogs container */}
        <div className="flex flex-col md:flex-row gap-12">
          {/*Blogs section */}

          <Blogs
            blogs={posts}
            currentPage={currentPage}
            selectedCategory={selectedCategory}
            pageSize={pageSize}
          />

          {/*sidebar component */}
          <div>
            <Sidebar />
          </div>
        </div>

        {/*pagination */}
        <div>
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            posts={posts}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
