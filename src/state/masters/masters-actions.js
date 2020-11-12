import { call, delay, put, race, take } from 'redux-saga/effects';
import { MastersApi }                   from './masters-api';

export const STATS_SUCCESS                 = 'STATS_SUCCESS';
export const STATS_ERROR                   = 'STATS_ERROR';
export const STATS_START_POLLING_REQUESTED = 'STATS_START_POLLING_REQUESTED';
export const STATS_STOP_POLLING_REQUESTED  = 'STATS_STOP_POLLING_REQUESTED';

export const POLLING_DELAY = 60000;

export function* watchStatsAsync() {
    while (true) {
        yield take(STATS_START_POLLING_REQUESTED);
        yield race({
            task: call(pollStatsAsync),
            cancel: take(STATS_STOP_POLLING_REQUESTED)
        })
    }
}

export function* pollStatsAsync() {
    while (true) {
        try {
            const stats = yield call(MastersApi.getStats);
            yield put(StatsSuccess(stats.data.data));
        } catch (error) {
            yield put(StatsError(error));
        }
        yield delay(POLLING_DELAY)
    }
}

export function StatsStartPolling() {
    return {
        type: STATS_START_POLLING_REQUESTED
    }
}

export function StatsStopPolling() {
    return {
        type: STATS_STOP_POLLING_REQUESTED
    }
}

export function StatsSuccess(stats) {
    return {
        type: STATS_SUCCESS,
        payload: stats
    }
}

export function StatsError(error) {
    return {
        type: STATS_ERROR,
        payload: error
    }
}