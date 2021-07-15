import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmallIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../constants/colors';
import styles from './Transaction.component.style';

export class SummaryTab extends React.Component {
    render() {
        const { displayDate, dailySummary } = this.props;
        return (
            <View style={styles.summaryTab}>
                <View>
                    <Text style={styles.summaryText}>Income</Text>
                    <Text style={[styles.summaryText, styles.incomeSummary]}>
                        ${dailySummary['Income']}
                    </Text>
                </View>
                <View>
                    <Text style={styles.summaryText}>Expense</Text>
                    <Text style={[styles.summaryText, styles.expenseSummary]}>
                        ${dailySummary['Expense']}
                    </Text>
                </View>
                <View>
                    <Text style={styles.summaryText}>Total for {displayDate}</Text>
                    <Text style={[styles.summaryText, { color: dailySummary['Positive'] ? 'green' : 'red' }]}>
                        {dailySummary['Positive'] ? '$' + dailySummary['Total'] : '-$' + dailySummary['Total']}
                    </Text>
                </View>
            </View>
        )
    }
}

SummaryTab.propTypes = {
    displayDate: PropTypes.string,
    dailySummary: PropTypes.object,
}

export class DailyTransactions extends React.Component {
    render() {
        const { transactions, dailySummary, mappings, onScrollBegin, onScrollEnd, editTransaction, deleteTransaction } = this.props;

        loading =
            <Image
                style={styles.spinnerIcon}
                source={colors.theme === 'pink' ? require('../../assets/spinner.gif') : require('../../assets/spinner_blue.gif')}
            />

        noRecords =
            <View>
                <Image
                    style={styles.notFound}
                    source={require('../../assets/notfound.png')}
                />
                <Text style={styles.notFoundText}>Opps! No records found.</Text>
            </View>

        daySummary =
            transactions ?
                transactions.map((dailyTrans) =>
                    dailySummary[Object.keys(dailyTrans)[0]] ?
                        <View key={Object.keys(dailyTrans)[0]} style={styles.items}>
                            <View style={styles.daySummary}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.date}>
                                        {moment(parseInt(Object.keys(dailyTrans)[0])).format("DD")}
                                    </Text>
                                    <View style={styles.dateDetails}>
                                        <Text style={styles.month}>
                                            {moment(parseInt(Object.keys(dailyTrans)[0])).format("MM.YYYY")}
                                        </Text>
                                        <Text style={styles.day}>
                                            {moment(parseInt(Object.keys(dailyTrans)[0])).format("ddd")}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.amountSummary}>
                                    <Text style={styles.incomeSummary}>${dailySummary[Object.keys(dailyTrans)[0]]['Income']}</Text>
                                    <Text style={styles.expenseSummary}>${dailySummary[Object.keys(dailyTrans)[0]]['Expense']}</Text>
                                </View>
                            </View>
                            {dailyTrans[Object.keys(dailyTrans)[0]].map((trans) =>
                                <TransactionsList
                                    key={trans.id}
                                    trans={trans}
                                    width={170}
                                    mappings={mappings}
                                    editTransaction={editTransaction}
                                    deleteTransaction={deleteTransaction}
                                />
                            )}
                        </View>
                        :
                        <View key={Object.keys(dailyTrans)[0]}></View>
                )
                :
                <View></View>

        return (
            <ScrollView contentContainerStyle={styles.contentContainer} onScrollBeginDrag={onScrollBegin} onScrollEndDrag={onScrollEnd}>
                {
                    transactions ?
                        Object.keys(transactions).length === 0 ? noRecords : daySummary
                        : loading
                }
            </ScrollView>
        )
    }
}

DailyTransactions.propTypes = {
    transactions: PropTypes.array,
    dailySummary: PropTypes.object,
    editTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}

export class TransactionsList extends React.Component {
    render() {
        const { trans, width, mappings, editTransaction, deleteTransaction } = this.props;

        swipeoutBtns = () => {
            return [
                {
                    component: <SmallIcon name='playlist-edit' style={styles.swipeoutIcon} />,
                    backgroundColor: '#5EAE9E',
                    onPress: () => editTransaction(trans, mappings),
                },
                {
                    component: <SmallIcon name='delete' style={styles.swipeoutIcon} />,
                    backgroundColor: '#FF2626',
                    onPress: () => {
                        Alert.alert(
                            'Warning',
                            'Delete transaction?',
                            [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: () => deleteTransaction(trans.id, trans.date) }],
                            { cancelable: false },
                        );
                    }
                }
            ]
        }

        return trans.action === 'Transfer' ?
            <Swipeout
                autoClose={true}
                right={swipeoutBtns()}
                buttonWidth={48}
                style={styles.swipeoutBox}
            >
                <View style={styles.transactionRow}>
                    <View style={styles.iconSet}>
                        <Icon name={mappings[trans.action].iconName} style={[styles.icon, { color: mappings[trans.action].color }]} />
                        <View>
                            <Text style={[styles.transactionText, { width: width }]}>{trans.action}</Text>
                            <Text style={styles.transactionTimestamp}>{moment(parseInt(trans.date)).format("hh:mma")}</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionText, { width: width }]}>{trans.from} &#10140; {trans.to}</Text>
                    <Text style={[styles.transactionAmount, { color: '#686868' }]}>${trans.amount}</Text>
                </View>
            </Swipeout>
            :
            <Swipeout
                autoClose={true}
                right={swipeoutBtns()}
                buttonWidth={48}
                style={styles.swipeoutBox}
            >
                <View style={styles.transactionRow}>
                    <View style={styles.iconSet}>
                        <SmallIcon
                            name={mappings[trans.action].option.Category.find(obj => obj.key === trans.category).iconName}
                            style={[styles.icon, { color: mappings[trans.action].option.Category.find(obj => obj.key === trans.category).color }]}
                        />
                        <View>
                            <Text style={[styles.transactionText, { width: width }]}>{trans.category}</Text>
                            <Text style={styles.transactionTimestamp}>{moment(parseInt(trans.date)).format("hh:mma")}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.transactionText, { width: width }]}>{trans.account}</Text>
                        {trans.remarks !== '' ?
                            <Text style={styles.transactionTimestamp}>* {trans.remarks}</Text>
                            :
                            <View></View>
                        }
                    </View>
                    <Text style={[styles.transactionAmount, { color: trans.action === 'Expense' ? 'red' : 'green' }]}>${trans.amount}</Text>
                </View>
            </Swipeout>
    }
}

TransactionsList.propTypes = {
    trans: PropTypes.object,
    width: PropTypes.number,
    editTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}

export class MonthlyTransactions extends React.Component {
    render() {
        const { header, dailySummary, dates, viewTransactions } = this.props;

        headerTitle = header.map((day) =>
            <Text key={day} style={[styles.calendarGridHeaderText, { color: day === 'Sun' ? 'red' : 'grey' }]}>{day}</Text>
        )

        disabledGrid = (date, index) =>
            <View key={index} style={styles.disabledGrid}>
                <Text style={styles.dateText}>{date}</Text>
            </View>

        activeGrid = (dateObj, date, index) =>
            <TouchableOpacity key={index} style={styles.activeGrid} onPress={() => viewTransactions(dateObj[date])}>
                <Text style={[styles.dateText, { fontWeight: parseInt(dateObj[date]) === moment().startOf('day').valueOf() ? 'bold' : 'normal' }]}>{date}</Text>
                {Object.keys(dailySummary).includes(dateObj[date]) ?
                    <View>
                        <Text style={styles.expenseText}>
                            {dailySummary[dateObj[date]].Expense !== '0.00' ? '$' + dailySummary[dateObj[date]].Expense : ''}
                        </Text>
                        <Text style={styles.incomeText}>
                            {dailySummary[dateObj[date]].Income !== '0.00' ? '$' + dailySummary[dateObj[date]].Income : ''}
                        </Text>
                    </View>
                    :
                    <View></View>
                }
            </TouchableOpacity>

        return (
            <View style={styles.calendarContainer}>
                <View style={styles.calendarGridHeader}>
                    {headerTitle}
                </View>
                {dates.map((row, index) =>
                    <View key={index} style={styles.calendarGridContent}>
                        {row.map((dateObj, index) =>
                            dateObj.active ?
                                activeGrid(dateObj, Object.keys(dateObj)[0], index)
                                :
                                disabledGrid(Object.keys(dateObj)[0], index)
                        )}
                    </View>
                )}
            </View>
        )
    }
}

MonthlyTransactions.propTypes = {
    header: PropTypes.array,
    dailySummary: PropTypes.object,
    dates: PropTypes.array,
    viewTransactions: PropTypes.func,
}

export class MonthlyTransactionsDayModal extends React.Component {
    render() {
        const { transactionModalVisible, mappings, dayTransactions, dateSelected, closeTransactionModal, editTransaction, deleteTransaction } = this.props;

        dayTitle =
            <View style={styles.daySummary}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.date}>
                        {moment(parseInt(dateSelected)).format("DD")}
                    </Text>
                    <View style={styles.dateDetails}>
                        <Text style={styles.month}>
                            {moment(parseInt(dateSelected)).format("MMM YYYY")}
                        </Text>
                        <Text style={styles.day}>
                            {moment(parseInt(dateSelected)).format("ddd")}
                        </Text>
                    </View>
                </View>
            </View>

        return (
            <Modal
                backdropColor={'black'}
                backdropOpacity={0.4}
                onBackButtonPress={closeTransactionModal}
                onBackdropPress={closeTransactionModal}
                isVisible={transactionModalVisible}
                animationInTiming={-1}
                animationOutTiming={-1}
            >
                <View style={styles.transactionContainer}>
                    {dayTitle}
                    <ScrollView>
                        {dayTransactions.map((trans) =>
                            <TransactionsList
                                key={trans.id}
                                trans={trans}
                                width={130}
                                mappings={mappings}
                                editTransaction={editTransaction}
                                deleteTransaction={deleteTransaction}
                            />
                        )}
                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

MonthlyTransactionsDayModal.propTypes = {
    transactionModalVisible: PropTypes.bool,
    dayTransactions: PropTypes.array,
    dateSelected: PropTypes.string,
    closeTransactionModal: PropTypes.func,
    editTransaction: PropTypes.func,
    deleteTransaction: PropTypes.func,
}