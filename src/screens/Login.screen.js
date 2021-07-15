import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Login } from '../components/Authentication/Authentication.component'
import { setWarningMsg, authenticate } from '../redux/actions/authentication.actions'

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Login {...this.props} />
        )
    };
}

LoginScreen.propTypes = {
    warningMsg: PropTypes.string,
    setWarningMsg: PropTypes.func,
    authenticate: PropTypes.func,
}

const mapStateToProps = (state) => ({
    warningMsg: state.auth.warningMsg,
});

const mapDispatchToProps = (dispatch) => ({
    setWarningMsg: (msg) => dispatch(setWarningMsg(msg)),
    authenticate: (email, password) => dispatch(authenticate(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
