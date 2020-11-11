import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import createRootReducer     from './root-reducer';
import { routerMiddleware }  from 'connected-react-router';
import createSagaMiddleware                      from 'redux-saga';
import { all }                                   from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHashHistory();

function* rootSaga() {
    yield all([]);
}

export default function store() {
    const store = createStore(
        createRootReducer(history),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware
            ))
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
