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

  async function register(data) {
    return auth.createUserWithEmailAndPassword(data.email, data.password).then(async (_) => {
      await auth.signOut()

      await Client.create({
        nume: data.lastName,
        prenume: data.firstName,
        CNP: data.cnp,
        nume_utilizator: data.username,
        mail: data.email,
        adresa: data.address
      })

      const userQuery = (await Client.all().where('mail', '==', data.email).get())
      if (userQuery.size !== 1)
        throw new Error('Found too many entries for the same email')

      ClientAccountCreation.create({
        client: {
          collection: Client.collection,
          id: userQuery.docs[0].id
        }
      })
    })
  }

  async function login(email, password) {
    const currentUser = (await Client.all().where('mail', '==', email).get()).docs[0]
    const accountRequest = (await ClientAccountCreation.all().where('client.id', '==', currentUser.id).get())

    if (accountRequest.size !== 0)
      throw new Error('The account creation request has not been accepted yet! !')

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
