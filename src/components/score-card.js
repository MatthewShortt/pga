import React                                        from 'react';
import { getMissedCutScore, getNumberAsGolfString } from '../utils/golf-utils';

export function ScoreCard({ person, position }) {
    return (
        <div className="uk-card uk-card-default uk-card-body">
            <div className="uk-card-badge uk-label">{getNumberAsGolfString(person.total)}</div>
            <h3 className="uk-card-title uk-margin-remove-bottom">{person.name}</h3>
            <p className="uk-text-meta uk-margin-remove-top">
                Position: {position}
            </p>
            <hr className="uk-divider-icon"/>
            <table className="uk-table uk-table-striped">
                <thead>
                </thead>
                <tbody>
                {person.players
                    .map(({ name, score, cut, stats }, k) =>
                        <tr key={k}>
                            <td>{name}</td>
                            <td>{getPlayerScoreAsString(stats.topar || 'E', cut)}</td>
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
                    {getNumberAsGolfString(getMissedCutScore(parseInt(score)))}
                    <a href='#missed-cut' data-uk-scroll>(MC)*</a>
                  </span>
                : score);
    }
}