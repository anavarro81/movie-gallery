import MovieGallery from "./Pages/MovieGallery"
import NewMovie from "./Pages/NewMovie"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {AuthProvider} from "./Providers/AuthProvider"

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <MovieGallery />
      },

      {
        path: "/new-movie",
        element: <NewMovie />
      },

      {
        path: "/login",
        element: <Login />
      },

      {
        path: "/register",
        element: <Register />
      }

    ]
  )



  return (
    <AuthProvider> 
      <RouterProvider router={router}/>
    </AuthProvider>
  )
  }
