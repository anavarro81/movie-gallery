import MovieGallery from "./Pages/MovieGallery"
import NewMovie from "./Pages/NewMovie"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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
      }
    ]
  )



  return (
    <RouterProvider router={router}/>
  )
  }
