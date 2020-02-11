import React, { useState } from 'react'
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom'

import ModalContext from './context/ModalContext'

import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import Todo from './components/Todo'

const App = () => {

  const [modalText, setModalText] = useState(null)

  return (
    <BrowserRouter>
      <ModalContext.Provider value={setModalText}>
        <div>
          {modalText && <>
            {modalText}{' '}
            <span onClick={() => setModalText(null)}>x</span>
          </>}
        </div>

        <Switch>
          <Route path='/register' component={RegisterForm} />
          <Route path='/login'    component={LoginForm} />
          <Route path='/profile'  component={Profile} />
          <Route path='/todo'     component={Todo} />
        </Switch>
      </ModalContext.Provider>
    </BrowserRouter>
  )
}

export default App
