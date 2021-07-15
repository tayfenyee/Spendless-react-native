import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import colors from '../constants/colors';
import { getItem } from '../helpers';
import { logout } from '../redux/actions/authentication.actions';
import { configAccounts, configMappings, defaultAccounts, defaultMappings } from '../constants/mappings';
import { Header, SettingsList, SettingsItem } from '../components/Settings/Settings.component';

class SettingsScreen extends React.Component {
    state = {
        option: '',
        configuration: [],
        accountModalVisible: false,
    }

    accountTypes = [
        { key: 'Credit Card', iconName: 'credit-card', color: '#F0C4F0' },
        { key: 'Bank Account', iconName: 'bank', color: '#CEDEF4' },
    ]

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }

    static navigationOptions = () => {
        return {
            headerLeft: <Header title={'Settings'} />,
            headerStyle: {
                backgroundColor: colors.themeColor,
                elevation: 2,
                height: 40,
            },
        }
    };

    onBackPress() {
        const { option } = this.state;
        if (option === '') {
            return false;
        }
        this.resetOption();
        return true;
    }

    selectOption = (option) => {
        var config = [];
        if (option === 'Logout') {
            Alert.alert(
                'Warning',
                'Confirm Logout?',
                [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: () => this.props.logout() }],
                { cancelable: false },
            );
            this.setState({ option: option, configuration: config });
        } else {
            getItem('userId').then((userId) => {
                if (option === 'Account') {
                    var database = firebase.database().ref('accounts/' + userId);
                    database.once('value').then((snapshot) => {
                        if (snapshot.val() !== null) {
                            this.setState({ configuration: snapshot.val() });
                        } else {
                            this.setState({ configuration: defaultAccounts });
                        }
                    });
                } else if (option === 'Budget') {
                    var database = firebase.database().ref('mappings/' + userId);
                    database.once('value').then((snapshot) => {
                        if (snapshot.val() !== null) {
                            this.setState({ configuration: snapshot.val() });
                        } else {
                            this.setState({ configuration: defaultMappings });
                        }
                    });
                }
                this.setState({ option: option });
            });
        }
    }

    resetOption = () => {
        this.setState({ option: '', configuration: [] });
    }

    openAccountModal = () => {
        this.setState({ accountModalVisible: true });
    }

    closeAccountModal = () => {
        this.setState({ accountModalVisible: false });
    }

    createNewAccount = (type, name, info) => {
        const { option, configuration } = this.state;
        var newAccount = {
            key: name,
            iconName: this.accountTypes[type].iconName,
            color: this.accountTypes[type].color,
            info: info,
        }
        configuration.push(newAccount);
        this.saveConfig(option, configuration);
        this.closeAccountModal();
    }

    saveConfig = (option, config) => {
        getItem('userId').then((userId) => {
            if (option === 'Account') {
                configAccounts(config, userId);
            } else if (option === 'Budget') {
                configMappings(config, userId);
            }
        });
    }

    render() {
        const { option, configuration, accountModalVisible } = this.state;
        if (option === 'Account' || option === 'Budget') {
            return (
                <SettingsItem
                    {...this.props}
                    option={option}
                    configuration={configuration}
                    accountTypes={this.accountTypes}
                    accountModalVisible={accountModalVisible}
                    saveConfig={this.saveConfig}
                    createNewAccount={this.createNewAccount}
                    openAccountModal={this.openAccountModal}
                    closeAccountModal={this.closeAccountModal}
                />
            )
        }
        return (
            <SettingsList {...this.props} selectOption={this.selectOption} />
        )
    }
}

SettingsScreen.propTypes = {
    logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);