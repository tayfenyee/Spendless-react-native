import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    CheckBox,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmallIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';

import styles from './Home.component.style';
import colors from '../../constants/colors';

export class FloatingButton extends React.Component {
    render() {
        const { openModal, mappings } = this.props
        return (
            <ActionButton buttonColor={colors.actionColorMain}>
                <ActionButton.Item
                    buttonColor={colors.actionColor1}
                    title='Expense'
                    onPress={() => openModal('Expense', mappings)}
                >
                    <Icon name='account-balance-wallet' style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor={colors.actionColor2}
                    title='Income'
                    onPress={() => openModal('Income', mappings)}
                >
                    <Icon name='attach-money' style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor={colors.actionColor3}
                    title='Make Transfer'
                    onPress={() => openModal('Transfer', mappings)}
                >
                    <Icon name='swap-horiz' style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }
}

FloatingButton.propTypes = {
    openModal: PropTypes.func,
}

export class CustomHeaderRight extends React.Component {
    render() {
        const { logout } = this.props
        return (
            <TouchableOpacity onPress={logout}>
                <Icon name='exit-to-app' style={styles.logoutIcon} />
            </TouchableOpacity>
        )
    }
}

CustomHeaderRight.propTypes = {
    logout: PropTypes.func,
}

export class CustomHeaderLeft extends React.Component {
    render() {
        const { month, showMonthPicker, updateMonth } = this.props;
        const displayDate = moment(month).format("MMM YYYY");

        return (
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => updateMonth('prev')}>
                    <Icon
                        name='chevron-left'
                        size={24}
                        color='white'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.displayDate}
                    onPress={() => showMonthPicker(true)}
                >
                    <Text style={styles.displayDateText}>{displayDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateMonth('next')}>
                    <Icon
                        name='chevron-right'
                        size={24}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

CustomHeaderLeft.propTypes = {
    month: PropTypes.number,
    showMonthPicker: PropTypes.func,
    updateMonth: PropTypes.func,
}

export class MonthPicker extends React.Component {
    state = {
        year: moment(this.props.month).format("YYYY")
    }

    componentWillReceiveProps() {
        this.setState({ year: moment(this.props.month).format("YYYY") })
    }

    render() {
        const { data, month, updateYear, monthPickerVisible, showMonthPicker } = this.props
        const { year } = this.state

        sameMonth = (val) => {
            return val == moment(month).format("MMM") && year == moment(month).format("YYYY")
        }

        rowView = (obj) => {
            return (
                <View key={obj.key} style={styles.itemView}>
                    <TouchableOpacity onPress={() => updateYear(obj.key, year)}>
                        <Text style={{
                            color: sameMonth(obj.val) ? colors.themeColor : 'black',
                            fontWeight: sameMonth(obj.val) ? 'bold' : 'normal',
                            fontSize: sameMonth(obj.val) ? 17 : 14,
                        }}>
                            {obj.val}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        topMonthRow = data.slice(0, 6).map((obj) => rowView(obj))

        bottomMonthRow = data.slice(6, 12).map((obj) => rowView(obj))

        return (
            <Modal
                backdropOpacity={0}
                onBackButtonPress={() => showMonthPicker(false)}
                onBackdropPress={() => showMonthPicker(false)}
                isVisible={monthPickerVisible}
                animationInTiming={-1}
                animationOutTiming={-1}
            >
                <View style={styles.pickerContainer}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => this.setState({ year: parseInt(year) - 1 })}>
                            <Icon
                                name='chevron-left'
                                size={20}
                                color='white'
                            />
                        </TouchableOpacity>
                        <Text style={styles.yearText}>{year}</Text>
                        <TouchableOpacity onPress={() => this.setState({ year: parseInt(year) + 1 })}>
                            <Icon
                                name='chevron-right'
                                size={20}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.rowView}>
                            {topMonthRow}
                        </View>
                        <View style={styles.rowView}>
                            {bottomMonthRow}
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }
}

MonthPicker.propTypes = {
    month: PropTypes.number,
    data: PropTypes.array,
    monthPickerVisible: PropTypes.bool,
    showMonthPicker: PropTypes.func,
    updateYear: PropTypes.func,
}

export class TransactionModal extends React.Component {
    state = {
        amount: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.amount !== '' && this.props.amount !== nextProps.amount) {
            this.setState({ amount: nextProps.amount });
        }
    }

    render() {
        const {
            mappings,
            modalVisible,
            dateTimePickerVisible,
            action,
            icon,
            color,
            date,
            category,
            account,
            amount,
            remarks,
            repeat,
            interval,
            intervalUnit,
            from,
            to,
            saveTransaction,
            resetTransaction,
            formatAmount,
            showDateTimePicker,
            setDate,
            setCategory,
            setAccount,
            setRemarks,
            setRepeat,
            setInterval,
            setIntervalUnit,
            setFrom,
            setTo,
        } = this.props
        const optionObj = mappings[action].option;
        const baseTextColor = 'grey';
        const optionText = {
            fontSize: 15,
            color: baseTextColor,
            secondaryColor: '#A9A9A9',
            expenseColor: '#D73E68',
            incomeColor: '#6CA870',
            transferColor: '#F9BB00',
            clickableColor: 'black',
        };

        renderDetailsRow = (option) => {
            return (
                <Text style={[styles.detailsText, { marginVertical: 5 }]}>{option}</Text>
            )
        }

        renderRow = (option) => {
            return (
                <View style={styles.dropdownContainer}>
                    <SmallIcon
                        name={option['iconName']}
                        style={[styles.dropdownIcon, { color: option['color'] }]}
                    />
                    <Text style={styles.dropdownText}>{option['key']}</Text>
                </View>
            )
        }

        dateOption =
            <View key={'date'} style={styles.optionChildContainer}>
                <Text style={styles.optionChildTitle}>* Date</Text>
                <Text style={styles.dateTimeText} onPress={() => showDateTimePicker(true)}>
                    {moment(date).format("Do MMM YYYY @ h:mma")}
                </Text>
                <DateTimePicker
                    isVisible={dateTimePickerVisible}
                    mode={'datetime'}
                    is24Hour={false}
                    onConfirm={(date) => {
                        showDateTimePicker(false);
                        setDate(date.valueOf());
                    }}
                    onCancel={() => showDateTimePicker(false)}
                />
            </View>

        amountOption =
            <View key={'amount'} style={styles.optionChildContainer}>
                <Text style={styles.optionChildTitle}>* Amount</Text>
                <Icon
                    name={'attach-money'}
                    style={[styles.textInputIcon, {
                        color: (action === 'Expense') ? optionText.expenseColor :
                            (action === 'Income') ? optionText.incomeColor : optionText.transferColor
                    }]}
                />
                <TextInput
                    style={[styles.textInput, {
                        color: (action === 'Expense') ? optionText.expenseColor :
                            (action === 'Income') ? optionText.incomeColor : optionText.transferColor
                    }]}
                    scrollEnabled={false}
                    maxLength={9}
                    keyboardType={'numeric'}
                    placeholder={amount === '' ? '0.00' : amount}
                    value={this.state.amount}
                    onKeyPress={() =>
                        this.setState({ amount: null })
                    }
                    onEndEditing={(e) =>
                        this.setState({ amount: formatAmount(e.nativeEvent.text) })
                    }
                />
            </View >

        remarksOption =
            <View key={'remarks'} style={styles.optionChildContainer}>
                <Text style={styles.optionChildTitle}>Remarks</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={remarks === '' ? '-' : remarks}
                    scrollEnabled={false}
                    maxLength={20}
                    onChangeText={(remarks) => setRemarks(remarks)}
                    value={remarks}
                />
            </View >

        repeatOption =
            <View key={'repeat'} style={styles.optionChildContainer}>
                <Text style={styles.optionChildTitle}>Repeat</Text>
                <CheckBox
                    style={styles.checkbox}
                    value={repeat}
                    onChange={() => setRepeat(!repeat)}
                />
                {repeat ?
                    <View>
                        <View style={styles.repeatDetails}>
                            <Text style={styles.detailsText}>Every</Text>
                            <ModalDropdown
                                defaultValue={interval === '' ? '1' : interval.toString()}
                                dropdownStyle={styles.detailsSelection}
                                textStyle={styles.detailsClickableText}
                                showsVerticalScrollIndicator={false}
                                options={[...Array(12).keys()].map(x => ++x)}
                                renderRow={renderDetailsRow}
                                renderSeparator={() => { return (<View />) }}
                                onSelect={(value) => setInterval(parseInt(value) + 1)}
                            />
                            <ModalDropdown
                                defaultValue={intervalUnit === '' ? 'Months' : intervalUnit}
                                dropdownStyle={styles.detailsSelection}
                                textStyle={styles.detailsClickableText}
                                showsVerticalScrollIndicator={false}
                                options={optionObj.Repeat['intervalUnit']}
                                renderRow={renderDetailsRow}
                                renderSeparator={() => { return (<View />) }}
                                onSelect={(value) => setIntervalUnit(optionObj.Repeat['intervalUnit'][value])}
                            />
                        </View>
                    </View>
                    : <View></View>}
            </View>

        dropdownOption = (key) =>
            <View key={key} style={styles.optionChildContainer}>
                <Text style={styles.optionChildTitle}>* {key}</Text>
                <ModalDropdown
                    defaultValue={eval(key.toLowerCase()) === '' ? 'Select' : eval(key.toLowerCase())}
                    dropdownStyle={styles.optionChildSelection}
                    textStyle={styles.optionChildText}
                    showsVerticalScrollIndicator={false}
                    options={optionObj[key]}
                    renderRow={renderRow}
                    renderSeparator={() => { return (<View />) }}
                    onSelect={(value) => {
                        if (key == 'Category') {
                            setCategory(optionObj[key][value]['key'])
                        } else if (key == 'Account') {
                            setAccount(optionObj[key][value]['key'])
                        } else if (key == 'To') {
                            setTo(optionObj[key][value]['key'])
                        } else if (key == 'From') {
                            setFrom(optionObj[key][value]['key']);
                        }
                    }}
                    renderButtonText={(selectedOption) => {
                        return (
                            <Text>
                                <SmallIcon
                                    name={selectedOption['iconName']}
                                    style={[styles.optionChildIcon, { color: selectedOption['color'] }]}
                                />
                                {'     ' + selectedOption['key']}
                            </Text>
                        )
                    }}
                />
            </View>

        onSave = () => {
            var repeatDetails = {}
            if (repeat) {
                repeatDetails = {
                    interval: interval,
                    intervalUnit: intervalUnit,
                }
            }
            var input = {}
            if (action === 'Transfer') {
                if (from === '' | to === '' | this.state.amount === null) {
                    Alert.alert(
                        'Warning',
                        'Please fill up all required fields!',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false },
                    );
                    return
                }
                input = {
                    action: action,
                    date: moment(date).valueOf(),
                    from: from,
                    to: to,
                    amount: this.state.amount,
                    remarks: remarks,
                    repeat: repeatDetails,
                }
            } else {
                if (category === '' | account === '' | this.state.amount === null) {
                    Alert.alert(
                        'Warning',
                        'Please fill up all required fields!',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false },
                    );
                    return
                }
                input = {
                    action: action,
                    date: moment(date).valueOf(),
                    category: category,
                    account: account,
                    amount: this.state.amount,
                    remarks: remarks,
                    repeat: repeatDetails,
                }
            }
            saveTransaction(input);
            resetTransaction();
            this.setState({ amount: null });
        }

        return (
            <Modal
                backdropColor={'black'}
                backdropOpacity={0.4}
                onBackButtonPress={() => {
                    resetTransaction()
                    this.setState({ amount: null })
                }}
                onBackdropPress={() => {
                    resetTransaction()
                    this.setState({ amount: null })
                }}
                isVisible={modalVisible}
                animationInTiming={-1}
                animationOutTiming={-1}
            >
                <View style={styles.transactionContainer}>
                    <View style={styles.titleContainer}>
                        <Icon name={icon} style={styles.titleIcon} />
                        <Text style={styles.title}>{action.toUpperCase()}</Text>
                    </View>
                    <View style={styles.optionContainer}>
                        {action === 'Transfer' ?
                            [dateOption, dropdownOption('From'), dropdownOption('To'), amountOption, remarksOption, repeatOption]
                            :
                            [dateOption, dropdownOption('Category'), dropdownOption('Account'), amountOption, remarksOption, repeatOption]
                        }
                    </View>
                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: color }]}
                        onPress={() => onSave()}
                    >
                        <Text style={styles.saveText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

TransactionModal.propTypes = {
    action: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    modalVisible: PropTypes.bool,
    dateTimePickerVisible: PropTypes.bool,
    date: PropTypes.number,
    category: PropTypes.string,
    account: PropTypes.string,
    remarks: PropTypes.string,
    repeat: PropTypes.bool,
    interval: PropTypes.number,
    intervalUnit: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    saveTransaction: PropTypes.func,
    resetTransaction: PropTypes.func,
    formatAmount: PropTypes.func,
    showModal: PropTypes.func,
    showDateTimePicker: PropTypes.func,
    setDate: PropTypes.func,
    setCategory: PropTypes.func,
    setAccount: PropTypes.func,
    setRemarks: PropTypes.func,
    setRepeat: PropTypes.func,
    setInterval: PropTypes.func,
    setIntervalUnit: PropTypes.func,
    setFrom: PropTypes.func,
    setTo: PropTypes.func,
}