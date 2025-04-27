import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { toast } from "react-toastify";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // ✅ Create a navigate function

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setErrorMessage(`Error: ${response.status} - ${errorMessage}`);
        return;
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      localStorage.setItem("token", data.token);

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 5000,
      });

      // ✅ Redirect to admin dashboard after successful signup
      navigate("/admin");

    } catch (error) {
      console.log("Error submitting form:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setErrorMessage("Network error. Please check your connection.");
      } else if (error instanceof SyntaxError) {
        setErrorMessage("Failed to parse server response. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="py-20 w-full"
      
    >
      <h1 className="py-10 px-10 text-orange-500 text-center">Create Account</h1>
      {errorMessage && <div className="error-message text-center text-red-500 mb-4">{errorMessage}</div>}
      
      <form
        className=" bg-gradient-to-br to-orange-100 from-gray-50 shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4"

      >
        <div>
          <label className="block text-black text-l mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline border"
            id="username"
            type="text"
            placeholder="user_name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)' }} 
          />
        </div>

        <br />

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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
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
          className="w-full mb-8 bg-orange-500 font-bold rounded py-2 shadow-xl focus:outline-none focus:shadow-outline text-white hover:bg-orange-600"
          type="button"
          onClick={handleLogin}
        >
          Submit
        </button>

        <h6 className="text-center">
          Already have an account? <br />
          <Link to="/login" className="text-orange-500">
            Log in
          </Link>
        </h6>
      </form>
    </div>
  );
};

export default SignUpForm;
