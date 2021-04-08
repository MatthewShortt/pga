import React, { useMemo }              from 'react';
import UIkit                           from 'uikit';
import { useSelector }                 from 'react-redux';
import { countries }                   from '../../utils/country-svgs';
import { getDisplayName, getPosition } from '../../utils/golf-utils';
import Scorecard                       from '../scorecard/scorecard';
import './player-modal.css';
import '../scorecard/scorecard.css'

let PlayerModalElement;

export default function PlayerModal() {

    const holes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    PlayerModalElement = UIkit.modal('#player-modal');

    let { player: { id, stats: { first_name, last_name, pos, status, topar, countryCode, today, round1, round2, round3, round4 } }, masters: { pars } } = useSelector(state => state);

    const initialScores = { scores: [] };
    // eslint-disable-next-line
    let rounds = useMemo(() => [round1 || initialScores, round2 || initialScores, round3 || initialScores, round4 || initialScores], [round1, round2, round3, round4]);
    let position = useMemo(() => getPosition(pos, status), [pos, status]);

    return (
        <div id='player-modal' data-uk-modal={true}>
            <div className='uk-modal-dialog uk-modal-body player-modal'>
                <button className='uk-modal-close-default' type='button' data-uk-close/>
                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                    <div className="uk-width-auto">
                        <img className="uk-border-circle" width="75" src={`https://www.masters.com/images/players/2021/240x240/${id}.jpg`} alt={`${first_name} ${last_name}`}/>
                    </div>
                    <div className="uk-width-expand">
                        <h3 className="uk-card-title uk-margin-remove-bottom">{getDisplayName(first_name, last_name)}</h3>
                        <p className="uk-text-meta uk-margin-remove-top">
                            <img className='uk-preserve-width' src={countries[countryCode]} width="20" alt={countryCode}/>
                            <span className='uk-text-light'> Pos. <span className='uk-text-emphasis'>{position}</span> | Score: <span className='uk-text-emphasis'>{topar || '-'}</span></span>
                        </p>
                    </div>
                </div>

                <Scorecard rounds={rounds || []} holes={holes} pars={pars} today={today} position={position} id={id}/>
            </div>
        </div>
    )

}

export { PlayerModalElement };