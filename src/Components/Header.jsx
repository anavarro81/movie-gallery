import React, {useRef, useState, useEffect} from 'react'
import {useAuth} from '../Providers/AuthProvider' 

const Header = () => {

  const [authData, login, logout] = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  console.log('authData: ', authData)

  const userMenu = useRef(null)

  useEffect(() => {

    const handleClickOutside = (e) => {

    // Si el menu está visible (userMenu.current existe) y el click se hace fuera del menu
    // e.target -> es el elemento donde se ha hecho click.
      if (userMenu.current && !userMenu.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

  },[])


  // Elimina el token de la sesión
  const deleteToken = () => {
    logout()
  }

  return (
    <header className="bg-blue-600 text-white p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="flex items-center">            
            <h1 className="text-2xl font-bold"> <a href='/'> Movie DB </a>  </h1>
          </div>
          {authData.token ? (
            <> 
                  

          <div className='relative'> 
            <button 
              className='h-8 w-8 text-white bg-green-500 rounded-full'
              
              onClick={() => setShowUserMenu(true)}
              
            >
              {authData.name[0].toUpperCase()}
            </button>
            
            {showUserMenu && (
              
              <div
              className="absolute z-10 w-36   mt-2  border-amber-500 bg-white rounded-lg shadow-xl border transition-all duration-300 ease-in-out transform origin-top-left"
              name='userButton'
              ref={userMenu}
              style={{
                top: '127%',                
                right: '-11px',                
                transform: 'translateX(0) scale(1)',
                opacity: 1,
                
              }}
            
              >

                <button 
                  className='block w-full p-4 text-black text-center hover:bg-gray-700 hover:text-white cursor-pointer'>                  
                  <a href='/new-movie'> Nueva película </a>
                </button>

                <button 
                  className='block w-full p-4 text-black text-center hover:bg-gray-700 hover:text-white cursor-pointer'
                  onClick={deleteToken}
                  > 
                  Cerrar Sesion 
                </button>
                

              </div>
            
                     
            
            )}

          </div>  
          
          </>

          ) : (
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/login" className="hover:text-blue-200"> Iniciar sesión </a></li>
            </ul>
          </nav>
          )}
        </div>
      </header>
  )
}

export default Header