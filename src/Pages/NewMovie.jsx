import React, { useState, useRef, useEffect} from 'react'
import { TbReceiptYen } from 'react-icons/tb';
import { axiosInstance } from '../util/axios';


const NewMovie = () => {

    

    const [errors, setErrors] = useState({ title: '', cinema: '', releasedDate: '', genre: ''  });
    const [data, setData] = useState({ title: '', cinema: '', releasedDate: '', genre: ''  });
    const [disableSubmit, setDisableSubmit] = useState(true);

    const fileInputRef = useRef(null)
    
    
    // Para habiliar el boton guardar se comprueba cada vez que cambia data. 
    useEffect(() => {
        // Object.values(data) devuelve un array con los valores de las propiedades de data
        // every() devuelve true si todos los elementos del array cumplen la condición
        const allFieldsFilled = Object.values(data).every(field => field !== '');
        setDisableSubmit(!allFieldsFilled);
    }, [data]);

    const handleSubmit = async (e) => {        
        e.preventDefault()


        try {
            const movies = await axiosInstance.post('/movies', data)    
            console.log('pelicula dada de alta: ', movies)
            
        } catch (error) {
            console.log('error al dar de alta la pelicula: ', error.response.data.message)            
        }

    }

    const handleChange = (e) => {

        const { name, value } = e.target

        console.log('he cambiado el valor del campo ', name)
        console.log('he cambiado el valor ', value)

        switch (name) {
            
            case "title":
                if (e.target.value.length < 3) {
                    setErrors({...errors, title: 'El título debe tener al menos 3 caracteres'})
                    console.log('error: ', errors)
                } else {
                    setErrors({...errors, title: ''})
                    setData({...data, title: e.target.value})
                }
                break;

            case "cinema":
                if (value.length === 0) {
                    setErrors({...errors, cinema: 'Debes seleccionar un cine'})
                } else {
                    console.log('cine seleccionado: ', value)
                    setErrors({...errors, cinema: ''})
                    setData({...data, cinema: e.target.value})
                    console.log('data: ', data)
                }
                break;

            case "releasedDate":
                    if (value.length === 0) {
                        setErrors({...errors, releasedDate: 'Debes informar la fecha de lanzamiento'})
                    } else {
                        // Se convierte la fecha a formato local en formato dd mes año                                                
                        setErrors({...errors, releasedDate: ''})
                        setData({...data, releasedDate: value})
                    }
                    break;
            case "genre":
                if (value.length === 0) {
                    setErrors({...errors, genre: 'Debes informar el genero'})
                } else {
                    setErrors({...errors, genre: ''})
                    setData({...data, genre: value})
                }
                break;
            
                default:
                    break;
        

            }

            console.log('data ', data)

            setDisableSubmit(false)            
            console.log('disableSubmit before ', disableSubmit)

            for (const key in data) {

                console.log('key: ', key)
                console.log('data[key]: ', data[key])

                if (data[key] === '') {
                    setDisableSubmit(true)
                }
            }

            console.log('disableSubmit despues ', disableSubmit)

    }

    const handleUploadPhoto = (e) => {
        fileInputRef.current.click()
    }
    

    return (

        <> 
    
        
    
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    
            {/* {showModal  && <Modal message={modalState.message} showModal={setShowModal}/>}     */}
    
            <h2 className="text-2xl font-bold mb-6"> NUEVA PELICULA </h2>
            <form onSubmit={handleSubmit} id='newSitForm' className="space-y-4">
    {/* photo */}            
                <div className='flex flex-col'> 
                    
                    <input 
                        type="file" 
                        name='photo' 
                        accept='image/*' 
                        onChange={handleChange} 
                        className='hidden'
                        ref={fileInputRef}
                    />    
                    <button
                        onClick={handleUploadPhoto}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Subir foto
                        </button>                
                    <span className='text-red-500'> {errors.poster &&  errors.poster} </span>
                </div>
    {/* Title */}            
                <div>
                    <label htmlFor="title" className='block'> Título </label>
                    <input type="text" id='title' name='title' onBlur={handleChange} className='mt-1 block w-full border py-2 px-2'/>
                    <span className='text-red-500'> {errors.title &&  errors.title}</span>
                </div>
    {/* Cinema */}
                <div>
                    <label htmlFor="cinema" className='block'> Cine </label>
                        <select name="cinema" id="cinema" onBlur={handleChange} className='mt-1 block w-full border py-2 px-2'>
                        <option value=""> Elige un cine </option>
                        <option value="Moraleja Greeen"> Moraleja Greeen </option>
                        <option value="Manoteras"> Manoteras </option>                        
                    </select>
                    <span className='text-red-500'> {errors.cinema &&  errors.cinema}</span>    
                </div>
    {/* releasedDate */}
                <div>
                    <label htmlFor="releasedDate" className='block'> Fecha de lanzamiento </label>
                    <input type="date" id='releasedDate' name='releasedDate' onChange={handleChange} className='mt-1 block w-full border py-2 px-2' />
                    {/* <span className='text-red-500'> {errorDescription &&  errorDescription}</span> */}
                </div>

    {/* genero */}
                <div>
                <label htmlFor="genre" className='block'> Genero </label>
                        <select name="genre" id="" onChange={handleChange} className='mt-1 block w-full border py-2 px-2'>
                        <option value=""> Selecciona el genero de la película </option>
                        <option value="Acción"> Acción </option>
                        <option value="Aventura"> Aventura </option>                        
                        <option value="Ciencia Ficción"> Ciencia Ficción </option>
                        <option value="Comedia"> Comedia </option>
                        <option value="Drama"> Drama </option>
                        <option value="Terror"> Terror </option>
                        <option value="Fantasía"> Fantasía  </option>
                        <option value="Musical"> Musical </option>
                        <option value="Thriller"> Thriller </option>
                        <option value="Animación"> Animación </option>
                    </select>

                    <span className='text-red-500'> {errors.genre &&  errors.genre}</span>
                </div>


                <div className={`flex justify-center w-full ${disableSubmit ? `bg-gray-500` : `bg-blue-500 hover:bg-blue-700`}  text-white font-bold py-2 px-4 rounded`}> 
                    <button type='submit' disabled={disableSubmit} className='w-full'>
                        Guardar
                    </button>
                </div>
            </form>
        </main>
        </>
      )
    }
    
    
export default NewMovie

