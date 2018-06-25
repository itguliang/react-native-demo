import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
import counterReducer from '../reducers/counterReducer';

const configureStore = preloadedState => {
    return createStore (
        counterReducer,
        preloadedState,
        // compose (
        //     applyMiddleware(createLogger())
        // )
    );
}

const store = configureStore();

export default store;