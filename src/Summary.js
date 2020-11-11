import mastersTitle from './resources/masters_title.svg';
import mastersLogo from './resources/masters_logo.png';
import React, {useMemo} from 'react';

export function Summary() {

    const WORST_SCORE_DAY_3 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3), []);
    const WORST_SCORE_DAY_4 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4), []);
    const IS_WEEKEND = useMemo(() => parseInt(process.env.REACT_APP_IS_WEEKEND), []);
    const people = useMemo(() => getPeople(JSON.parse(process.env.REACT_APP_SCORES)), []);

    return (
        <div className="uk-height-viewport uk-background-default uk-margin-medium-bottom">
            <div className="uk-container uk-text-center">
                {/*<h1 className="uk-heading-divider uk-margin-top">PGA Pool</h1>*/}
                <div className="uk-heading-divider uk-margin-top">
                    <img src={mastersTitle} width="200px" alt="The British Open Logo"/>
                </div>
                <img src={mastersLogo} width="90px" height="100px" alt="The British Open Logo"
                     className="uk-position-small uk-position-top-right uk-margin-top uk-visible@l"/>
                <div className="uk-align-center uk-width-1-1@m">
                    <div className="uk-text-center" data-uk-grid data-uk-sortable>
                        {people.map((person, i) =>
                            <div key={i} className="uk-width-1-3@l uk-width-1-2@m">
                                <div className="uk-card uk-card-default uk-card-body">
                                    <div className="uk-card-badge uk-label">{getNumberAsGolfString(person.total)}</div>
                                    <h3 className="uk-card-title uk-margin-remove-bottom">{person.name}</h3>
                                    <p className="uk-text-meta uk-margin-remove-top">
                                        Position: {i + 1}
                                    </p>
                                    <hr className="uk-divider-icon"/>
                                    <table className="uk-table uk-table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {person.players.map(({name, score, cut}, k) =>
                                            <tr key={k}>
                                                <td>{name}</td>
                                                <td>{getPlayerScoreAsString(score, cut)}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    <hr/>
                                </div>
                            </div>)
                        }
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

    function getPeople(people = []) {
        return people
            .map(person => {
                person.players
                    .sort((playerA, playerB) => {
                        if (!playerA.cut && playerB.cut) return -1;
                        else if (playerA.cut && !playerB.cut) return 1;
                        else return playerA.score - playerB.score;
                    })
                    .slice(0, 3)
                    .map((player, i) => {
                        const scoreNumber = parseInt(player.score);
                        person.total += !player.cut ? scoreNumber : getMissedCutScore(scoreNumber);
                        return player;
                    })
                return person
            })
            .sort((personA, personB) => personA.total - personB.total);
    }

    function getPlayerScoreAsString(score, isCut) {
        let scoreNumber = parseInt(score);
        return (isCut
            ? <span>{getNumberAsGolfString(getMissedCutScore(scoreNumber))} <a href='#missed-cut' data-uk-scroll>(MC)*</a></span>
            : getNumberAsGolfString(scoreNumber));
    }

    function getMissedCutScore(score) {
        return score + WORST_SCORE_DAY_3 + WORST_SCORE_DAY_4
    }

}

function getNumberAsGolfString(total) {
    if (total === 0) return 'E';
    else if (total > 0) return `+${total}`;
    else return total;
}
