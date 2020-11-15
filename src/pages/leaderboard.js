import React, { useEffect }                    from 'react';
import PageLayout                              from '../components/page-layout/page-layout';
import { PicksUpdate }                         from '../state/picks/picks-actions';
import { StatsStartPolling, StatsStopPolling } from '../state/masters/masters-actions';
import { useDispatch, useSelector }            from 'react-redux';
import { countries }                           from '../utils/country-svgs';
import { getDisplayName }                      from '../utils/golf-utils';

export default function Leaderboard() {

    let dispatch    = useDispatch();
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
                <tr className='uk-text-small'>
                    <th className='uk-text-capitalize uk-table-shrink'>Pos</th>
                    <th className='uk-text-capitalize uk-table-shrink uk-padding-remove-left'/>
                    <th className='uk-text-capitalize'>Player</th>
                    <th className='uk-text-capitalize uk-table-shrink'>R3</th>
                    <th className='uk-text-capitalize uk-table-shrink'>Thru</th>
                    <th className='uk-text-capitalize uk-table-shrink'>Score</th>
                </tr>
                </thead>
                <tbody>
                {masters.player
                    .filter(player => player.pos)
                    .map(({ id, status, first_name, last_name, pos, topar, countryCode, today, thru, teetime }, i) =>
                        <tr className='uk-text-small' key={`leaderboard-${id}-${i}`}>
                            <td className='uk-text-light uk-text-middle uk-padding-remove-right'>{getPosition(pos, status)}</td>
                            <td className='uk-text-light uk-text-left uk-text-middle uk-padding-remove'>
                                <img className='uk-preserve-width' src={countries[countryCode]} width="20"
                                     alt={countryCode}/>
                            </td>
                            <td className='uk-text-light uk-text-middle uk-text-truncate'>{getDisplayName(first_name, last_name)}</td>
                            <td className='uk-text-light uk-text-middle'>{today || '-'}</td>
                            <td className='uk-text-light uk-text-middle'>{thru || teetime}</td>
                            <td className='uk-text-light uk-text-middle'>{topar}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </PageLayout>
    )

    function getPosition(pos, status) {
        if (status === 'C') return 'CUT';
        else if (status === 'W') return 'WD';
        else return pos;
    }

}