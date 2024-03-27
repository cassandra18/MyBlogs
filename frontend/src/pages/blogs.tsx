import React from "react";
import BlogPage from "../components/blogPage";

const BlogsBanner: React.FC = () => {
  return (
    <div>
      <div className="bg-black py-32 mx-auto">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-snug font-bold mb-5">
          Life's a Playground: Join Me on the Adventures (and Mishaps)!
          </h1>
          <p className="text-orange-500 md:w-3/5 mx-auto  md:mt-5" style={{opacity: 0.5}}>
          Life is a constant conversation, and I'd love for you to join in. Imagine a cozy coffee shop filled with laughter, insightful discussions, and a sprinkle of vulnerability. That's the vibe I'm going for here at Cassy's Web. So, brew your favorite cup, settle in, and let's chat about everything and anything.
          </p>
        </div>
      </div>

      <BlogPage />
    </div>
  );
};

export default BlogsBanner;
