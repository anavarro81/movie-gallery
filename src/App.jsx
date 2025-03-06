import MovieGallery from "./Pages/MovieGallery"
import NewMovie from "./Pages/NewMovie"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {TokenProvider} from "./Providers/tokenProvider"

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
    <TokenProvider> 
      <RouterProvider router={router}/>
    </TokenProvider>
  )
  }
