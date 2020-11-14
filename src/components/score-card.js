import React                                        from 'react';
import { getMissedCutScore, getNumberAsGolfString } from '../utils/golf-utils';
import { countries }                                from '../utils/country-svgs';

export default function ScoreCard({ person, position, todaysWorstScore }) {
    return (
        <div className="uk-card uk-card-default uk-card-body">
            <div className="uk-card-badge uk-label">{getNumberAsGolfString(person.total)}</div>
            <h3 className="uk-card-title uk-margin-remove-bottom">{person.name}</h3>
            <p className="uk-text-meta uk-margin-remove-top">
                Position: {position}
            </p>
            <hr className="uk-divider-icon"/>
            <table className="uk-table uk-table-striped">
                <thead/>
                <tbody>
                {person.players.map(({ id, name, score, cut, stats }, k) =>
                    <tr key={`score-card-${id}-${k}`} className='uk-text-middle'>
                        <td className='uk-padding-remove-right uk-text-middle'>
                            <img className="uk-border-circle uk-preserve-width"
                                 src={`https://www.masters.com/images/players/2020/240x240/${id}.jpg`} width="40"
                                 alt={name}/>
                        </td>
                        <td className='uk-text-light uk-text-left uk-text-middle'>{name}</td>
                        <td className='uk-text-left uk-text-middle'>
                            <img className='uk-preserve-width' src={countries[stats.countryCode]} width="20" alt={stats.countryCode}/>
                        </td>
                        <td className='uk-text-light uk-text-left uk-text-middle'>{getPlayerScoreAsString(stats.topar || 'E', stats.status === 'C')}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <hr/>
        </div>
    )

    function getPlayerScoreAsString(score, isCut) {
        return (isCut
                ? <span>
                    {getNumberAsGolfString(getMissedCutScore(parseInt(score), todaysWorstScore))}
                    <a href='#missed-cut' data-uk-scroll>*</a>
                  </span>
                : score);
    }
}