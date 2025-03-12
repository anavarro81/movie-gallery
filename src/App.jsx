import MovieGallery from "./Pages/MovieGallery"
import NewMovie from "./Pages/NewMovie"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {AuthProvider} from "./Providers/AuthProvider"
import { useEffect } from "react"
import {useAuth} from '../src/Providers/AuthProvider'

export default function App() {

  

  useEffect(() => {       

    const handleReloadPage = (e) => {      
      
      // Se guarda el usuario en el sessionStorage para que no se pierda al recargar la página
      const localUser = sessionStorage.getItem('user')      

      console.log('localUser ', localUser)

      // Si el usuario está logueado se guarda en el sessionStorage
      if (localUser) {
        console.log('guardo local user')
        sessionStorage.setItem('user', localUser); 
        
        alert('Se guardó el usuario en el sessionStorage')
      }

      
      


      
    }  

    window.addEventListener('beforeunload', handleReloadPage)
    
    // Se elimina el event listener cuando el componente se desmonta para evitar efectos no desados
    return () => {
      window.removeEventListener('beforeunload', handleReloadPage);
    };
  }, [])
  


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
