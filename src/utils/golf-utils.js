export function getNumberAsGolfString(total) {
    if (total === 0) return 'E';
    else if (total > 0) return `+${total}`;
    else return total;
}

export function getMissedCutScore(score, todaysWorstScore = 0) {
    return score + parseInt(process.env.REACT_APP_WORST_SCORE_DAY_3) + parseInt(process.env.REACT_APP_WORST_SCORE_DAY_4) + todaysWorstScore;
}

export function parseGolfScore(score = '0') {
    score = score || '0';
    if (score === 'E') {
        return 0;
    } else {
        return parseInt(score);
    }
}

export function getTodaysWorstScore(players = []) {
    return Math.max(...players.map(player => parseGolfScore(player.today)));
}

export function getDisplayName(firstName, lastName) {
    return (firstName && lastName) ? `${getFirstNameInitials(firstName)} ${lastName}` : '';
}

export function getFirstNameInitials(firstName) {
    return firstName.split(' ').map(name => name[0].concat('.')).join(' ');
}

export function getPosition(pos, status) {
    if (status === 'C') return 'CUT';
    else if (status === 'W') return 'WD';
    else return pos;
}