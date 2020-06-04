import { call, put, takeEvery, all, delay } from "redux-saga/effects";
import {
  addTodoApi,
  completeTodoApi,
  deleteTodoApi,
  fetchTodoApi,
} from "../api";

// fetch todo saga
function* sagaFetchTodo() {
  try {
    const data = yield call(fetchTodoApi);
    yield put({ type: "FETCH_TODO_ASYNC", todoList: data });
  } catch (e) {
    yield put({ type: "FETCH_TODO_FAILED", message: e.message });
  }
}
// fetch todo watcher

function* watchFetchTodo() {
  yield takeEvery("FETCH_TODO", sagaFetchTodo);
}
// add task  saga
function* sagaAddTodo(action) {
  try {
    const data = yield call(addTodoApi, action.singleTodo); // response - object todo with id 201
    //yield delay(1000); // json placeholder api 503 code
    yield put({ type: "ADD_TODO_ASYNC", todo: action.singleTodo }); // data insted action.singleTodo   issue same id
  } catch (e) {
    yield put({ type: "ADD_TODO_FAILED", message: e.message });
  }
}
// saga watcher -- sagaAddTodo fn
function* watchAddTodo() {
  yield takeEvery("ADD_TODO", sagaAddTodo);
}

// complete task todo

function* sagaCompleteTask(action) {
  try {
    //yield delay(500); // jsonplaceholder api 503 code
    const data = yield call(completeTodoApi, action.todoObj); // return object todo

    yield put({ type: "COMPLETE_TODO_ASYNC", index: action.todoObj }); // should be data
  } catch (e) {
    yield put({ type: "COMPLETE_TODO_FAILED", message: e.message });
  }
}
//complete todo watcher fn
function* watchCompleteTodo() {
  yield takeEvery("COMPLETE_TODO", sagaCompleteTask);
}

// delete todo
function* sagaDeleteTodo(action) {
  try {
    //yield delay(500); // jsonplaceholder api 503 code
    const data = yield call(deleteTodoApi, action.id); // return empty object
    yield put({ type: "DELETE_TODO_ASYNC", index: action.id });
  } catch (e) {
    yield put({ type: "DELETE_TODO_ASYNC", message: e.message });
  }
}
// delete todo watcher fn
function* watchDeleteTodo() {
  yield takeEvery("DELETE_TODO", sagaDeleteTodo);
}

export default function* rootSaga() {
  yield all([
    watchAddTodo(),
    watchCompleteTodo(),
    watchDeleteTodo(),
    watchFetchTodo(),
  ]);
}
