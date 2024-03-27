import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Sidebar from "./sidebar";

// interface PostData {
//   title: string;
//   content: string;
//   _id: string;
//   authorName: string;
//   createdAt: Date;
//   imageUrl: string;
//   comments: string;
//   ratings: number;
//   category: string;
// }

const SingleBlog = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const postData = await response.json();
        setPostData(postData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!postData) {
    return <div>Error: Post not found</div>;
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
  } = postData;


  return (
    <>
      <div className="max-w-7xl mx-auto mt-24 flex px-2 flex-col md:flex-row gap-12">
        <div className="lg:w-1/2 mx-auto">
          <div>
            <img
              src={imageUrl}
              alt=""
              className="w-full mx-auto max-h-96 rounded object-cover object-center"
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
