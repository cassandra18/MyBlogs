import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

const AboutUs: React.FC = () => {
  return (
    <div className="md:max-w-7xl mx-auto ">
      <div className=" flex ml-1 items-center flex-col md:flex-row gap-12 my-12">
        <img
          src="/public/images/pic7.jpeg"
          alt="image"
          className="rounded-md h-96 mb-4 mr-1"
        />
        <div>
          <h2 className="font-bold text-orange-500 mb-4">
            Software Engineer, Mother, and Dreamer
          </h2>
          <p className="tracking-wider">
            Life is a beautiful tapestry woven with threads of challenges,
            aspirations, and unwavering determination. As a young mother, my
            journey has been particularly enriching, filled with the joys and
            responsibilities of raising a daughter while simultaneously
            embarking on a path of self-discovery and growth. This path has led
            me to the dynamic and ever-evolving field of software engineering –
            a decision fueled by both pragmatism and a genuine passion for the
            craft.
          </p>

          {/* Link to Google Docs document */}
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vRJ1t5MqIrz8LBlikGzM0SsQUGFmUvIoc0uRNeWsQzIZIRX_Mgs0GGSU3lnAMEJeT_raqbM-05Htbuh/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-900 hover:underline mt-4"
          >Get to know more about me by licking this ink</a>
        </div>
      </div>

      {/* <h1 className="font-sans border-b-2  mt-10">Top Authors</h1>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 md:mb-20">
        <Link
          to="/get-admin/65a51f9106a5e0ac01e62882"
          className="p-5 mx-auto text-center shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer"
        >
          <div>
            <img
              src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg"
              alt=""
              className="h-12 mx-auto rounded-full md:mb-4"
            />
          </div>

          <p className="mb-2 text-sm font-sans"> Nana </p>
          <p className="text-gray-400 mb-3">Director of OPerations</p>

          <div className="text-gray-400 mb-3">
            <MdArticle className="inline-flex mr-2" />
            12 Articles Published
          </div>
        </Link>

        <Link
          to="/get-admin/65a51f9106a5e0ac01e62882"
          className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer"
        >
          <div>
            <img
              src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg"
              alt=""
              className="h-12 mx-auto  md:mb-4 mb-2 rounded-full "
            />
          </div>

          <div className="mb-2 text-sm  font-sans">Nana</div>
          <p className="text-gray-400 mb-3">Director of OPerations</p>

          <div className="text-gray-400">
            <MdArticle className="inline-flex mr-2" />
            12 Articles Published
          </div>
        </Link>
        <Link
          to="/get-admin/65a51f9106a5e0ac01e62882"
          className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer"
        >
          <div>
            <img
              src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg"
              alt=""
              className="h-12 mx-auto md:mb-4 rounded-full "
            />
          </div>

          <div className="mb-2 text-sm  font-sans ">Nana</div>
          <p className="text-gray-400 mb-3">Director of OPerations</p>

          <div className="text-gray-400 mb-3">
            <MdArticle className="inline-flex mr-2" />
            12 Articles Published
          </div>
        </Link>

        <Link
          to="/get-admin/65a51f9106a5e0ac01e62882"
          className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer"
        >
          <div>
            <img
              src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg"
              alt=""
              className="h-12 mx-auto md:mb-4 rounded-full "
            />
          </div>

          <div className="mb-2 text-sm  font-sans ">Nana</div>
          <p className="text-gray-400 mb-3">Director of OPerations</p>

          <div className="text-gray-400 mb-3">
            <MdArticle className="inline-flex mr-2" />
            12 Articles Published
          </div>
        </Link> 
        </div>*/}
      
    </div>
  );
};

export default AboutUs;
