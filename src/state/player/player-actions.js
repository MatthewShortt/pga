import { put, takeLatest } from 'redux-saga/effects';

export const CURRENT_PLAYER_UPDATE_REQUESTED = 'CURRENT_PLAYER_UPDATE_REQUESTED';
export const CURRENT_PLAYER_UPDATE_SUCCESS   = 'CURRENT_PLAYER_UPDATE_SUCCESS';

export function* watchPlayerAsync() {
    yield takeLatest(CURRENT_PLAYER_UPDATE_REQUESTED, updateCurrentPlayerAsync);
}

export function CurrentPlayerUpdate(player) {
    return {
        type: CURRENT_PLAYER_UPDATE_REQUESTED,
        payload: {
            player
        }
    };
}

export function* updateCurrentPlayerAsync({ payload: { player } }) {
    yield put(CurrentPlayerUpdateSuccess(player));
}

export function CurrentPlayerUpdateSuccess(payload) {
    return {
        type: CURRENT_PLAYER_UPDATE_SUCCESS,
        payload
    };
}