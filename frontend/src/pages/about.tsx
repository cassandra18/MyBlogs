import React from "react";
import AboutUs from "../components/AboutUs";

const About: React.FC = () => {
  return (
    <>
    <div className=" bg-black py-32 mx-auto">
      <div className="text-white text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-snug font-bold mb-5">So, Who's Cassandra??</h1>
        <p className=" md:w-3/5 mx-auto  md:mt-5" style={{opacity: 0.5}}>Get to know your Author ;)</p>
      </div>
    </div>

    <AboutUs />
    </>
  );
};

export default About;
