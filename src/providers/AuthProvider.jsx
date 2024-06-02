import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase/config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const axiosPublic = useAxiosPublic()

  const createUserWithEmail = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {displayName: name, photoURL: photo})
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, currentUser => {
        if (currentUser) {
          setUser(currentUser)
          console.log(currentUser)
          const userInfo = currentUser.email
          axiosPublic.post('/jwt', userInfo)
           .then(res => {
              
              localStorage.setItem('token', `Bearer ${res.data.token}`)
              setLoading(false)
            })
          
        } else {
          setUser(null)
          localStorage.removeItem('token')
          setLoading(false)
        }
        
      })
    }

    return () => {
      return unsubscribe()
    }
  },[axiosPublic])

  const authInfo = {
    loading,
    setLoading,
    user,
    setUser,
    createUserWithEmail,
    signInWithEmail,
    updateUserProfile,
    logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider