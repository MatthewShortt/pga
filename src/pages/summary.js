import React, { useEffect, useMemo }           from 'react';
import { useDispatch, useSelector }            from 'react-redux';
import mastersTitle                            from '../assets/masters_title.svg';
import mastersLogo                             from '../assets/masters_logo.png';
import { ScoreCard }                           from '../components/score-card';
import { getNumberAsGolfString }               from '../utils/golf-utils';
import { StatsStartPolling, StatsStopPolling } from '../state/masters/masters-actions';
import { PicksUpdate }                         from '../state/picks/picks-actions';

export function Summary() {

    let dispatch           = useDispatch();
    let { masters, picks } = useSelector(state => state);

    const WORST_SCORE_DAY_3 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3), []);
    const WORST_SCORE_DAY_4 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4), []);
    const IS_WEEKEND        = useMemo(() => parseInt(process.env.REACT_APP_IS_WEEKEND), []);

    useEffect(() => { dispatch(PicksUpdate()); }, [masters, dispatch]);
    useEffect(() => {
        dispatch(StatsStartPolling());
        return () => {
            dispatch(StatsStopPolling());
        }
    }, [dispatch]);

    return (
        <div className="uk-height-viewport uk-background-default uk-margin-medium-bottom">
            <div className="uk-container uk-text-center">
                <div className="uk-heading-divider uk-margin-top">
                    <img src={mastersTitle} width="200px" alt="The British Open Logo"/>
                </div>
                <img src={mastersLogo} width="90px" height="100px" alt="The British Open Logo"
                     className="uk-position-small uk-position-top-right uk-margin-top uk-visible@l"/>
                <div className="uk-align-center uk-width-1-1@m">
                    <div className="uk-text-center" data-uk-grid>
                        {picks.map((person, i) =>
                            <div key={i} className="uk-width-1-3@l uk-width-1-2@m">
                                <ScoreCard person={person} position={i + 1}/>
                            </div>)}
                    </div>
                </div>
                <div className={`uk-placeholder uk-text-left uk-padding-small ${!IS_WEEKEND ? 'uk-hidden' : ''}`}>
                    <span id="missed-cut">
                        <span className='uk-text-primary'>* </span>
                        The player has missed the cut so the worst scores from day 3 and 4 have been added as a penalty:
                    </span>
                    <ul className="uk-list uk-list-disc uk-list-primary uk-text-small uk-margin-small-top">
                        <li>Saturday's worst score: {getNumberAsGolfString(WORST_SCORE_DAY_3)}</li>
                        <li>Sunday's worst score: {getNumberAsGolfString(WORST_SCORE_DAY_4)}</li>
                    </ul>
                </div>
            </div>
        </div>
    );

}