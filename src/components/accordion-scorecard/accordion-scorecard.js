import React from 'react';
import './accordion-scorecard.css';

export default function AccordionScorecard({ round, holes, pars, total, scores }) {
    return (
        <>
            <span className={total === 'CUT' ? 'uk-text-light uk-text-small' : 'uk-accordion-title uk-text-light uk-text-small'}>Round {round} ({total})</span>
            <div className='uk-accordion-content'>
                <div className='grid-container uk-text-light uk-text-small uk-overflow-auto'>
                    <div className='header'>Hole</div>
                    {holes.map((hole, i) =>
                        <div key={`round-${round}-hole-${hole}-${i}`} className='header'>{hole}</div>
                    )}
                    <div>Total</div>
                    <div className='body'>Par</div>
                    {pars.round1.map((par, i) =>
                        <div key={`round-${round}-${i}`} className='body'>{par}</div>
                    )}
                    <div className='body'>72</div>
                    <div className='body'>Score</div>
                    {scores.map((score, i) =>
                        <div key={`round-${round}-par-${score}-${i}`} className={`body ${getScoreStyling(score, pars.round1[i])}`}>{score}</div>
                    )}
                    <div className='body'>{scores.reduce((a, b) => a + b, 0)}</div>
                </div>
            </div>
        </>
    )

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