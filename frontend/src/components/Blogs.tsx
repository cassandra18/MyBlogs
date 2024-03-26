import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface Post {
  title: string;
  content: string;
  _id: string;
  authorName: string;
  createdAt: Date;
  imageUrl: string;
  comments: string;
  ratings: number;
  category: string; 
}

interface BlogsProps {
  posts: Post[] | null;
  currentPage: number;
  selectedCategory: string | null;
  pageSize: number;
}

const Blogs: React.FC<BlogsProps> = ({posts, currentPage, selectedCategory, pageSize}) => {
  const filteredPosts = (posts || [])
  .filter((posts) => !selectedCategory || posts.category === selectedCategory)
  .slice((currentPage -1) *pageSize, currentPage = pageSize);

  console.log(filteredPosts);


  return (
    <>
      {/* Blog Card section*/}
      
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          { filteredPosts ? ( filteredPosts.map((post) => (
              <Link to={`/post/${post._id}`} key={post._id} className="p-5 shadow-lg hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer">
                <div>
                  <img src={post.imageUrl} alt="image" className="w-full  h-48 object-cover object-center" />
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
            <h1>No Posts Yet</h1>
          )}
        </div>
    </>
  );
};

export default Blogs;
