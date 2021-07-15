import React from 'react';
import PropTypes from 'prop-types';
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../constants/colors';
import styles from './Authentication.component.style';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    render() {
        const { warningMsg, setWarningMsg, authenticate } = this.props;
        const { email, password } = this.state;
        return (
            <ImageBackground
                style={styles.splashScreen}
                source={colors.theme === 'pink' ? require('../../assets/login.png') : require('../../assets/login_blue.png')}
                fadeDuration={0}
            >
                <View style={styles.container}>
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    <Text style={styles.text}>Please sign in to your account:</Text>
                    <Text style={styles.warning}>{warningMsg}</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder={'Email'}
                        scrollEnabled={false}
                        maxLength={30}
                        onChangeText={(value) => this.setState({ email: value })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        scrollEnabled={false}
                        maxLength={10}
                        onChangeText={(value) => this.setState({ password: value })}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => authenticate(email, password)}
                    >
                        <Icon name='check' style={styles.loginIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionBox}>
                    <TouchableOpacity
                        onPress={() => {
                            setWarningMsg('')
                            this.props.navigation.navigate('Register')
                        }}>
                        <Text style={styles.text}>Register New Account</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

Login.propTypes = {
    warningMsg: PropTypes.string,
    setWarningMsg: PropTypes.func,
    authenticate: PropTypes.func,
}

export class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
    }

    render() {
        const { warningMsg, register } = this.props;
        const { email, username, password } = this.state;
        return (
            <ImageBackground
                style={styles.splashScreen}
                source={colors.theme === 'pink' ? require('../../assets/login.png') : require('../../assets/login_blue.png')}
                fadeDuration={0}
            >
                <View style={styles.container}>
                    <Text style={styles.welcomeText}>Register New Account</Text>
                    <Text style={styles.text}>Please enter your particulars:</Text>
                    <Text style={styles.warning}>{warningMsg}</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder={'Email'}
                        scrollEnabled={false}
                        maxLength={30}
                        onChangeText={(value) => this.setState({ email: value })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder={'Username'}
                        scrollEnabled={false}
                        maxLength={10}
                        onChangeText={(value) => this.setState({ username: value })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        scrollEnabled={false}
                        maxLength={10}
                        onChangeText={(value) => this.setState({ password: value })}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => register(email, username, password)}
                    >
                        <Icon name='check' style={styles.loginIcon} />
                    </TouchableOpacity>
                    <View style={styles.actionBox}></View>
                </View>
            </ImageBackground>
        );
    }
}

Register.propTypes = {
    warningMsg: PropTypes.string,
    register: PropTypes.func,
}