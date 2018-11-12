import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import trainingReducer from '../reducers/trainings'
import selectedTrainingReducer from '../reducers/selectedTraining';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      training: trainingReducer,
      selectedTraining: selectedTrainingReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
