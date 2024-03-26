import React from "react";
import AboutUs from "../components/AboutUs";

const About: React.FC = () => {
  return (
    <>
    <div className="bg-black py-32 mx-auto">
      <div className="text-white text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-snug font-bold mb-5">Who We Are</h1>
        <p className="text-gray-100 md:w-3/5 mx-auto  md:mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione eaque consequuntur, asperiores at tempora sit atque delectus.</p>
      </div>
    </div>

    <AboutUs />
    </>
  );
};

export default About;
