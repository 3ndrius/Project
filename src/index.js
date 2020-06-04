import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import createSagaMiddleware from 'redux-saga'

// import { helloSaga } from './sagas'
import rootSaga from './sagas'


import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
