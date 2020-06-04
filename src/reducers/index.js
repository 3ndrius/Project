import {
  COMPLETE_TODO_ASYNC,
  DELETE_TODO_FAILED,
  ADD_TODO_FAILED,
  COMPLETE_TODO_FAILED,
  ADD_TODO_ASYNC,
  DELETE_TODO_ASYNC,
  FETCH_TODO_ASYNC,
} from "../consts/ActionsList";

const initialState = [];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_ASYNC:
      return action.todoList;
    case ADD_TODO_ASYNC:
      return [
        ...state,
        {
          id: action.todo.id,
          title: action.todo.title,
          completed: action.todo.completed,
        },
      ];
    case ADD_TODO_FAILED:
      console.log("Failed add todo", action.message);
      return state;

    case DELETE_TODO_ASYNC:
      return state.filter((todo) => todo.id !== action.index);

    case DELETE_TODO_FAILED:
      console.log("Failded delete", action.message);
      return state;

    case COMPLETE_TODO_ASYNC:
      return state.map((todo) =>
        todo.id === action.index.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case COMPLETE_TODO_FAILED:
      console.log("Failed complete todo", action.message);
      return state;
    default:
      return state;
  }
};
export default todos;
