import * as types from '../actions/action-types';

const defaultState = {
    isFetching: false,
    list: [],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case types.REQUEST_CURRENT_SEASON:
        return Object.assign({}, state, {
            isFetching: true,
        });

    case types.RECIEVE_CURRENT_SEASON:
      return Object.assign({}, state, {
        list: action.features.list,
        isFetching: false,
      });
      
    default:
        return state;
  }
}