import * as types from '../consts/ActionsList'

export const addTodo = singleTodo => ({ type: types.ADD_TODO, singleTodo })
export const fetchTodo = () => ({ type: types.FETCH_TODO })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const completeTodo = todoObj => ({ type: types.COMPLETE_TODO, todoObj })