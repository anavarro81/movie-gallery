import React, {useState} from 'react'
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { IoAlertOutline } from "react-icons/io5";
import {useAuth} from '../Providers/AuthProvider'
import {useNavigate} from 'react-router-dom'

import Header from '../Components/Header'
import {axiosInstance} from '../util/axios'
import axios from "axios";

const Login = () => {

    const [loginData, setLoginData] = useState({email: '', password: ''})

    const [showPassword, setShowPassword] = useState(false)

    const [errorLogin, setErrorLogin] = useState('')

    const [authData, login, logout] = useAuth()

    const navigate = useNavigate()
    
    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log('submit')

        try {

            console.log('loginData ', loginData)
            
            const resp = await axiosInstance.post('/user/login', loginData)    
            //const userLogged = await axios.post('http://localhost:3002/user/login', loginData)    
            console.log('userLogged ', resp.data)            
            login(resp.data.name, resp.data.token, resp.data.id)

            navigate('/')

        
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Si el backend responde con un error (código HTTP 4xx o 5xx)
                if (error.response) {
                    console.log('Error del servidor: ', error.response.data?.message || 'Error desconocido');
                    setErrorLogin(error.response.data?.message || 'Error desconocido')
                } 
                // Si la solicitud fue hecha pero no se recibió respuesta (el servidor no responde)
                else if (error.request) {
                    console.log('No se recibió respuesta del servidor', error.request);
                    setErrorLogin(`Error de servidor: ${error.request}`)
                } 
                // Errores que ocurren antes de hacer la solicitud
                else {
                    console.log('Error al configurar la solicitud: ', error.message);
                }
            } else {
                console.log('Error inesperado: ', error);
            }

        }


    }

    const showHidePassword =  () => {        
        setShowPassword(!showPassword)
    }

    

    const handleChange = (e) => {
        

        const {name, value} =  e.target
        
        console.log('name : ', name)
        console.log('value: ', value)
        
        setLoginData({...loginData, [name]: value})
    }

  return (
    <> 
    <Header />
    <div className='min-h-screen flex flex-col justify-center items-center p-4' data-role='main-container'> 
    
        <div className='max-w-md mx-auto rounded-lg p-8 w-full bg-white shadow-md' data-role='login-form'>
        <h2 className='text-3xl text-center font-bold mb-6'> Iniciar Sesión </h2>

            {errorLogin && 
            
            
            <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-md max-w-md mb-2">
            <IoAlertOutline className="w-5 h-5 text-red-600" />
            <p className="text-sm">
                {errorLogin}
                
            </p>
            </div>
            
            
            }

            <form className='space-y-4 ' onSubmit={handlesubmit}> 


                
                {/* email */}
                <div> 
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'> Correo electrónico </label>
                    <input 
                        name="email" 
                        class="mt-1 block w-full px-3 py-2 border" type="text" placeholder='tu@ejemplo.com'
                        onChange={handleChange}
                        />
                </div>

                <div> 
                    {/* password */}
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700' > Contraseña </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            className="mt-1 block w-full px-3 py-2 border" placeholder='********' 
                            onChange={handleChange}
                        />
                        <button
                            type='button'
                            className='absolute inset-y-0 right-0 px-3 flex items-center'
                            onClick={showHidePassword}
                            >
                                
                            {showPassword ? 
                            <FaEyeSlash className="h-5 w-5 text-gray-400" />
                            :                            
                            <FaEye className="h-5 w-5 text-gray-400" />
                            }
                            
                        </button>
                    </div>
                </div>
                <div>
                <button 
                    className='bg-blue-500 text-white p-2 rounded-md w-full'
                    type='submit'
                >    
                    Iniciar Sesión
                </button>
                </div>


            </form>
            <div className='mt-6 text-center'>
                <a className='text-blue-600 hover:text-blue-500' href='/register'> ¿No tienes una cuenta? Regístrate </a>
            </div>
        </div>
        
        
    </div>
    </>
  )
}

export default Login