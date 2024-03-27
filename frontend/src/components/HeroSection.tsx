
import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

//const img1 = "frontend/public/images/raquel.jpeg";
//const img2 = "frontend/public/images/type.jpeg";
//const img3 = "frontend/public/images/simplybe.jpeg";

const HeroSection: React.FC = () => {
  
  return (
    <div className="py-32 mx-auto h-3/4 flex flex-col justify-center herosection items-center" style={{ 
      backgroundImage: `url(/images/raquel.jpeg)`, 
      backgroundRepeat: 'repeat', 
      backgroundPosition: 'center center' 
    }}>
      <div className="text-black text-center">
        <h1 className="text-4xl md:text-2xl lg:text-7xl leading-snug font-bold mb-5 ">
          Cognitive Chronicles:
        </h1>
        <h3>Stories of Discovery, Reflection, Growth and Tech</h3>
        <div className="mt-5 about-me">
          <Link to="/about" className="font-medium inline-flex py-1">
            About Me <GoArrowRight className="mt-1 ml-1 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;