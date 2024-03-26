import React, { useState, SetStateAction, Dispatch } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Styling for toast notifications


const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage]: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status



  //INitiate the login process when the user clicks the submit button.
  const handleLogin = async () => {
    try {
      //use the url to fech input data from the client
      const response = await fetch(
        "http://localhost:3000/api/user/create-user",
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
        // Handle non-successful response
        const errorMessage = await response.text();
        setErrorMessage("Error: ${response.status} - ${errorMessage}");
        
        //console.error("Error:", response.status);
        return;
      }

      //If the response is susccessful the form is submitted sucessfully
      const data = await response.json();
      console.log("Form submitted successfully:", data);
      setIsSubmitted(true);
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
    <div className="py-20 w-full  " >
      <h1 className="py-10 px-10 text-center ">Create Account</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="bg-white shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4">
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
          Submit
        </button>
        <h6 className="text-center">
          Already have an account? <br/>
          <Link to="/login" className=" text-orange-500">
            Log in
          </Link>
        </h6>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
