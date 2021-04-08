import axios from 'axios';

export const MastersApi = {
    getStats: () => axios.get('https://www.masters.com/en_US/scores/feeds/2021/scores.json')
}