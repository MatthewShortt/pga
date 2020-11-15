import React from 'react';

export default function AccordionScorecard({ round, holes, pars, total, scores }) {
    return (
        <>
            <a className="uk-accordion-title uk-text-light" href="#">Round {round} ({total})</a>
            <div className="uk-accordion-content">
                <div className="grid-container uk-text-light uk-text-small uk-overflow-auto">
                    <div className="header">Hole</div>
                    {holes.map((hole, i) =>
                        <div key={`round-${round}-hole-${hole}-${i}`} className='header'>{hole}</div>
                    )}
                    <div>Total</div>
                    <div className="body">Par</div>
                    {pars.round1.map((par, i) =>
                        <div key={`round-${round}-${i}`} className='body'>{par}</div>
                    )}
                    <div className="body">72</div>
                    <div className="body">Score</div>
                    {scores.map((score, i) =>
                        <div key={`round-${round}-par-${score}-${i}`} className='body'>{score}</div>
                    )}
                    <div className='body'>{scores.reduce((a, b) => a + b, 0)}</div>
                </div>
            </div>
        </>
    )
}