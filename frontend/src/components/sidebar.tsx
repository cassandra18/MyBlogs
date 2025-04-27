import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { Post } from "../types/post";

const Sidebar: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<Post[] | null>(null);

  // Fetching posts on mount
  useEffect(() => {
    fetch("https://cassys-web.onrender.com/api/post")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging to check data
        // Access the 'posts' property and check if it's an array
        if (Array.isArray(data.posts)) {
          setPopularPosts(data.posts); // Setting the posts array
        } else {
          console.error("Fetched 'posts' data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Scroll to top function for "Read More" link
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to render blog list section
  const renderBlogs = (posts: Post[], range: [number, number], title: string) => {
    const [start, end] = range;
    const selectedPosts = posts.slice(start, end);
    return (
      <div>
        <div className="text-xl font-semibold text-orange-500 mb-2">{title}</div>
        {selectedPosts.length > 0 ? (
          selectedPosts.map((post) => (
            <div key={post._id} className="mb-3">
              <h4 className="font-medium mb-2">{post.title}</h4>
              <Link
                to={`/post/${post._id}`}
                onClick={scrollToTop}
                className="font-medium hover:text-orange-500 text-orange-900 inline-flex items-center py-1"
              >
                Read More <GoArrowRight className="mt-1 ml-1 text-orange-900" />
              </Link>
              <div className="border-b-2 "></div>
            </div>
          ))
        ) : (
          <p>No posts available</p> // Show message when no posts are available
        )}
      </div>
    );
  };

  return (
    <div className="mx-3 mt-7">
      {/* Latest Blogs */}
      {popularPosts ? renderBlogs(popularPosts, [0, 3], "Latest Blogs") : <p>Loading posts...</p>}

      {/* Popular Blogs */}
      {popularPosts ? renderBlogs(popularPosts, [3, 10], "Popular Blogs") : <p>Loading posts...</p>}
    </div>
  );
};

export default Sidebar;
