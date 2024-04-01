import React from "react";
const AboutUs: React.FC = () => {
  return (
    <div className="md:max-w-7xl mx-auto ">
      <div className=" flex ml-1 items-center flex-col md:flex-row gap-12 my-12">
        <img
          src="/images/pic7.jpeg"
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
          >Get to know more about me by clicking this link</a>
        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;
