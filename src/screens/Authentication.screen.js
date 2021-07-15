import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { setItem } from '../helpers';

class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setItem('userId', user.uid).then(() => {
                    setTimeout(() => {
                        this.props.navigation.navigate(user ? 'App' : 'Auth');
                    }, 300);
                });
            } else {
                this.props.navigation.navigate('Auth');
            }
        })
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);