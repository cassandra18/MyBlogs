import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from "./pages/signUp.tsx";
import LoginPage from "./pages/login.tsx";
import About from "./pages/about";
import Contact from "./pages/contact";
import HomePage from "./pages/homePage";
import BlogPage from './pages/blogs.tsx'
import SingleBlog from './components/SingleBlog.tsx'
import SingleAuthor from './components/SingleAuthor.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/blogs',
        element: <BlogPage/>
      },
      {
        path: '/signin',
        element: <SignInPage/>
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/post/:postId',
        element: <SingleBlog/>,
        loader: ({params}) => fetch(`http://localhost:3000/api/post/${params.postId}`)
      },
      {
        path: '/get-admin/:adminId',
        element: <SingleAuthor/>,
        loader: ({params}) => fetch(`http://localhost:3000/api/admin/get-admin/${params.adminId}`)
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>,
)
