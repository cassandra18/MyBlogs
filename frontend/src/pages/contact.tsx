import React from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import ContactForm from "../components/contactMe";


const Contact: React.FC = () => {
  return (
    <>
    {/* <div className=" py-32 mx-auto" style={{ backgroundImage: "linear-gradient(to bottom right, #F24C02,  #51130B"}}>
      <div className="text-white text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-snug font-bold mb-5">Contact Page</h1>
        <p className="text-gray-100 md:w-3/5 mx-auto  md:mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione eaque consequuntur, asperiores at tempora sit atque delectus.</p>
      </div>
    </div> */}

    <ContactForm />
    </>
  );
};

export default Contact;
