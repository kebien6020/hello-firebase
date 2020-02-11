import React, { useState } from 'react'
import ModalContext from './context/ModalContext'

import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'

const App = () => {

  const [modalText, setModalText] = useState(null)

  return (
    <div>
      <ModalContext.Provider value={setModalText}>
        <div>
          {modalText && <>
            {modalText}{' '}
            <span onClick={() => setModalText(null)}>x</span>
          </>}
        </div>


        <RegisterForm />
        <LoginForm />
        <Profile />
      </ModalContext.Provider>
    </div>
  )
}

export default App
