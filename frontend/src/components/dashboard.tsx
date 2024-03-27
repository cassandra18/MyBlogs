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
            posts={posts}
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
// import React, { useState, useEffect } from 'react';

// const Dashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [token, setToken] = useState(""); // State to hold the JWT token

//   useEffect(() => {
//     // Function to fetch user's blogs
//     const fetchBlogs = async () => {
//       try {
//         // Fetch the user's blogs using the stored token
//         const response = await fetch('http://localhost:3000/api/post/post-by-author', {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error('Failed to fetch blogs');

//         const blogsData = await response.json();
//         setBlogs(blogsData);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs(); // Call fetchBlogs function after the token is obtained
//   }, [token]); // Include token in the dependency array to re-fetch blogs when token changes

//   // Function to retrieve token from local storage or state
//   const retrieveToken = () => {
//     const storedToken = localStorage.getItem('token'); // Assuming token is stored in local storage
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   };

//   useEffect(() => {
//     retrieveToken(); // Call retrieveToken function on component mount
//   }, []);

//   return (
//     <div>
//       <h2 className='py-32'>Your Blogs</h2>
//       <ul>
        
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
