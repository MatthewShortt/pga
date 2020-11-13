import { combineReducers } from 'redux';
import { connectRouter }   from 'connected-react-router';
import masters             from './masters/masters-reducer';
import picks               from './picks/picks-reducer';

export default function createRooReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        masters,
        picks
    });
}
