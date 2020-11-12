import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory }                     from 'history';
import { routerMiddleware }                      from 'connected-react-router';
import createSagaMiddleware                      from 'redux-saga';
import { all }                                   from 'redux-saga/effects';
import createRootReducer                         from './root-reducer';
import { watchStatsAsync }                       from './masters/masters-actions';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHashHistory();

function* rootSaga() {
    yield all([
        watchStatsAsync()
    ]);
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
