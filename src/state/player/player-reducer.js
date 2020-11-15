import { CURRENT_PLAYER_UPDATE_SUCCESS } from './player-actions';

const initialState = {
    id: '',
    name: '',
    stats: {},
};

export default function PlayerReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_PLAYER_UPDATE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}