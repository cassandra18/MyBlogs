import React from "react";
const AboutUs: React.FC = () => { 
  // this is a comment 
  return (
    <div className=" max-w-7xl mx-auto mt-28" >
      <div className=" flex ml-1 items-center flex-col  gap-12 my-12" >
        <img
          src="/images/pic7.jpeg"
          alt="image"
          className="rounded-md h-96 mb-4 mr-1"
        />
        <div >
          <h2 className="font-bold text-orange-500 mb-4">
            Software Engineer, Mother, and Dreamer
          </h2>
          <p className="tracking-wider">
          Hi, I'm Cassandra Lelei — a creator, a builder, and a storyteller at heart.
I live at the crossroads of technology and creativity, blending the structured world of development with the vibrant energy of human connection.

I'm passionate about bringing ideas to life through beautiful, functional digital experiences. Whether I'm coding a sleek web app, designing a blog platform, or exploring new creative projects, I pour heart, vision, and precision into everything I do. To me, technology isn’t just about functionality — it’s about telling a story, solving real problems, and inspiring people along the way.

With a background rooted in web development (React, Tailwind, Node.js, and more), and a deep love for aesthetics, I’m always chasing that perfect balance between clean design and powerful functionality. I love learning, I love building, and I’m endlessly curious about how far creativity and innovation can take us.

Outside of tech, I’m deeply passionate about mental health, growth, and living authentically. I believe in creating spaces that uplift, empower, and connect — both online and offline. Every project I work on is a small step toward building a world where creativity, kindness, and innovation live hand in hand.

I'm not just here to build a career.
I'm here to build a life — and a legacy — that inspires others to dream, create, and believe in their own magic.
          </p>

        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;
