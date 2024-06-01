import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase/config";


const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const createUserWithEmail = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email. password)
  }

  const signInWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateProfile = (displayName, photoURL) => {
    setLoading(true)
    return updateProfile(auth, displayName, photoURL)
  }

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, currentUser => {
        if (currentUser) {
          setUser(currentUser)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(false)
        }
        
      })
    }

    return () => {
      return unsubscribe()
    }
  },[])

  const authInfo = {

  }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider