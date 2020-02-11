import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { auth } from 'firebase/app'
import { useHistory } from 'react-router-dom'

import useModal from '../hooks/useModal'
import Form from './Form'
import FormGroup from './FormGroup'


const initialValues = {
  email: '',
  password: '',
  name: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
})

const RegisterForm = () => {
  const showMessage = useModal()

  const history = useHistory()

  const handleSubmit = async (values, {setSubmitting}) => {
    const { email, password } = values
    let credential
    try {
      credential = await auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      showMessage(`Error al registrar usuario: code ${err.code}, message ${err.message}`)
      setSubmitting(false)
      return
    }

    try {
      await credential.user.sendEmailVerification()
    } catch (err) {
      showMessage(`Error al enviar el correo de verificacion: code ${err.code}, message ${err.message}`)
      setSubmitting(false)
      return
    }

    try {
      await credential.user.updateProfile({
        displayName: values.name,
      })
    } catch (err) {
      showMessage(`Error al guardar el nombre de usuario: code ${err.code}, message ${err.message}`)
      return
    } finally {
      setSubmitting(false)
    }

    showMessage('Registro exitoso')
    history.push('/profile')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({errors, touched, isSubmitting}) => <Form>
        <h1>Registrate</h1>
        <FormGroup>
          <Field name='email' placeholder='Username' />
          {touched.email && errors.email}
        </FormGroup>
        <FormGroup>
          <Field name='password' type='password' placeholder='Password' />
          {touched.password && errors.password}
        </FormGroup>
        <FormGroup>
          <Field name='name' placeholder='Nombre' />
          {touched.name && errors.name}
        </FormGroup>

        <button type='submit' disabled={isSubmitting}>Registrar</button>
      </Form>}
    </Formik>
  )
}

export default RegisterForm
