import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

const AboutUs: React.FC = () => {
    return (
        <div className="md:max-w-7xl mx-auto ">
            <div className=" flex ml-1 items-center flex-col md:flex-row gap-12 mt-12">
                <img src="https://i.pinimg.com/564x/71/46/3d/71463d390f5bcb67e42e4f181ec1e52c.jpg" alt="image"
                className="rounded-md h-96 mb-4 mr-1"/>
                <div>
                    <h2 className="font-bold text-orange-500 mb-4">We love to blog</h2>
                    <p className="tracking-wider">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum aliquid amet aut illo nostrum, cum aspernatur corrupti vel asperiores nulla illum at suscipit inventore eos ratione recusandae minima? Nemo!</p>
                </div>
            </div>

            <h1 className="font-sans border-b-2  mt-10">Top Authors</h1>
            
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 md:mb-20">
                <Link to="/get-admin/65a51f9106a5e0ac01e62882" className="p-5 mx-auto text-center shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer">
                    <div>
                        <img src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg" alt=""
                        className="h-12 mx-auto rounded-full md:mb-4"/>
                    </div>

                    <p className="mb-2 text-sm font-sans"> Nana </p>
                    <p className="text-gray-400 mb-3">Director of OPerations</p>    

                    <div className="text-gray-400 mb-3"><MdArticle className="inline-flex mr-2" />12 Articles Published</div>
                </Link>

                <Link to="/get-admin/65a51f9106a5e0ac01e62882" className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer">
                    <div>
                        <img src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg" alt=""
                        className="h-12 mx-auto  md:mb-4 mb-2 rounded-full "/>
                    </div>

                    <div className="mb-2 text-sm  font-sans">
                        Nana
                    </div>
                    <p className="text-gray-400 mb-3">Director of OPerations</p>    

                    <div className="text-gray-400"><MdArticle className="inline-flex mr-2" />12 Articles Published</div>
                </Link>
                <Link to="/get-admin/65a51f9106a5e0ac01e62882" className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer">
                    <div>
                        <img src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg" alt=""
                        className="h-12 mx-auto md:mb-4 rounded-full "/>
                    </div>

                    <div className="mb-2 text-sm  font-sans ">
                        Nana
                    </div>
                    <p className="text-gray-400 mb-3">Director of OPerations</p>    

                    <div className="text-gray-400 mb-3"><MdArticle className="inline-flex mr-2" />12 Articles Published</div>
                </Link>

                <Link to="/get-admin/65a51f9106a5e0ac01e62882" className="p-5 text-center mx-auto shadow-lg my-10 bg-gray-200 hover:scale-110 transition ease-in-out rounded duration-200 cursor-pointer">
                    <div>
                        <img src="https://i.pinimg.com/564x/09/56/95/095695a5803bd9619b17f6e284a45657.jpg" alt=""
                        className="h-12 mx-auto md:mb-4 rounded-full "/>
                    </div>

                    <div className="mb-2 text-sm  font-sans ">
                    
                        Nana
                    </div>
                    <p className="text-gray-400 mb-3">Director of OPerations</p>    

                    <div className="text-gray-400 mb-3"><MdArticle className="inline-flex mr-2" />12 Articles Published</div>
                </Link>
                 
            </div>
        </div>
    );
};


export default AboutUs;