import request from 'superagent';

import * as types from './action-types';
import * as endpoints from './endpoints';

const requestCurrentSeason = (dispatch, resolve) => {
    return resolve({
        type: types.REQUEST_CURRENT_SEASON
    });
};

const recieveCurrentSeason = (dispatch, resolve, data) => {
    return resolve({
        type: types.RECIEVE_CURRENT_SEASON,
        data,
    });
};

const getCurrentSeason = (dispatch, resolve) => {
    dispatch('requestCurrentSeason');
    return request.get(endpoints.GET_CURRENT_SEASON)
            .then(res => recieveCurrentSeason(dispatch, resolve, res.body))
            .catch(err => console.error(err));
};

export default {
    requestCurrentSeason,
    recieveCurrentSeason,
    getCurrentSeason,
}
