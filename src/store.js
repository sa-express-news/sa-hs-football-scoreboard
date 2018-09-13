import actions  from './actions';
import reducers from './reducers';

class Store {
    constructor() {
        this.state = {
            schedule: [],
            isFetching: false,
        };

        this.dispatch = this.dispatch.bind(this);
    }

    dispatch(action, params = []) {
        return new Promise((resolve, reject) => {
            if (actions[action]) {
                actions[action](this.dispatch, resolve, ...params);
            } else {
                resolve({ type: null });
            }
        }).then(res => {
            return this.state = reducers(this.state, res);
        });
    }
}

export default Store
