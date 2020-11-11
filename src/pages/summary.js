import mastersTitle                                 from '../assets/masters_title.svg';
import mastersLogo                                  from '../assets/masters_logo.png';
import React, { useMemo }                           from 'react';
import { ScoreCard }                                from '../components/score-card';
import { getMissedCutScore, getNumberAsGolfString } from '../utils/golf-utils';

export function Summary() {

    const WORST_SCORE_DAY_3 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3), []);
    const WORST_SCORE_DAY_4 = useMemo(() => parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4), []);
    const IS_WEEKEND        = useMemo(() => parseInt(process.env.REACT_APP_IS_WEEKEND), []);
    // eslint-disable-next-line
    const people            = useMemo(() => getPeople(JSON.parse(process.env.REACT_APP_SCORES)), []);

    return (
        <div className="uk-height-viewport uk-background-default uk-margin-medium-bottom">
            <div className="uk-container uk-text-center">
                <div className="uk-heading-divider uk-margin-top">
                    <img src={mastersTitle} width="200px" alt="The British Open Logo"/>
                </div>
                <img src={mastersLogo} width="90px" height="100px" alt="The British Open Logo"
                     className="uk-position-small uk-position-top-right uk-margin-top uk-visible@l"/>
                <div className="uk-align-center uk-width-1-1@m">
                    <div className="uk-text-center" data-uk-grid data-uk-sortable>
                        {people.map((person, i) =>
                            <div key={i} className="uk-width-1-3@l uk-width-1-2@m">
                                <ScoreCard person={person} position={i + 1}/>
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

}