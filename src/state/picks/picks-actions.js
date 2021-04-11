import { put, select, takeLatest }           from 'redux-saga/effects';
import { Masters, Picks }                    from '../selectors';
import { getMissedCutScore, parseGolfScore } from '../../utils/golf-utils';

export const PICKS_UPDATE_REQUESTED = 'PICKS_UPDATE_REQUESTED';
export const PICKS_UPDATE_SUCCESS   = 'PICKS_UPDATE_SUCCESS';

export function* watchPicksAsync() {
    yield takeLatest(PICKS_UPDATE_REQUESTED, updatePicksAsync);
}

export function* updatePicksAsync({ payload: { todaysWorstScore } }) {
    let masters = yield select(Masters);
    let people  = yield select(Picks);

    const payload = connectUserPicksWithStats(people, masters, todaysWorstScore);

    yield put(PicksUpdateSuccess(payload));
}

export function PicksUpdate(todaysWorstScore) {
    return {
        type: PICKS_UPDATE_REQUESTED,
        payload: {
            todaysWorstScore
        }
    }
}

export function PicksUpdateSuccess(payload) {
    return {
        type: PICKS_UPDATE_SUCCESS,
        payload
    }
}

function connectUserPicksWithStats(picks, stats, todaysWorstScore) {
    return picks
        .map(user => {
            user.total   = 0;
            user.players = user.players
                .map(pick => {
                    pick.stats = stats.player.find(golfer => golfer.id === pick.id) || {};
                    pick.cut   = pick.stats.status === 'C';
                    pick.dq    = pick.stats.status === 'D';
                    return pick;
                })
                .sort((playerA, playerB) => {
                    // handle disqualified players
                    if (!playerA.dq && playerB.dq) return -1;
                    else if (playerA.dq && !playerB.dq) return 1;
                    // handle cut players
                    else if (!playerA.cut && playerB.cut) return -1;
                    else if (playerA.cut && !playerB.cut) return 1;
                    // sort by score to par
                    else return parseGolfScore(playerA.stats.topar) - parseGolfScore(playerB.stats.topar);
                })
                .map((player, i) => {
                    if (i < 3) {
                        const scoreNumber = parseGolfScore(player.stats.topar);
                        user.total += !player.cut ? scoreNumber : getMissedCutScore(scoreNumber, todaysWorstScore);
                    }
                    return player;
                })
            return user
        })
        .sort((personA, personB) => personA.total - personB.total);
}