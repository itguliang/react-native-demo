import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
// import createLogger from 'redux-logger';
import allReducer from '../reducers/allReducer';
import sagas from '../sagas/timerSagas';

const configureStore = preloadedState => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
        allReducer,
        preloadedState,
        compose (
            // applyMiddleware(sagaMiddleware, createLogger())
            applyMiddleware(sagaMiddleware)
        )
    )
    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);
    return store;
}

const store = configureStore();
export default store;