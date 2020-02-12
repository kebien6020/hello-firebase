import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { db } from '../firebase'

import useModal from '../hooks/useModal'


const useTodos = () => {

  const [todos, setTodos] = useState(null)
  const showMessage = useModal()
  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot({
      error() {
        showMessage('Error obteniendo la lista de todos')
      },
      next(dbTodos) {
        setTodos(dbTodos.docs)
      }
    })

    return () => unsubscribe()
  }, [showMessage])

  return todos

}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

const Todo = () => {
  const classes = useStyles()
  const [newTodo, setNewTodo] = useState('')
  const [category, setCategory] = useState('')
  const handleAdd = useCallback(async () => {
    try {
      await db.collection('todos').add({
        text: newTodo,
        category,
      })
    } catch (err) {
      console.error(err.message)
    }

    setNewTodo('')
  }, [category, newTodo])

  const todos = useTodos()

  const categories = todos && todos
    .map(t => t.get('category'))
    .filter(t => t)
    .filter(onlyUnique)

  return (
    <>
      <h1>Cosas por hacer</h1>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder='Tarea' />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder='Categoria' />
      <button onClick={handleAdd}>Agregar</button>
      <hr />
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Default</th>
            {categories && categories.map(category =>
              <th key={category}>{category}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {todos && todos.filter(t => !t.get('category')).map(todo =>
                <p key={todo.id}>{todo.get('text')}</p>
              )}
            </td>
            {categories && categories.map(category =>
              <td key={category}>
                {todos && todos.filter(t => t.get('category') === category).map(todo =>
                  <p key={todo.id}>{todo.get('text')}</p>
                )}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  )
}

const useStyles = makeStyles({
  table: {
    '& td': {
      verticalAlign: 'top',
      borderTopRightRadius: '3em',

    },
  },
})

export default Todo
