import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmallIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Settings.component.style';
import { formatAmount } from '../../helpers';

export class Header extends React.Component {
    render() {
        const { title } = this.props
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        )
    }
}

export class SettingsList extends React.Component {
    render() {
        const { selectOption } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={['Account', 'Budget', 'Logout']}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={[styles.optionHeader, styles.optionSubheader1]} onPress={() => selectOption(item)}>
                            <Text>{item}</Text>
                            {
                                item !== 'Logout' ?
                                    <Icon name='keyboard-arrow-right' size={20} />
                                    :
                                    null
                            }
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item}
                />
            </View>
        )
    }
}

SettingsList.propTypes = {
    selectOption: PropTypes.func,
};

export class SettingsItem extends React.Component {
    state = {
        configBoxVisible: false,
        configSelected: '',
        newAccountType: '',
        newAccountName: '',
        newAccountInfo: '',
    }

    formatBudget = (str, category) => {
        const { configuration } = this.props;
        if (str !== '') {
            configuration.Expense.option.Category.find((item) => {
                if (item.key === category) {
                    item.budget = formatAmount(str);
                }
            });
        }
    }

    formatInfo = (str, name) => {
        const { configuration } = this.props;
        configuration.find((item) => {
            if (item.key === name) {
                item.info = str;
            }
        });
    }

    componentWillUnmount() {
        const { option, configuration, saveConfig } = this.props;
        saveConfig(option, configuration);
    }

    render() {
        const { option, configuration, accountTypes, accountModalVisible, openAccountModal, closeAccountModal, createNewAccount } = this.props;
        const { configBoxVisible, configSelected, newAccountType, newAccountName, newAccountInfo } = this.state;

        optionBox = (item) =>
            <View key={item.key} style={styles.optionHeader}>
                <TouchableOpacity
                    style={styles.optionSubheader1}
                    onPress={() => this.setState({ configBoxVisible: !configBoxVisible, configSelected: item.key })}
                >
                    <View style={styles.optionSubheader2}>
                        <SmallIcon name={item.iconName} style={[styles.icon, { color: item.color }]} />
                        <Text>{item.key}</Text>
                    </View>
                    <Icon name={configBoxVisible && configSelected === item.key ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} size={20} />
                </TouchableOpacity>
                {configBox(item)}
            </View>

        configBox = (item) =>
            configBoxVisible && configSelected === item.key ?
                option === 'Account' ?
                    <View style={styles.optionConfig}>
                        <Text style={styles.configTitle}>Info:</Text>
                        <TextInput
                            multiline={true}
                            style={styles.configText}
                            defaultValue={item.info}
                            scrollEnabled={false}
                            onChange={(e) => this.formatInfo(e.nativeEvent.text.trim(), item.key)}
                        />
                    </View>
                    :
                    <View style={styles.optionConfig}>
                        <Text style={styles.configTitle}>Budget ($):</Text>
                        <TextInput
                            placeholder={item.budget}
                            style={styles.configText}
                            keyboardType={'numeric'}
                            maxLength={9}
                            onEndEditing={(e) => this.formatBudget(e.nativeEvent.text.trim(), item.key)}
                        />
                    </View>
                :
                null

        addAccountOption =
            <View key={'option'} style={styles.optionHeader}>
                <TouchableOpacity style={styles.optionSubheader1} onPress={() => openAccountModal()}>
                    <View style={styles.optionSubheader2}>
                        <Text>{'Add Account'}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        addAccountModal =
            <Modal
                key={'modal'}
                backdropColor={'black'}
                backdropOpacity={0.4}
                onBackButtonPress={closeAccountModal}
                onBackdropPress={closeAccountModal}
                isVisible={accountModalVisible}
                animationInTiming={-1}
                animationOutTiming={-1}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleText}>New Account</Text>
                    </View>
                    <View style={styles.modalSubheader}>
                        <Text style={styles.modalSubheaderText}>Type :</Text>
                        <ModalDropdown
                            defaultValue={'Select'}
                            dropdownStyle={styles.optionChildSelection}
                            textStyle={styles.optionChildText}
                            showsVerticalScrollIndicator={false}
                            options={accountTypes}
                            onSelect={(value) => { this.setState({ newAccountType: value }) }}
                            renderRow={(option) => {
                                return (
                                    <View style={styles.dropdownContainer}>
                                        <SmallIcon style={[styles.dropdownIcon, { color: option.color }]} name={option.iconName} />
                                        <Text style={styles.dropdownText}>{option.key}</Text>
                                    </View>
                                )
                            }}
                            renderSeparator={() => { return (<View />) }}
                            renderButtonText={(selectedOption) => {
                                return (
                                    <Text>
                                        <SmallIcon style={[styles.optionChildIcon, { color: selectedOption.color }]} name={selectedOption.iconName} />
                                        {'     ' + selectedOption.key}
                                    </Text>
                                )
                            }}
                        />
                    </View>
                    <View style={styles.modalSubheader}>
                        <Text style={styles.modalSubheaderText}>Name :</Text>
                        <TextInput
                            style={styles.addAccountText}
                            scrollEnabled={false}
                            onChange={(e) => this.setState({ newAccountName: e.nativeEvent.text.trim() })}
                        />
                    </View>
                    <View style={styles.modalSubheader}>
                        <Text style={styles.modalSubheaderText}>Info :</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={styles.addAccountText}
                            scrollEnabled={false}
                            onChange={(e) => this.setState({ newAccountInfo: e.nativeEvent.text.trim() })}
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => createNewAccount(newAccountType, newAccountName, newAccountInfo)}>
                        <Text style={styles.saveText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        return (
            <View style={styles.container}>
                {
                    option === 'Account' ?
                        [addAccountOption, configuration.map((item) => optionBox(item)), addAccountModal]
                        :
                        configuration.Expense ? configuration.Expense.option.Category.map((item) => optionBox(item)) : null
                }
            </View>
        )
    }
}

SettingsItem.propTypes = {
    option: PropTypes.string,
    accountTypes: PropTypes.array,
    accountModalVisible: PropTypes.bool, 
    openAccountModal: PropTypes.func, 
    closeAccountModal: PropTypes.func, 
    createNewAccount: PropTypes.func, 
    saveConfig: PropTypes.func,
}