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
    localStorage.removeItem("token")
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setLoading(true)
        setUser(currentUser);
        if (currentUser) {
          console.log(currentUser)
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setLoading(false);
                    }
                })
        }
        else {
            // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
            localStorage.removeItem('token');
            setLoading(false);
        }
        
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])

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