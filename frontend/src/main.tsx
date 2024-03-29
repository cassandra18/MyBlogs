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
import DashboardPage from './pages/dashboardPage.tsx'


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
        path: '/dashboard',
        element: <DashboardPage/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/post/:postId',
        element: <SingleBlog/>,
        loader: ({params}) => fetch(`https://cassys-web.onrender.com/api/post/${params.postId}`)
      },
      {
        path: '/get-admin/:adminId',
        element: <SingleAuthor/>,
        loader: ({params}) => fetch(`https://cassys-web.onrender.com/api/admin/get-admin/${params.adminId}`)
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>,
)
