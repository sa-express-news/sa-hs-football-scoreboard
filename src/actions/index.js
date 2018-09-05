import request from 'superagent';

import * as types from './action-types';
import * as endpoints from './endpoints';

const requestCurrentSeason = () => {
    return {
        type: types.REQUEST_CURRENT_SEASON
    };
};

const recieveCurrentSeason = features => {
    return {
        type: types.RECIEVE_CURRENT_SEASON,
        features,
    }
};

const getCurrentSeason = () => request.get(endpoints.GET_CURRENT_SEASON).then(res => JSON.parse(res)).catch(err => console.error(err));

export default {
    getCurrentSeason,
}
