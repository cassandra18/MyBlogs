import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Sidebar from "./sidebar";

interface PostData {
  title: string;
  content: string;
  _id: string;
  authorName: string;
  createdAt: Date;
  imageUrl: string;
  comments: string;
  ratings: number;
  category: string;
}

const SingleBlog: React.FC = () => {
  const data = useLoaderData() as PostData[];
  console.log("data:", data);

  if (!data || data.length === 0) {
    return <div>loading...</div>;
  }

  const {
    title,
    content,
    category,
    imageUrl,
    createdAt,
    authorName,
    comments,
    ratings,
  } = data[0] || {};

  return (
    <>
      <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row gap-12">
        <div className="lg:w-w/4 mx-auto">
          <div>
            <img
              src={imageUrl}
              alt=""
              className="w-full mx-auto rounded object-cover object-center"
            ></img>
            <h2 className="text-3xl text-orange-800 font-bold mt-8 mb-4 ">
              {title}
            </h2>
            <p className="mb-3 text-gray-600">
              <FaUser className="inline-flex items-center mr-2" /> {authorName}{" "}
              |{" "}
              {new Date(createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="text-base text-gray-800 mb-6">{content}</p>
          </div>
        </div>

        <div className="lg:w-1/2">
            <Sidebar/>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
