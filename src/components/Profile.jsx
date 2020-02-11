import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'

import useModal from '../hooks/useModal'

const useUser = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const subscription = firebase.auth().onAuthStateChanged(user => {
      setUser(user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return user
}

const Profile = () => {
  const user = useUser()

  const showMessage = useModal()

  const handleSignout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (err) {
      showMessage('Error al cerrar sesion')
      return
    }
  }

  const handleVerifyEmail = () => {
    user.sendEmailVerification()
  }

  return (
    <div style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
      <h1>Datos de Inicio de sesion</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <button onClick={handleSignout}>Cerrar sesion</button>
      <button onClick={handleVerifyEmail}>Enviar email de verificacion</button>
    </div>
  )
}

export default Profile
