import { useState,createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
const AuthContext = createContext(null)

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const login = (user) =>{
        localStorage.setItem('token',user);
        const decoded = jwt_decode(user);
        localStorage.setItem('name',user);
        const name=decoded.firstName + " "+decoded.lastName;
        localStorage.setItem('name',name);
        localStorage.setItem('role',decoded.role);
        localStorage.setItem('id',decoded.id);
        setUser(localStorage.getItem('name'))
    }

    const logout = () =>{
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}