import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import firebase from 'firebase';
import { View, YellowBox } from 'react-native';
import { connect } from 'react-redux';

import colors from '../constants/colors';
import months from '../constants/months';
import { HomeTopNavigator } from '../navigation/top.navigator';
import { getItem, formatAmount } from '../helpers';
import { defaultMappings } from '../constants/mappings';
import { logout } from '../redux/actions/authentication.actions';
import { FloatingButton, MonthPicker, TransactionModal, CustomHeaderLeft } from '../components/Home/Home.component';
import {
    showMonthPicker,
    showModal,
    setMonth,
    openModal,
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
    resetTransaction,
} from '../redux/actions/home.actions';

YellowBox.ignoreWarnings(['Setting a timer']);

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappings: defaultMappings,
        }
    }

    componentWillMount() {
        const { date, showMonthPicker } = this.props;
        this.props.navigation.setParams({
            date,
            showMonthPicker,
            updateMonth: this.updateMonth,
        });
        //Get Mappings
        getItem('userId').then((userId) => {
            var database = firebase.database().ref('mappings/' + userId);
            database.once('value').then((snapshot) => {
                if (snapshot.val() !== null) {
                    this.setState({ mappings: snapshot.val() });
                }
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { month } = this.props;
        if (month !== nextProps.month) {
            this.props.navigation.setParams({
                month: nextProps.month
            });
        }
    }

    updateMonth = (action) => {
        const { month } = this.props;
        let newMonth = moment(month);
        if (action == 'prev') {
            newMonth.subtract(1, 'months')
        } else if (action == 'next') {
            newMonth.add(1, 'months')
        }
        this.props.setMonth(newMonth.valueOf());
        this.props.navigation.setParams({ month: newMonth.valueOf() })
    }

    updateYear = (month, year) => {
        const newDate = moment(month + '-' + year, "M-YYYY").valueOf()
        this.props.showMonthPicker(false)
        this.props.setMonth(newDate)
        this.props.navigation.setParams({ month: newDate })
    }

    saveTransaction = (input) => {
        const { transId, date, befEditDate } = this.props;
        var timestamp = moment(date).startOf('day').valueOf();
        getItem('userId').then((userId) => {
            var database = firebase.database().ref('transactions/' + userId);
            if (transId === '') {
                // New record
                database.child(timestamp).push(input);
            } else {
                // Update existing record
                prevTimestamp = moment(befEditDate).startOf('day').valueOf();
                if (timestamp !== prevTimestamp) {
                    // Different date, need to delete old record
                    database.child(timestamp).push(input);
                    database.child(prevTimestamp.toString() + '/' + transId).remove();
                } else {
                    // Update on same date
                    database.child(timestamp).update({ [transId]: input });
                }
            }
        });
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft: props => <CustomHeaderLeft
                {...props}
                month={params.month}
                showMonthPicker={params.showMonthPicker}
                updateMonth={params.updateMonth}
            />,
            headerStyle: {
                backgroundColor: colors.themeColor,
                elevation: 0,
                height: 40,
            },
        }
    };

    render() {
        const { floatingButtonVisible } = this.props;
        const { mappings } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <HomeTopNavigator />
                <MonthPicker {...this.props} data={months} updateYear={this.updateYear} />
                <TransactionModal
                    {...this.props}
                    formatAmount={formatAmount}
                    saveTransaction={this.saveTransaction}
                    logSummary={this.logSummary}
                    mappings={mappings}
                />
                {floatingButtonVisible ? <FloatingButton {...this.props} mappings={mappings} /> : <View></View>}
            </View>
        );
    };
}

HomeScreen.propTypes = {
    floatingButtonVisible: PropTypes.bool,
    monthPickerVisible: PropTypes.bool,
    modalVisible: PropTypes.bool,
    action: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    month: PropTypes.number,
    dateTimePickerVisible: PropTypes.bool,
    date: PropTypes.number,
    category: PropTypes.string,
    account: PropTypes.string,
    amount: PropTypes.string,
    remarks: PropTypes.string,
    repeat: PropTypes.bool,
    interval: PropTypes.number,
    intervalUnit: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    transId: PropTypes.string,
    befEditDate: PropTypes.number,
    showMonthPicker: PropTypes.func,
    showModal: PropTypes.func,
    setMonth: PropTypes.func,
    openModal: PropTypes.func,
    showDateTimePicker: PropTypes.func,
    setCategory: PropTypes.func,
    setAccount: PropTypes.func,
    setRemarks: PropTypes.func,
    setRepeat: PropTypes.func,
    setInterval: PropTypes.func,
    setIntervalUnit: PropTypes.func,
    setFrom: PropTypes.func,
    setTo: PropTypes.func,
    resetTransaction: PropTypes.func,
    logout: PropTypes.func,
}

const mapStateToProps = (state) => ({
    floatingButtonVisible: state.home.floatingButtonVisible,
    monthPickerVisible: state.home.monthPickerVisible,
    modalVisible: state.home.modalVisible,
    action: state.home.action,
    icon: state.home.icon,
    color: state.home.color,
    month: state.home.month,
    dateTimePickerVisible: state.home.dateTimePickerVisible,
    date: state.home.date,
    category: state.home.category,
    account: state.home.account,
    amount: state.home.amount,
    remarks: state.home.remarks,
    repeat: state.home.repeat,
    interval: state.home.interval,
    intervalUnit: state.home.intervalUnit,
    from: state.home.from,
    to: state.home.to,
    transId: state.home.transId,
    befEditDate: state.home.befEditDate,
});

const mapDispatchToProps = (dispatch) => ({
    showMonthPicker: (bool) => dispatch(showMonthPicker(bool)),
    showModal: (bool) => dispatch(showModal(bool)),
    setMonth: (date) => dispatch(setMonth(date)),
    openModal: (action, mappings) => dispatch(openModal(action, mappings)),
    showDateTimePicker: (bool) => dispatch(showDateTimePicker(bool)),
    setDate: (date) => dispatch(setDate(date)),
    setCategory: (category) => dispatch(setCategory(category)),
    setAccount: (account) => dispatch(setAccount(account)),
    setRemarks: (remarks) => dispatch(setRemarks(remarks)),
    setRepeat: (bool) => dispatch(setRepeat(bool)),
    setInterval: (interval) => dispatch(setInterval(interval)),
    setIntervalUnit: (unit) => dispatch(setIntervalUnit(unit)),
    setFrom: (from) => dispatch(setFrom(from)),
    setTo: (to) => dispatch(setTo(to)),
    resetTransaction: () => dispatch(resetTransaction()),
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);