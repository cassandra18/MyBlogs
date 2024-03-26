import React from "react";
import BlogPage from "../components/blogPage";

const BlogsBanner: React.FC = () => {
  return (
    <div>
      <div className="bg-black py-32 mx-auto">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-snug font-bold mb-5">
            Blog Page
          </h1>
          <p className="text-gray-100 md:w-3/5 mx-auto  md:mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            ratione eaque consequuntur, asperiores at tempora sit atque
            delectus.
          </p>
        </div>
      </div>

      <BlogPage />
    </div>
  );
};

export default BlogsBanner;
