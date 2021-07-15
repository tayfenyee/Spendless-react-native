import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import firebase from 'firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { SummaryTab, MonthlyTransactions, MonthlyTransactionsDayModal } from '../components/Home/Transaction.component';
import { editTransaction, deleteTransaction } from '../redux/actions/home.actions';
import { defaultMappings } from '../constants/mappings';
import { getItem, deleteTransactionFromDB } from '../helpers';

class CalendarView extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    header = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    state = {
        dateSelected: '0',
        transactionModalVisible: false,
        dayTransactions: [],
        mappings: defaultMappings,
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

    componentWillReceiveProps() {
        this.closeTransactionModal();
    }

    populateDates = (month) => {
        var currentMonthTotalDays = moment(month).daysInMonth();
        var currentMonthStartPosition = moment(month).startOf('month').day();
        var currentMonthEndPosition = moment(month).endOf('month').day();

        //prev month
        var dates = [...Array(currentMonthStartPosition).keys()].reduce(this.populatePrevMonth, []);

        //current month
        var currentMonthDates = [...Array(currentMonthTotalDays).keys()].reduce(this.populateCurrentMonth, []);
        dates.push.apply(dates, currentMonthDates);

        //next month
        var nextMonthDates = [...Array(6 - currentMonthEndPosition).keys()].reduce(this.populateNextMonth, []);
        dates.push.apply(dates, nextMonthDates);

        var datesInRow = this.groupDatesIntoRow(dates);
        if (datesInRow.length < 6) {
            datesInRow.push([...Array(7).keys()]
                .map(x => 6 - currentMonthEndPosition + x)
                .reduce(this.populateNextMonth, []));
        }
        return datesInRow;
    }

    populatePrevMonth = (datesArray, x) => {
        var prevMonth = moment(this.props.month).subtract(1, 'months').startOf('day');
        var prevMonthTotalDays = prevMonth.daysInMonth();
        var currentMonthStartPosition = moment(this.props.month).startOf('month').day();
        var date = prevMonthTotalDays - currentMonthStartPosition + x;
        datesArray.push({
            [date]: prevMonth.date(date).valueOf().toString(),
            'active': false,
        });
        return datesArray;
    }

    populateCurrentMonth = (datesArray, x) => {
        var currentMonth = moment(this.props.month).startOf('day');
        var date = x + 1;
        datesArray.push({
            [date]: currentMonth.date(date).valueOf().toString(),
            'active': true,
        });
        return datesArray;
    }

    populateNextMonth = (datesArray, x) => {
        var nextMonth = moment(this.props.month).add(1, 'months').startOf('day');
        var date = x + 1;
        datesArray.push({
            [date]: nextMonth.date(date).valueOf().toString(),
            'active': false,
        });
        return datesArray;
    }

    groupDatesIntoRow = (dates) => {
        var i, j, temp, output = [], chunk = 7;
        for (i = 0, j = dates.length; i < j; i += chunk) {
            temp = dates.slice(i, i + chunk);
            output.push(temp);
        }
        return output;
    }

    viewTransactions = (date) => {
        const { transactions } = this.props;
        transactions.map((txn) => {
            if (txn[date]) {
                this.setState({
                    dateSelected: date,
                    transactionModalVisible: true,
                    dayTransactions: txn[date],
                });
            }
        })

    }

    closeTransactionModal = () => {
        this.setState({
            dateSelected: '0',
            transactionModalVisible: false,
            dayTransactions: [],
        });
    }

    deleteTrans = (transId, date) => {
        const { deleteTransaction } = this.props;
        deleteTransaction();
        deleteTransactionFromDB(transId, date);
    }

    render() {
        const { month, dailySummary, editTransaction } = this.props;
        const { mappings, dateSelected, transactionModalVisible, dayTransactions } = this.state;
        var displayDate = moment(month).format("MMM YYYY");

        return (
            <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <SummaryTab
                    {...this.props}
                    displayDate={displayDate}
                    dailySummary={dailySummary}
                />
                <MonthlyTransactions
                    {...this.props}
                    header={this.header}
                    dailySummary={dailySummary}
                    dates={this.populateDates(month)}
                    viewTransactions={this.viewTransactions}
                />
                <MonthlyTransactionsDayModal
                    dateSelected={dateSelected}
                    mappings={mappings}
                    transactionModalVisible={transactionModalVisible}
                    dayTransactions={dayTransactions}
                    closeTransactionModal={this.closeTransactionModal}
                    editTransaction={editTransaction}
                    deleteTransaction={this.deleteTrans}
                />
            </View>
        );
    }
}

CalendarView.propTypes = {
    month: PropTypes.number,
    transactions: PropTypes.array,
    dailySummary: PropTypes.object,
    editTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}

const mapStateToProps = (state) => ({
    month: state.home.month,
    transactions: state.home.transactions,
    dailySummary: state.home.dailySummary,
});

const mapDispatchToProps = (dispatch) => ({
    editTransaction: (object, mappings) => dispatch(editTransaction(object, mappings)),
    deleteTransaction: () => dispatch(deleteTransaction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);