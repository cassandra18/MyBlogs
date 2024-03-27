import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (    
      <div className="h-full">
        <Header />
        <Outlet/>
        <ToastContainer />
        <Footer/>
      </div>
      
    )
};


export default App;
