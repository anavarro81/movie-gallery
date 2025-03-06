import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    
    // Definir estado global   

    const [token, setToken] = useState('');
    
    

    return (
        <TokenContext.Provider value={[token, setToken]}>
            { children }
        </TokenContext.Provider>
    );

}

const useToken = () => {    
    const context = useContext(TokenContext)
    if (!context) {
        throw new Error('useToken debe ser usado dentro de un TokenProvider');
    }
    
    return context;    
}


export { TokenProvider, useToken };