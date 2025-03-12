import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    

    const [authData, setAuthData] = useState({'name': null, token: null, id: null});   

    
    // Para evitar que se piedan los datos de autenticación al recargar la página
    // se guardan en el sessionStorage y si existen estos datos se cargan en el estado
    useEffect(() => {

        const localUser = sessionStorage.getItem('user')

        if (localUser) {
            const user = JSON.parse(localUser)
            setAuthData({name: user.name, token: user.token, id: user.id})
        }

    },[]);



    const login = (name, token, id) => {

        console.log(`[AuthProvider]: login name: ${name} '\n' token: ${token} '\n' id: ${id}`);
        sessionStorage.setItem('user', JSON.stringify({name, token, id}));
        setAuthData({token, name, id});
    }
    
    const logout = () => {  
        setAuthData({token: null, name: null, id: null});
        sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={[authData, login, logout]}>
            { children }
        </AuthContext.Provider>
    );

}

const useAuth = () => {    
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;    
}


export { AuthProvider, useAuth };