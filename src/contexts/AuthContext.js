import React, { useContext, useState, useEffect } from 'react'
import Client from '../models/Client'
import ClientAccountCreation from '../models/ClientAccountCreation'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function register(data) {
    return auth.createUserWithEmailAndPassword(data.email, data.password).then(async (_) => {
      await Client.create({
        nume: data.lastName,
        prenume: data.firstName,
        CNP: data.cnp,
        nume_utilizator: data.username,
        mail: data.email,
        adresa: data.address
      })

      const currentUser = (await Client.all().where('mail', '==', data.email).get()).docs[0]
      ClientAccountCreation.create({
        client: {
          collection: Client.collection,
          id: currentUser.id
        }
      })
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
