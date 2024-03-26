
import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

//const img1 = "frontend/public/images/raquel.jpeg";
//const img2 = "frontend/public/images/type.jpeg";
//const img3 = "frontend/public/images/simplybe.jpeg";

const HeroSection: React.FC = () => {
  
  return (
    <div className="bg-[url(/images/type.jpeg)] py-32 mx-auto h-3/4" >
      <div className="text-white text-center ">
        <h1 className="text-4xl md:text-2xl lg:text-7xl leading-snug font-bold mb-5">
          Cognitive Chronicles: Stories of Discovery, Reflection, Growth and Tech
        </h1>
        <div className="mt-5">
          <Link to="/about" className="font-medium hover:text-orange-500 inline-flex py-1">
            About Me <GoArrowRight className="mt-1 ml-1 text-white" />
          </Link>
        </div>
      </div>
      
     
    </div>
  );
};

export default HeroSection;