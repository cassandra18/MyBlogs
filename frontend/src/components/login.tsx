import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(`Error: ${response.status} - ${errorText}`);
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      
      console.log("Login successful:", token);
      toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

      navigate('/admin'); // Route user to Admin Dashboard after login
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-20 w-full bg-gradient-to-br from-orange-100 to-white" >
      <h1 className="py-10 px-10 text-orange-500 text-center">Login</h1>
      {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
      
      <form className="bg-gray-50 shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4">
        
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
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)' }} 
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
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)' }} 
          />
        </div>

        <br />
        
        <button
          className="w-full mb-8 bg-orange-500 font-bold rounded py-2 shadow-xl focus:outline-none focus:shadow-outline text-white"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>

        <h6 className="text-center">
          Don't have an account? <br />
          <Link to="/signup" className="text-orange-500">
            Sign up
          </Link>
        </h6>

      </form>
    </div>
  );
};

export default LoginForm;
