import React from 'react';
import './scorecard.css';

export default function Scorecard({ rounds, holes, pars, today, position }) {

    return (
        <div className='grid-container uk-text-light uk-text-small uk-overflow-auto uk-margin-top'>
            <div className='header'>Hole</div>
            {holes.map((hole, i) =>
                <div key={`hole-${hole}-${i}`} className='header'>{hole}</div>
            )}
            <div className='header'>Total</div>

            <div className='pars'>Par</div>
            {pars.round1.map((par, i) =>
                <div key={`round-${i}`} className='pars'>{par}</div>
            )}
            <div className='pars'>72</div>
            {rounds.map(({ scores, total }, i) =>
                <>
                    <div className='body'>R{i+1}</div>
                    {scores.map((score, j) =>
                        <div key={`round-${i+1}-par-${score}-${j+1}`} className={`body ${getScoreStyling(score, pars.round1[j])}`}>{score}</div>
                    )}
                    <div className='body'>{getScore(scores)}</div>
                </>
            )}
        </div>
    )

    /**
     * Method returns the default score in the total column of the score card
     * If the scores total is 0, they have not played any holes for the day so we use 'today', which will be their tee-time
     * If the value of 'today' is undefined, they are no longer in the tournament so we return their position (either CUT or WD)
     * If the scores total is not 0, they have started their round for the day;
     * If they have not completed their round (scores is not an array of 18 holes) then we use 'today' to represent their score to par
     * @param scores
     * @returns {*|number}
     */
    function getScore(scores) {
        const total = scores.reduce((a, b) => a + b, 0);
        if (total === 0) return today ? today : position;
        return scores.length === 18 ? total : today;
    }

    function getScoreStyling(score, par) {
        const difference = parseInt(score) - parseInt(par);
        if (difference < -1) {
            return 'eagle';
        } else if (difference === -1) {
            return 'birdie';
        } else if (difference === 1) {
            return 'bogey';
        } else if (difference > 1) {
            return 'double-bogey';
        } else {
            return '';
        }
    }
}