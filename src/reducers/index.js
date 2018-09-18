import * as types from '../actions/action-types';

import { parseGames } from './utils';

export default (state, action) => {
    switch(action.type) {
        case types.REQUEST_CURRENT_SEASON:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case types.RECIEVE_CURRENT_SEASON:
            return Object.assign({}, state, {
                schedule: parseGames(action.data.schedules.list),
                isFetching: false,
            });

        default:
            return state;
    }
}