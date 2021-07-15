import { combineReducers } from 'redux';

import auth from './authentication.reducer';
import home from './home.reducer';
import stats from './stats.reducer';

export default combineReducers({
    auth,
    home,
    stats,
});