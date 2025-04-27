import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Post } from "../types/post";

interface BlogsProps {
  blogs: Post[] | null;
  currentPage: number;
  selectedCategory: string | null;
  pageSize: number;
}

const Blogs: React.FC<BlogsProps> = ({ blogs, currentPage, selectedCategory, pageSize }) => {
  const filteredPosts = (blogs ?? [])
  .filter((post) => 
    !selectedCategory || 
    post.category?.name === selectedCategory  // Compare category.name with selectedCategory
  )
  .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const baseUrl = "http://localhost:3000"; // Make sure to use the correct base URL for your images

  return (
    <>
      {/* Blog Card section */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="p-5 shadow-lg hover:scale-90 transition ease-in-out rounded duration-200 cursor-pointer bg-orange-50 hover:bg-orange-100"
            >
              <div>
                {post.imagePaths && Array.isArray(post.imagePaths) && post.imagePaths.length > 0 ? (
                  <img
                    src={`${baseUrl}/${post.imagePaths[0]}`} // Full URL for the image
                    alt={post.title}
                    className="w-full h-48 object-cover object-center rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-4 mb-2 font-bold hover:text-orange-900 cursor-pointer">
                <h3>{post.title}</h3>
              </div>
              <div className="mb-2 text-sm font-sans text-gray-400">
                <FaUser className="inline-flex text-black items-center mr-2" />
                {post.authorName}
              </div>
              <div className="py-2 text-sm text-gray-400">
                Published:
                {new Date(post.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-orange-100">
            <h1>No blogs yet</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
