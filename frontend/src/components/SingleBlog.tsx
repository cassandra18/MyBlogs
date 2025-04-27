import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Sidebar from "./sidebar";


const SingleBlog = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`https://cassys-web.onrender.com/api/post/${postId}`);
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
    imagePaths,
    createdAt,
    authorName,
  } = postData;
  const baseUrl = "https://cassys-web.onrender.com"; 

  return (
    <>
      <div className="max-w-7xl mx-auto mt-24 flex px-2 flex-col md:flex-row gap-12">
        <div className="lg:w-1/2 mx-auto">
          <div>
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
            <img
              src={`${baseUrl}/${imagePaths[0]}`} // Full URL for the image
              alt={title}
              className="w-full mt-10 mx-auto max-h-96 rounded object-cover object-center"
            ></img>
            
            

            <p className="text-base text-gray-800 mb-6 font-serif mt-7">{content}</p>
          </div>
        </div>

        <div className="lg:w-1/4">
            <Sidebar/>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
