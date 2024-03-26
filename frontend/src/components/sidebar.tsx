import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

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

const Sidebar: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<Post[] | null>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/post/get-posts")
      .then((res) => res.json())
      .then((data) => setPopularPosts(data.slice(0, 15)));
  }, []);

  return (
    <div>

        {/*Latest blogs*/}

      <div className="text-xl font-semibold  text-orange-500 mb-2">Latest Blogs</div>
      <div>
        {popularPosts
          ? popularPosts.slice(0,5).map((post) => (
              <div key={post._id} className="mb-3">
                <h4 className="font-medium mb-2">{post.title}</h4>
                <Link to="/about" className="font-medium hover:text-orange-500 text-orange-900 inline-flex items-center py-1 ">
                    Read More <GoArrowRight className="mt-1 ml-1 text-orange-900 " />
                </Link>
                <div className="border-b-2 w-3/4 "></div>
              </div>
            ))
          : ""}
      </div>

      {/*Popular blogs */}

      <div className="text-xl font-semibold  text-orange-500 mb-2 mt-20">Popular Blogs</div>
      <div>
        {popularPosts
          ? popularPosts.slice(6, 10).map((post) => (
              <div key={post._id} className="mb-3">
                <h4 className="font-medium mb-2">{post.title}</h4>
                <Link to="/about" className="font-medium text-orange-900 hover:text-orange-500 inline-flex items-center py-1 ">
                    Read More <GoArrowRight className="mt-1 ml-1 text-orange-900 " />
                </Link>
                <div className="border-b-2 w-3/4 "></div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Sidebar;
