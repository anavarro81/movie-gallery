import React, {useState, useEffect} from 'react'
import { FaSpinner, FaCheckCircle, FaEye, FaPlus} from "react-icons/fa";
import {axiosInstance} from '../util/axios'
import Header from '../Components/Header'
import borrar_icon from '../assets/borrar_icon.svg'
import NoLogin from './NoLogin'
import { useToken } from '../Providers/tokenProvider';


const MovieGallery = () => {

  const [filter, setFiler] = useState("")
  const [movies, setMovies] = useState([])
  const [isloged, setIsLoged] = useState(false)

  const [token, setToken] = useToken()

  const handleFilterChange = (filter) => () => {    
    setFiler(filter)  
  }

  
  
  // Actualizado si la película ha sido vista o no
  // Recorro el array de peliculas con un map, si la encuentro actualizo el campo watched, si no devuelve la pelicula. 
  const handleWatchedToggle = (id) => () => {
    
    
    
    setMovies((prevMovies) => {
      return prevMovies.map((movie) => {
        if (movie._id === id) {
          return {
            ...movie,
            watched: !movie.watched,
            watchedOn: movie.watched ? null: new Date().toISOString().slice(0, 10)
          }
        }
        return movie
      })
    })
  
    console.log('movies = ', movies)
  
  }

  const handleDeleteMovie = (id) => async () => {

    if (import.meta.env.PROD) {
      alert('Borrado de pelicula desactivado en producción')
      return
    }


    try {
      const movie = await axiosInstance.delete(`movies/${id}`)        
      if(movie.status === 200){
        getMovies()
      }
    } catch (error) {
      console.log('error borrando película: ', error)
    }
    
  } 

  // Filtra las peliculas por su estado. 
  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched
    if (filter === "toWatch") return !movie.watched
    return true
  })

  const  getMovies = async () => {
    
    console.log('Me conecto usando: ', axiosInstance.defaults.baseURL)     
    
    try {
      
      const movies = await axiosInstance.get('/movies/all-movies')


      const moviesUpdated = movies.data.map((movie) => {
        return {
          ...movie,
          // Convierte la fecha a formato dd mes (abreviado) año
          releasedDate: new Date (movie.releasedDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
        }
      })

      console.log('moviesUpdated: ', moviesUpdated)
      setMovies(moviesUpdated)
      
    } catch (error) {
      console.log('error leyendo movies : ', error)      
    }
    

  }


  useEffect(() => {
    
    getMovies()
  }, [])
  

  
  
  return (

    <div className='container mx-auto px-4 py-8 '>        
        <Header />

        {!token 
        
          ? <NoLogin /> : 
          <> 
          <div className='flex justify-center space-x-4 mb-8'>
            
            <button            
              className={`px-4 py-2 rounded-full ${filter === "all" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              aria-label='Todas las peliculas'
              onClick={handleFilterChange("all")}
            >
              Todas
            </button>
  
            <button            
              className={`px-4 py-2 rounded-full ${filter === "watched" ? 'bg-green-500 text-white' : 'bg-gray-200'}`}            
              onClick={handleFilterChange("watched")}
              aria-label='Mostrar películas vistas'
            >
              Vistas
            </button>
  
            <button            
              className={`px-4 py-2 rounded-full ${filter === "toWatch" ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}            
              onClick={handleFilterChange("toWatch")}
              aria-label='Mostrar películas pendientes de ver'
            >
              Pendientes
            </button>
  
  
          </div>
          {/* Galeria de películas */}
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
           {filteredMovies.map((movie) => (
            <div key={movie._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img src={movie.poster} 
              alt={movie.title} poster
              className='w-full h-64 object-cover'
              />
              <div className="p-6">
                <div className='flex justify-between items-center'>
                
                <h2 className='text-2xl font-bold mb-2'>{movie.title}</h2>
                <button onClick={handleDeleteMovie(movie._id)}>
                  <img src={borrar_icon} alt='Borrar película' className='h-6 w-6 ' />
                 </button>
                </div>
                
                <p className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Cine:</span> {movie.cinema}
                </p>
  
                <p className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Fecha de estreno</span> {movie.releasedDate}
                </p>
                
                <p className='text-gray-600 mb-4'>
                <span className='font-semibold'>Género:</span> {movie.genre}            
                </p>
  {/* Toggle: Vista | no vista */}
                <div className='flex justify-between items-center'>
                  <button
                    onClick={handleWatchedToggle(movie._id)}
                    className={`px-4 py-2 rounded-full ${movie.watched ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
                  >
                      
                      {movie.watched 
                      ? 
                      <> 
                        <FaCheckCircle className='inline-block ml-2'/>  Vista
  
                      </>                    
                      : 
                      <> 
                      <FaEye className='inline-block ml-2'/> Pendiente
                      </>
                      }
                      
                      
                  </button>
                  {movie.watched && (
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Vista el:</span> {movie.watchedOn}
                    </p>
                  )}
                </div>
  
              </div>
              
            </div>
          ))}
           </div>
          </>
          
        
        
        }

        


        {/* Botones de filtro */}

    
    </div>

    
  )
}

export default MovieGallery