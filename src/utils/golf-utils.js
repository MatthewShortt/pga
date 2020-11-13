export function getNumberAsGolfString(total) {
    if (total === 0) return 'E';
    else if (total > 0) return `+${total}`;
    else return total;
}

export function getMissedCutScore(score) {
    return score + parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3) + parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4)
}

export function parseGolfScore(score = '0') {
    score = score || '0';
    if (score === 'E') {
        return 0;
    } else {
        return parseInt(score);
    }
}