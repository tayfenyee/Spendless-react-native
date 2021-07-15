import firebase from 'firebase';
import { setItem, removeItem } from '../../helpers';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_WARNINGMSG = 'SET_WARNINGMSG';

export const setUsername = (string) => {
    return {
        type: SET_USERNAME,
        username: string
    };
};

export const setWarningMsg = (string) => {
    return {
        type: SET_WARNINGMSG,
        warningMsg: string
    };
};

export const authenticate = (email, password) => {
    return (dispatch) => {
        if (email === '' || password === '') {
            dispatch(setWarningMsg('Please complete all fields!'));
            return
        }
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                var user = firebase.auth().currentUser;
                dispatch(setWarningMsg('Login successful!'));
                dispatch(setUsername(user.displayName));
                setItem('userId', user.uid);
            })
            .catch((error) => {
                dispatch(setWarningMsg(error.message));
            });
    }
}

export const register = (email, username, password) => {
    return (dispatch) => {
        if (username === '' || password === '' || email === '') {
            dispatch(setWarningMsg('Please complete all fields!'));
            return
        }
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: username.trim()
                }).catch((error) => {
                    dispatch(setWarningMsg(error.message));
                });
                setItem('userId', user.uid);
            })
            .then(() => {
                dispatch(setWarningMsg('Account created successfully!'));
            })
            .catch((error) => {
                dispatch(setWarningMsg(error.message));
            });
    }
}

export const logout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                dispatch(setUsername(''));
                dispatch(setWarningMsg('Logout successful!'));
            })
            .then(() => {
                removeItem('userId');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}