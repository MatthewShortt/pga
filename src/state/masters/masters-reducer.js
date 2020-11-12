import { STATS_SUCCESS } from './masters-actions';

const initialState = {
    player: []
}

export default function MastersStatsReducer(state = initialState, action) {
    switch (action.type) {
        case STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}