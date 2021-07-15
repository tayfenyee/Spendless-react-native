import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Register } from '../components/Authentication/Authentication.component'
import { register } from '../redux/actions/authentication.actions'

class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Register {...this.props} />
        )
    };
}

RegisterScreen.propTypes = {
    warningMsg: PropTypes.string,
    register: PropTypes.func,
}

const mapStateToProps = (state) => ({
    warningMsg: state.auth.warningMsg,
});

const mapDispatchToProps = (dispatch) => ({
    register: (email, username, password) => dispatch(register(email, username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
