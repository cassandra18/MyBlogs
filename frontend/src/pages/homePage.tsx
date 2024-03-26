import React from "react";
import HeroSection from "../components/HeroSection";
import BlogPage from "../components/blogPage";

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection/>
            <div>
            <BlogPage/>
            </div>
        </>
    )
};


export default HomePage;