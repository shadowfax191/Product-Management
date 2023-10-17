/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import auth from "../Firebase/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProdiver = ({children}) => {

    
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const google= new GoogleAuthProvider()

    const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth,google)
    }

        



        useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth,createUser=>{
                setUser(createUser)
                setLoading(false)
                
                
            })
            return ()=>{
                unsubscribe()
            }
        })



const authInfo={createUser, signIn,logOut,signInWithGoogle, user,loading}
    return (
       <AuthContext.Provider value={authInfo} >
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProdiver;