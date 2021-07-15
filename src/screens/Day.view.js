import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import firebase from 'firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { defaultMappings } from '../constants/mappings';
import { getItem, formatAmount, parseAmount, deleteTransactionFromDB } from '../helpers';
import { SummaryTab, DailyTransactions } from '../components/Home/Transaction.component';
import {
    showFloatingButton,
    setTransactions,
    setDailySummary,
    editTransaction,
    deleteTransaction,
} from '../redux/actions/home.actions';

class DayView extends React.Component {
    static navigationOptions = {
        title: 'Daily',
    };

    constructor(props) {
        super(props);
        this.retrieveTransactions(props.month);
        this.state = {
            scrollviewOffset: 0,
            mappings: defaultMappings,
        }
    }

    componentWillMount() {
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
        const { month, setTransactions } = this.props;
        if (month !== nextProps.month) {
            setTransactions(null);
            this.retrieveTransactions(nextProps.month);
        }
    }

    componentWillUnmount = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    };

    onScrollBegin = () => {
        const { showFloatingButton } = this.props;
        showFloatingButton(false);
    }

    onScrollEnd = () => {
        const { showFloatingButton } = this.props;
        this.timerHandle = setTimeout(() => {
            showFloatingButton(true);
            this.timerHandle = 0;
        }, 2000);
    }

    retrieveTransactions = (month) => {
        const { setDailySummary, setTransactions } = this.props;
        var start = moment(month).startOf('month').valueOf().toString();
        var end = moment(month).endOf('month').valueOf().toString();
        getItem('userId').then((userId) => {
            var database = firebase.database().ref('transactions/' + userId);
            database.orderByKey().startAt(start).endAt(end).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    this.processTransactions(snapshot.toJSON());
                } else {
                    setDailySummary({
                        'Expense': '0.00',
                        'Income': '0.00',
                        'Positive': true,
                        'Total': '0.00',
                    });
                    setTransactions([]);
                }
            });
        });
    }

    processTransactions = (data) => {
        const { setDailySummary, setTransactions } = this.props;
        var dates = Object.keys(data).reverse();
        var output = [];
        var summary = {
            'Expense': '0.00',
            'Income': '0.00',
            'Positive': true,
            'Total': '0.00',
        }
        for (var d in dates) {
            var date = dates[d];
            var transIds = Object.keys(data[date]);
            var dailyCounter = {
                'Expense': '0.00',
                'Income': '0.00',
            };
            var dailyTrans = [];
            for (var i in transIds) {
                var transId = transIds[i];
                var transDetails = data[date][transId];
                transDetails.id = transId;
                dailyTrans.push(transDetails);
                if (transDetails.action !== 'Transfer') {
                    dailyCounter[transDetails.action] = formatAmount(
                        parseAmount(dailyCounter[transDetails.action]) + parseAmount(transDetails.amount)
                    );
                    summary[transDetails.action] = formatAmount(
                        parseAmount(summary[transDetails.action]) + parseAmount(transDetails.amount)
                    );
                    var total = parseAmount(summary['Income']) - parseAmount(summary['Expense']);
                    summary['Total'] = formatAmount(Math.abs(total));
                    summary['Positive'] = total > 0 ? true : false;
                }
            }
            dailyTrans.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
            output.push({ [date]: dailyTrans });
            summary[date] = dailyCounter;
        }
        setDailySummary(summary);
        setTransactions(output);
    }

    deleteTrans = (transId, date) => {
        const { deleteTransaction } = this.props;
        deleteTransaction();
        deleteTransactionFromDB(transId, date);
    }

    render() {
        const { month, transactions, dailySummary, editTransaction } = this.props;
        const { mappings } = this.state;
        var displayDate = moment(month).format("MMM YYYY");

        return (
            <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <SummaryTab
                    {...this.props}
                    displayDate={displayDate}
                    dailySummary={dailySummary}
                />
                <DailyTransactions
                    {...this.props}
                    dailySummary={dailySummary}
                    transactions={transactions}
                    mappings={mappings}
                    onScrollBegin={this.onScrollBegin}
                    onScrollEnd={this.onScrollEnd}
                    editTransaction={editTransaction}
                    deleteTransaction={this.deleteTrans}
                />
            </View>
        );
    }
}

DayView.propTypes = {
    floatingButtonVisible: PropTypes.bool,
    modalVisible: PropTypes.bool,
    action: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    month: PropTypes.number,
    dateTimePickerVisible: PropTypes.bool,
    transactions: PropTypes.array,
    dailySummary: PropTypes.object,
    showFloatingButton: PropTypes.func,
    setTransactions: PropTypes.func,
    setDailySummary: PropTypes.func,
    editTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}

const mapStateToProps = (state) => ({
    floatingButtonVisible: state.home.floatingButtonVisible,
    modalVisible: state.home.modalVisible,
    action: state.home.action,
    icon: state.home.icon,
    color: state.home.color,
    month: state.home.month,
    dateTimePickerVisible: state.home.dateTimePickerVisible,
    transactions: state.home.transactions,
    dailySummary: state.home.dailySummary,
});

const mapDispatchToProps = (dispatch) => ({
    showFloatingButton: (bool) => dispatch(showFloatingButton(bool)),
    setTransactions: (object) => dispatch(setTransactions(object)),
    setDailySummary: (object) => dispatch(setDailySummary(object)),
    editTransaction: (object, mappings) => dispatch(editTransaction(object, mappings)),
    deleteTransaction: () => dispatch(deleteTransaction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DayView);