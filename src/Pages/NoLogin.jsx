import React from 'react'

const NoLogin = () => {
  return (
    

        <div className='h-screen flex justify-center items-center'>
            <div className='flex flex-col max-w-md justify-center items-center space-x-4 mb-8 '>
            <h2> Debes iniciar sesión para ver gestionar tus películas </h2>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-full'> 
                <a href='/login'> Iniciar sesión </a>
            </button>   

            </div>
        </div>
    

    
  )
}

export default NoLogin