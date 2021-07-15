import {
    SET_USERNAME,
    SET_WARNINGMSG,
} from '../actions/authentication.actions';

const defaultState = {
    username: '',
    warningMsg: '',
};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USERNAME: {
            return { ...state, username: action.username };
        }
        case SET_WARNINGMSG: {
            return { ...state, warningMsg: action.warningMsg };
        }
        default:
            return state;
    }
};

export default auth;