import React, { createContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export const Todos = createContext() 
 function Context({children}) {
const [errorMsg , setErrorMsg] = useState('')
const [loading , setLoading] = useState(false)
const [todos,setTodos] = useState([])
const [currentTodo , setCurrentTodo] = useState(null)
const navigate = useNavigate()

const fetchTodoData = async () => {
  try {
    setLoading(true)
    const res = await fetch('http://localhost:3000/api/todo/getTodo')
    const data = await res.json()
    setTodos(data.todos || [])
    setLoading(false)
    if(!res.ok){
      setErrorMsg(data.message)
    }
  } catch (error) {
     console.error('Error get todo:', error);
  }
}

const getByIdTodo = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todo/getById/${id}`)
 const data = await res.json()
  if(res.status == 200){
    setCurrentTodo(data.todos)
  }
  return res
  } catch (error) {
    console.log(error)
  }
}
 const createTodo = async (input) => {
  try {
    const res = await fetch('http://localhost:3000/api/todo/create' , {
      method : 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body : JSON.stringify(input)
    })
    toast.success('Create Task SuccessFully ..!')
    navigate('/')
    if (!res.ok) {
        console.error('Error creating todo:', res.status, res.statusText);
        return;
      }
      await fetchTodoData()
       reset();
  } catch (error) {
    console.error('Error creating todo:', error);
  }
 }

 const deleteTodo = async (id) => {
   try {
    const res = await fetch(`http://localhost:3000/api/todo/delete/${id}` , {
      method : 'DELETE'
    })
    toast.success('Delete successFully ..!')
    if(!res.ok){
      console.error('Error deleting todo:', res.status, res.statusText);
        return;
    }
    await fetchTodoData()
   } catch (error) {
     console.error('Error creating todo:', error);
   }
 }

 const updateTodo = async (id , currentData) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todo/update/${id}` , {
    method : 'PUT',
    headers :{
     'Content-Type': 'application/json',
    },
    body : JSON.stringify(currentData)
  })
  if (!res.ok) {
        console.error('Error creating todo:', res.status, res.statusText);
        return;
      }

      await fetchTodoData()
  } catch (error) {
    console.log(error)
  }
 }
 const singleUpdate = async (id , currentData) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todo/single/${id}` , {
      method : 'PATCH',
      headers :{
       'Content-Type': 'application/json',
      },
      body : JSON.stringify({completed : currentData})
    })

    if(!res.ok){
      console.error('Error creating todo:', res.status, res.statusText);
        return;
    }
    await fetchTodoData()
  } catch (error) {
    console.log(error)
  }
 }
 const ActiveTask = todos.filter((todo) => !todo.completed)
 const CompleteTask = todos.filter((todo) => todo.completed)
 useEffect(() => {
  fetchTodoData()
 },[])
    const store = {
        createTodo,todos,loading,
        ActiveTask,CompleteTask,deleteTodo,
        updateTodo,getByIdTodo,currentTodo,
        singleUpdate,setLoading
    }
  return <Todos.Provider value={store}>{children}</Todos.Provider>
}

export default Context
