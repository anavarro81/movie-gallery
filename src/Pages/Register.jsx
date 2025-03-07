import React, {useState} from 'react'
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import Header from '../Components/Header'
import {axiosInstance} from '../util/axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({name: '', email: '', password: ''})

    const navigate = useNavigate()

    const handleChange = (e) => {      

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        console.log('data ', data)

        try {
            const resp = await axiosInstance.post('/user/register', data)            
            navigate('/login')
        } catch (error) {            
            console.log('error en el registro ', error)    
        }

        
    
    }


  return (
    <> 
    <Header />
    <div className='min-h-screen flex flex-col justify-center items-center p-4' data-role='main-container'> 
        <div className='max-w-md mx-auto rounded-lg p-8 w-full bg-white shadow-md' data-role='login-form'>
        <h2 className='text-3xl text-center font-bold mb-6'> Registro  </h2>
            <form onSubmit={handleSubmit} className='space-y-4 '> 

                <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700'> Nombre </label>
                    <input 
                        name="name" 
                        class="mt-1 block w-full px-3 py-2 border" type="text" placeholder='tu nombre '
                        onChange={handleChange}
                        />                    
                </div>

                
                <div> 
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'> Correo electrónico </label>
                    <input 
                        name="email" 
                        class="mt-1 block w-full px-3 py-2 border" 
                        type="text" 
                        placeholder='tu@ejemplo.com'
                        onChange={handleChange}
                        />
                </div>
                <div> 
                    
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700' > Contraseña </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <input 
                            name="password" 
                            className="mt-1 block w-full px-3 py-2 border" 
                            type="password" 
                            placeholder='********' 
                            onChange={handleChange}
                            />
                        <button
                            type='button'
                            className='absolute inset-y-0 right-0 px-3 flex items-center'>
                            <FaEye className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div>
                <button 
                    className='bg-blue-500 text-white p-2 rounded-md w-full'
                    type='submit'
                >    
                    Registrarme
                </button>
                </div>


            </form>
        </div>
        
        
    </div>
    </>
  )
}

export default Register