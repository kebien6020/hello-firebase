import React from 'react'
import { Form as FormikForm } from 'formik'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

const Form = ({className, ...props}) => {
  const classes = useStyles()
  return <FormikForm className={clsx(classes.form, className)} {...props}/>
}

const useStyles = makeStyles({
  form: {
    marginTop: '3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
})

export default Form
