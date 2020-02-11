import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

import useModal from '../hooks/useModal'
import Form from './Form'
import FormGroup from './FormGroup'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const LoginForm = () => {
  const showMessage = useModal()

  const history = useHistory()

  const handleSubmit = async (values, {setSubmitting}) => {
    const { email, password } = values
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      showMessage(`Error al iniciar sesion: code ${err.code}, message ${err.message}`)
      return
    } finally {
      setSubmitting(false)
    }

    showMessage('Inicio de sesion exitoso')
    history.push('/profile')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({errors, touched, isSubmitting}) => <Form>
        <h1>Inicia Sesion</h1>
        <FormGroup>
          <Field name='email' placeholder='Username' />
          {touched.email && errors.email}
        </FormGroup>
        <FormGroup>
          <Field name='password' type='password' placeholder='Password' />
          {touched.password && errors.password}
        </FormGroup>

        <button type='submit' disabled={isSubmitting}>Iniciar sesion</button>
      </Form>}
    </Formik>
  )
}

export default LoginForm
