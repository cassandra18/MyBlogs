import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
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
import AdminDashboard from "./components/admin/adminDashboard";
import ManagePostsPage from './pages/admin/managePosts.tsx'
import Dashboard from './pages/admin/adminDashboard.tsx'

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
        loader: ({params}) => fetch(`http://localhost:3000/api/post/${params.postId}`)
      },
      {
        path: '/get-admin/:adminId',
        element: <SingleAuthor/>,
        loader: ({params}) => fetch(`http://localhost:3000/api/admin/get-admin/${params.adminId}`)
      },
    ]
  },
  {
    path: "/admin",
    element: <Dashboard/>,
    children: [
      {
        path: '/admin',
        element: <AdminDashboard/>,
      },
      {
        path: '/admin/add-post',
        element: <ManagePostsPage/>,
      }
    ]
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>,
)
