import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

import useModal from '../hooks/useModal'

const useUser = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user || null)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return user
}

const Profile = () => {
  const user = useUser()

  const history = useHistory()

  const showMessage = useModal()

  const handleSignout = async () => {
    try {
      await auth.signOut()
    } catch (err) {
      showMessage('Error al cerrar sesion')
      return
    }

    history.push('/login')
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
