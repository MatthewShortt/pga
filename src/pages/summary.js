import React, { useEffect, useMemo }                  from 'react';
import { useDispatch, useSelector }                   from 'react-redux';
import ScoreCard                                      from '../components/score-card';
import PageLayout                                     from '../components/page-layout/page-layout';
import { StatsStartPolling, StatsStopPolling }        from '../state/masters/masters-actions';
import { PicksUpdate }                                from '../state/picks/picks-actions';
import { getNumberAsGolfString, getTodaysWorstScore } from '../utils/golf-utils';
import '../index.css';

export default function Summary() {

    let dispatch           = useDispatch();
    let { masters, picks } = useSelector(state => state);

    const WORST_SCORE_DAY_3 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3), []);
    const WORST_SCORE_DAY_4 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4), []);
    const IS_WEEKEND        = useMemo(() => process.env.REACT_APP_IS_WEEKEND, []);
    const todaysWorstScore  = useMemo(() => process.env.REACT_APP_IS_TOURNAMENT_OVER ? 0 : getTodaysWorstScore(masters.player || []), [masters]);

    useEffect(() => { dispatch(PicksUpdate(todaysWorstScore)); }, [masters, dispatch, todaysWorstScore]);
    useEffect(() => {
        dispatch(StatsStartPolling());
        return () => {
            dispatch(StatsStopPolling());
        }
    }, [dispatch]);

    return (
        <PageLayout>
            <div className="uk-text-center" data-uk-grid>
                {picks.map((person, i) =>
                    <div key={i} className="uk-width-1-3@l uk-width-1-2@m">
                        <ScoreCard person={person} position={i + 1} todaysWorstScore={todaysWorstScore}/>
                    </div>)}
            </div>
            <div className={`uk-placeholder uk-text-left uk-padding-small ${!IS_WEEKEND ? 'uk-hidden' : ''}`}>
                    <span id="missed-cut">
                        <span className='color-green'>* </span>
                        The player has missed the cut so the worst scores from round 3 and 4 have been added as a penalty:
                    </span>
                <ul className="uk-list uk-list-disc uk-list-primary uk-text-small uk-margin-small-top">
                    <li>Round 3 worst score: {getNumberAsGolfString(WORST_SCORE_DAY_3)}</li>
                    <li>Round 4 worst score: {getNumberAsGolfString(WORST_SCORE_DAY_4)}</li>
                </ul>
            </div>
        </PageLayout>
    );

}