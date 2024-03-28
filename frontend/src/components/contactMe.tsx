import React, { useState } from "react";

import { toast } from "react-toastify";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] =  useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status



  //initiate the login process when the user clicks the submit button.
  const handleLogin = async () => {
    try {
      //use the url to fech input data from the client
      const response = await fetch(
        "http://localhost:3000/api/contactme",
        {
          method: "POST",
          headers: {
            //object representing the headers part of the HTTP request
            "content-type": "application/json", // type of content being sent to the server is in JSON format
          },
          body: JSON.stringify({
            //convert JS objects into JSON string.
            name,
            email,
            message,
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
    <div className="py-20 w-full  " style={{ backgroundImage: "linear-gradient(to bottom right, rgba(188, 220, 209, 0.7), rgba(137, 167, 167, 0.7), rgba(205, 229, 220, 0.7))" }}>
      <h1 className="py-10 px-10 text-white text-center ">Contact me. Lets engage!</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="shadow-md max-w-xl mx-auto rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label className="block text-black text-l mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline border"
            id="name"
            type="text"
            placeholder="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
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
          <label className="block text-black text-l mb-2" htmlFor="message">
            message
          </label>
          <textarea
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline border"
            id="message"
            placeholder="Enter text here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            cols={50}
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
        
      </form>
    </div>
  );
};

export default ContactForm;
