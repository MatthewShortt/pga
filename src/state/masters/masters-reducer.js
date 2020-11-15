import { STATS_SUCCESS } from './masters-actions';

const initialState = {
    player: [],
    pars: {
        round1: [],
        round2: [],
        round3: [],
        round4: []
    },
    yardages: []
}

export default function MastersStatsReducer(state = initialState, action) {
    switch (action.type) {
        case STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}