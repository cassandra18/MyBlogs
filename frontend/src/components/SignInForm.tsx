import React, { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =  useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status



  //initiate the login process when the user clicks the submit button.
  const handleLogin = async () => {
    try {
      //use the url to fech input data from the client
      const response = await fetch(
        "https://cassys-web.onrender.com/api/user/create-user",
        {
          method: "POST",
          headers: {
            //object representing the headers part of the HTTP request
            "content-type": "application/json", // type of content being sent to the server is in JSON format
          },
          body: JSON.stringify({
            //convert JS objects into JSON string.
            username,
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
      //If the response is susccessful the form is submitted sucessfully
      const data = await response.json();
      if (isSubmitted){
        console.log("Form submitted successfully:", data);

        setIsSubmitted(true);
      }
      toast.success("Form submitted successfully!", {
        position: "top-right", // Adjust position as needed
        autoClose: 5000, // Close after 5 seconds
      });
    
    } catch (error) {
      //Handle errors that might occur during non-successful response

      console.log("Error submitting form:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setErrorMessage("Network error. PLease check your connection.");
      } else if (error instanceof SyntaxError) {
        setErrorMessage("Failed to parse server response. Please try again.");
      } else {
        setErrorMessage("An unexpeted error occured. Please try again later.");
      }
    }
  };

  return (
    <div className="py-20 w-full  "  style={{ backgroundImage: "linear-gradient(to bottom right, rgba(188, 220, 209, 0.7), rgba(137, 167, 167, 0.7), rgba(205, 229, 220, 0.7))" }}>
      <h1 className="py-10 px-10 text-white text-center ">Create Account</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="bg-white shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4"
       style={{ backgroundImage: "linear-gradient(to bottom right, rgba(188, 220, 209, 0.7), rgba(137, 167, 167, 0.7), rgba(205, 229, 220, 0.7))" }}>
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
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)', outline: 'none !important' }} 
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
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)', outline: 'none !important' }} 
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
            style={{ backgroundColor: 'rgba(188, 220, 209, 0.1)', outline: 'none !important' }} 
          />
        </div>
        <br />
        <button
          className="w-full mb-8 bg-orange-500 font-bold rounded py-1 shadow-xl focus:outline-none focus:shadow-outline text-white "
          type="button"
          onClick={handleLogin}
        >
          Submit
        </button>
        <h6 className="text-center">
          Already have an account? <br/>
          <Link to="/login" className=" text-orange-500">
            Log in
          </Link>
        </h6>
      </form>
    </div>
  );
};

export default SignUpForm;
