import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =  useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response: Response = await fetch(
        "http://localhost:3000/api/user/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        setErrorMessage(`Error: ${response.status} - ${errorMessage}`);
        return;
      }

      const { token } = await response.json();


      // Fetch user's blogs after successful login
      const blogsResponse = await fetch('http://localhost:3000/api/post/post-by-author', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!blogsResponse.ok) throw new Error('Failed to fetch blogs');

      const blogs = await blogsResponse.json();
      navigate('/dashboard');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const fetchAuthorData = async (authorId: string) => {
    try {
        const authorResponse = await fetch(
            `http://localhost:3000/api/user/getme`
        );

        const blogResponse = await fetch(
            `http://localhost:3000/api/user/${authorId}/blogs`
        );

        if (!authorResponse.ok || !blogResponse.ok) {
            // Handle error fetching author data or blogs
            return;
        }

        const authorData = await authorResponse.json();
        const blogData = await blogResponse.json();

        navigate("/profile");
    } catch (error) {
        console.error("Error fetching author data: ", error);
    }
  };

  return (
    <div className="py-20 w-full">
      <h1 className="py-10 px-10 text-center">Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="bg-white shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label className="block text-black text-l mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline border"
            id="email"
            type="email"
            placeholder="abc@email.com"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="block text-black text-l mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline border"
            id="password"
            type="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button
          className="w-full mb-8 bg-orange-500 font-bold rounded py-1 shadow-xl focus:outline-none focus:shadow-outline text-white "
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
        <h6 className="text-center">
          Don't have an account? <br />
          <Link to="/signin" className=" text-orange-500">
            Sign in
          </Link>
        </h6>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
