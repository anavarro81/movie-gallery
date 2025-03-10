import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    // Definir estado global   

    const [authData, setAuthData] = useState({'name': null, token: null});   

    const login = (name, token) => {

        console.log(`[AuthProvider]: login name: ${name} '\n' ${token}`);
        setAuthData({token, name});
    }
    
    const logout = () => {  
        setAuthData({token: null, name: null});
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