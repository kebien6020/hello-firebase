import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

const FormGroup = ({className, ...props}) => {
  const classes = useStyles()
  return <div className={clsx(classes.formGroup, className)} {...props} />
}

const useStyles = makeStyles({
  formGroup: {
    width: '100%',
    marginBottom: '1rem',
    display: 'flex',
    flexFlow: 'column',
  },
})

export default FormGroup
