import React, { useEffect }                    from 'react';
import PageLayout                              from '../components/page-layout/page-layout';
import { PicksUpdate }                         from '../state/picks/picks-actions';
import { StatsStartPolling, StatsStopPolling } from '../state/masters/masters-actions';
import { useDispatch, useSelector }            from 'react-redux';
import { countries }                           from '../utils/country-svgs';
import { getDisplayName, getPosition }         from '../utils/golf-utils';
import { CurrentPlayerUpdate }             from '../state/player/player-actions';
import PlayerModal, { PlayerModalElement } from '../components/player-modal/player-modal';
import '../index.css';

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
                    <th className='uk-text-capitalize uk-table-shrink'>R{process.env.REACT_APP_CURRENT_ROUND}</th>
                    <th className='uk-text-capitalize uk-table-shrink'>Thru</th>
                    <th className='uk-text-capitalize uk-table-shrink'>Score</th>
                </tr>
                </thead>
                <tbody>
                {masters.player
                    // .filter(player => player.pos)
                    .map((player, i) =>
                        <tr className='uk-text-small' key={`leaderboard-${player.id}-${i}`}>
                            <td className='uk-text-light uk-text-middle uk-padding-remove-right'>{getPosition(player.pos, player.status)}</td>
                            <td className='uk-text-light uk-text-left uk-text-middle uk-padding-remove'>
                                <img className='uk-preserve-width' src={countries[player.countryCode]} width="20"
                                     alt={player.countryCode}/>
                            </td>
                            <td className='uk-text-light uk-text-middle uk-text-truncate color-green'>
                                <button className='uk-button uk-button-text uk-text-light uk-text-left uk-text-capitalize color-green' onClick={() => showPlayerModal({id: player.id, name: player.display_name2, stats: player})}>
                                    {getDisplayName(player.first_name, player.last_name)}
                                </button>
                            </td>
                            <td className='uk-text-light uk-text-middle'>{player.today || '-'}</td>
                            <td className='uk-text-light uk-text-middle'>{player.thru || player.teetime}</td>
                            <td className='uk-text-light uk-text-middle'>{player.topar || '-'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <PlayerModal/>
        </PageLayout>
    )

    function showPlayerModal(player) {
        dispatch(CurrentPlayerUpdate(player));
        PlayerModalElement.show();
    }

}