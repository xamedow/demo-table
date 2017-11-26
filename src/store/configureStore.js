import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import getReduxDevTools from './getReduxDevTools';
import rootReducer from './modules';

const logger = createLogger({
  collapsed: true,
});

const middlewares = [thunkMiddleware, axiosMiddleware(axios), logger];

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), getReduxDevTools())
  );

  // Enable Webpack hot module replacement for reducers
  // this will be cut out in production
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
