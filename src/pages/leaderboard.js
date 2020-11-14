import React, { useEffect }                    from 'react';
import PageLayout                              from '../components/page-layout';
import { PicksUpdate }                         from '../state/picks/picks-actions';
import { StatsStartPolling, StatsStopPolling } from '../state/masters/masters-actions';
import { useDispatch, useSelector }            from 'react-redux';
import _                                       from 'lodash';

export default function Leaderboard() {

    let dispatch           = useDispatch();
    let { masters } = useSelector(state => state);

    useEffect(() => { dispatch(PicksUpdate()); }, [masters, dispatch]);
    useEffect(() => {
        dispatch(StatsStartPolling());
        return () => {
            dispatch(StatsStopPolling());
        }
    }, [dispatch]);

    return (
        <PageLayout>
            <table className='uk-table uk-table-small uk-table-striped uk-text-left'>
                <thead>
                    <tr>
                        <th/>
                        <th>Player</th>
                        <th>Pos.</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {masters.player
                    .filter(player => player.pos)
                    .map(({ id, display_name, pos, topar }, i) =>
                        <tr>
                            <td className='uk-padding-remove-right uk-text-middle'>
                                <img className="uk-border-circle"
                                     src={`https://www.masters.com/images/players/2020/240x240/${id}.jpg`} width="40"
                                     alt={display_name}/>
                            </td>
                            <td className='uk-text-middle'>{_.startCase(_.toLower(display_name))}</td>
                            <td className='uk-text-middle'>{pos}</td>
                            <td className='uk-text-middle'>{topar}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </PageLayout>
    )

}