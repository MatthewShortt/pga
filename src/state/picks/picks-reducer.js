import { PICKS_UPDATE_SUCCESS } from './picks-actions';

const initialState = JSON.parse(process.env.REACT_APP_SCORES);

export default function PicksReducer(state = initialState, action) {
    switch (action.type) {
        case PICKS_UPDATE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}