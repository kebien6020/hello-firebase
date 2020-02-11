import React, { useState, useEffect, useCallback } from 'react'
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

const Todo = () => {
  const [newTodo, setNewTodo] = useState('')
  const handleAdd = useCallback(async () => {
    try {
      await db.collection('todos').add({
        text: newTodo,
      })
    } catch (err) {
      console.error(err.message)
    }

    setNewTodo('')
  }, [newTodo])

  const todos = useTodos()

  return (
    <>
      <h1>Cosas por hacer</h1>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button onClick={handleAdd}>Agregar</button>
      <hr />
      {todos && todos.map(todo =>
        <p key={todo.id}>{todo.get('text')}</p>
      )}
    </>
  )
}

export default Todo
