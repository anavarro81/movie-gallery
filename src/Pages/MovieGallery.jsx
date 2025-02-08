import React, {useState} from 'react'
import { FaSpinner, FaCheckCircle, FaEye } from "react-icons/fa";



const MovieGallery = () => {

  const [filter, setFiler] = useState("")
  const [movies, setMovies] = useState(
    [
      {
        id: 1,
        title: "Mufasa: El rey león",
        poster: "https://pics.filmaffinity.com/mufasa_the_lion_king-600247674-mmed.jpg",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: false,
        watchedOn: "2025-05-15"

      },

      {
        id: 2,
        title: "The Brutalist",
        poster: "https://pics.filmaffinity.com/the_brutalist-339944470-mmed.jpg",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: true,
        watchedOn: "2025-05-15"

      },

      {
        id: 3,
        title: "Conclave",
        poster: "https://pics.filmaffinity.com/conclave-496920745-large.jpg",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: true,
        watchedOn: "2025-05-15"

      },

      {
        id: 4,
        title: "La acompañante",
        poster: "https://pics.filmaffinity.com/companion-438784716-mmed.jpg",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: true,
        watchedOn: null

      },

      {
        id: 5,
        title: "Maria Calas",
        poster: "",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: false,
        watchedOn: null

      },

      {
        id: 6,
        title: "Mikaela",
        poster: "",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: false,
        watchedOn: null

      },

      {
        id: 7,
        title: "Septiembre 5",
        poster: "",
        cinema: "Cinesa Moraleja Green",
        releasedDate: "2010-07-16",
        genre: "Action, Adventure, Sci-Fi",
        watched: false,
        watchedOn: null

      },





    ]
  )

  const handleFilterChange = (filter) => () => {
    console.log('')
    setFiler(filter)
  
  }
  
  // Actualizado si la película ha sido vista o no
  // Recorro el array de peliculas con un map, si la encuentro actualizo el campo watched, si no devuelve la pelicula. 
  const handleWatchedToggle = (id) => () => {
    setMovies((prevMovies) => {
      return prevMovies.map((movie) => {
        if (movie.id === id) {
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



  // Filtra las peliculas por su estado. 
  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched
    if (filter === "toWatch") return !movie.watched
    return true
  })
  
  return (

    <div className='container mx-auto px-4 py-8'>        
        <h1 className='text-3xl font-bold text-center mb-8 '> Peliculas favoritas</h1>        
        {/* Botones de filtro */}
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
          <div key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img src={movie.poster} 
            alt={movie.title} poster
            className='w-full h-64 object-cover'
            />
            <div className="p-6">
              <h2 className='text-2xl font-bold mb-2'>{movie.title}</h2>
              
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
                  onClick={handleWatchedToggle(movie.id)}
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

    
    </div>

    
  )
}

export default MovieGallery