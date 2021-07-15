import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../constants/colors';
import { getItem, formatAmount, parseAmount } from '../helpers';
import { defaultMappings, defaultAccounts } from '../constants/mappings';
import { CustomHeaderLeft } from '../components/Home/Home.component';
import { AccountDropdown, AccountInfo, TransactionsByAccount } from '../components/Accounts/Accounts.component';
import { showMonthPicker, setMonth } from '../redux/actions/home.actions';

class AccountsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappings: defaultMappings,
            accounts: defaultAccounts,
            accountSelected: '',
            accountTransIn: [],
            accountTransOut: [],
            accountInfo: {},
            chartData: [{}, {}],
            allCategories: {},
            categorySelected: '',
        }
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
                elevation: 2,
                height: 40,
            },
        }
    };

    componentWillMount() {
        const { month, showMonthPicker, transactions } = this.props;
        this.props.navigation.setParams({
            month,
            showMonthPicker,
            updateMonth: this.updateMonth,
        });
        //Get Accounts
        getItem('userId').then((userId) => {
            var database = firebase.database().ref('accounts/' + userId);
            database.once('value').then((snapshot) => {
                if (snapshot.val() !== null) {
                    this.setState({ accounts: snapshot.val() });
                }
                this.populateSummaryByAccount(transactions);
            });
        });
        this.getAllCategories();
    }

    componentWillReceiveProps(nextProps) {
        const { month, transactions } = this.props;
        if (month !== nextProps.month) {
            this.props.navigation.setParams({
                month: nextProps.month
            });
        }
        if (nextProps.transactions && transactions !== nextProps.transactions) {
            this.setState({
                accountSelected: '',
                accountTransIn: [],
                accountTransOut: [],
                accountInfo: {},
                chartData: [{}, {}],
                categorySelected: '',
            });
            this.populateSummaryByAccount(nextProps.transactions);
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

    getAllCategories = () => {
        const { mappings } = this.state;
        var allCategories = {};
        mappings.Expense.option.Category.map((category) => {
            allCategories[category.key] = {
                color: category.color,
                amount: '0.00',
                svg: { onPress: () => this.chartOnPress(category.key) },
            };
        });
        mappings.Income.option.Category.map((category) => {
            allCategories[category.key] = {
                color: category.color,
                amount: '0.00',
                svg: { onPress: () => this.chartOnPress(category.key) },
            };
        });
        allCategories.Transfer = {
            color: mappings.Transfer.color,
            amount: '0.00',
            svg: { onPress: () => this.chartOnPress('Transfer') },
        };
        this.setState({ allCategories });
    }

    chartOnPress = (category) => {
        const { categorySelected } = this.state;
        if (categorySelected === category) {
            this.setState({ categorySelected: '' });
        } else {
            this.setState({ categorySelected: category });
        }
    }

    selectAccount = (indexSelected) => {
        const { accounts } = this.state;
        this.setState({
            accountSelected: accounts[indexSelected].key,
            accountTransIn: accounts[indexSelected].transactionsIn,
            accountTransOut: accounts[indexSelected].transactionsOut,
            accountInfo: {
                totalIn: accounts[indexSelected].totalIn,
                totalOut: accounts[indexSelected].totalOut,
                info: accounts[indexSelected].info,
            },
            chartData: accounts[indexSelected].chartData,
        });
    }

    populateSummaryByAccount = (transactions) => {
        const { accounts, allCategories } = this.state;

        accounts.map((obj) => {
            obj.svg = { fill: obj.color };
            obj.transactionsIn = [];
            obj.transactionsOut = [];
            obj.totalIn = '0.00';
            obj.totalOut = '0.00';
            var categoriesInCopy = cloneDeep(allCategories);
            var categoriesOutCopy = cloneDeep(allCategories);
            obj.chartData = [categoriesInCopy, categoriesOutCopy];
        });

        for (dayTrans of transactions) {
            for (timestamp of Object.keys(dayTrans)) {
                for (trans of dayTrans[timestamp]) {
                    if (trans.action === 'Expense') {
                        accounts.find((obj) => {
                            if (obj.key === trans.account) {
                                obj.transactionsOut.push(trans);
                                obj.totalOut = formatAmount(parseAmount(obj.totalOut) + parseAmount(trans.amount));
                                obj.chartData[1][trans.category].amount = formatAmount(parseAmount(obj.chartData[1][trans.category].amount) + parseAmount(trans.amount));
                            }
                        });
                    } else if (trans.action === 'Income') {
                        accounts.find((obj) => {
                            if (obj.key === trans.account) {
                                obj.transactionsIn.push(trans);
                                obj.totalIn = formatAmount(parseAmount(obj.totalIn) + parseAmount(trans.amount));
                                obj.chartData[0][trans.category].amount = formatAmount(parseAmount(obj.chartData[0][trans.category].amount) + parseAmount(trans.amount));
                            }
                        });
                    } else if (trans.action === 'Transfer') {
                        accounts.find((obj) => {
                            if (obj.key === trans.from) {
                                obj.transactionsOut.push(trans);
                                obj.totalOut = formatAmount(parseAmount(obj.totalOut) + parseAmount(trans.amount));
                                obj.chartData[1][trans.action].amount = formatAmount(parseAmount(obj.chartData[1][trans.action].amount) + parseAmount(trans.amount));
                            }
                            if (obj.key === trans.to) {
                                obj.transactionsIn.push(trans);
                                obj.totalIn = formatAmount(parseAmount(obj.totalIn) + parseAmount(trans.amount));
                                obj.chartData[0][trans.action].amount = formatAmount(parseAmount(obj.chartData[0][trans.action].amount) + parseAmount(trans.amount));
                            }
                        });
                    }
                }
            }
        }
    }

    render() {
        const { mappings, accounts, accountSelected, accountTransIn, accountTransOut, accountInfo, chartData, allCategories, categorySelected } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <AccountDropdown accounts={accounts} accountSelected={accountSelected} selectAccount={this.selectAccount} />
                {accountSelected !== '' ?
                    <View>
                        <AccountInfo
                            accountInfo={accountInfo}
                            chartData={chartData}
                            allCategories={allCategories}
                            categorySelected={categorySelected}
                        />
                        <TransactionsByAccount
                            mappings={mappings}
                            accountSelected={accountSelected}
                            accountTransIn={accountTransIn}
                            accountTransOut={accountTransOut}
                            categorySelected={categorySelected}
                        />
                    </View>
                    : null}
            </View>
        )
    }
}

AccountsScreen.propTypes = {
    month: PropTypes.number,
    monthPickerVisible: PropTypes.bool,
    setMonth: PropTypes.func,
    showMonthPicker: PropTypes.func,
    transactions: PropTypes.array,
}

const mapStateToProps = (state) => ({
    month: state.home.month,
    monthPickerVisible: state.home.monthPickerVisible,
    transactions: state.home.transactions,
});

const mapDispatchToProps = (dispatch) => ({
    setMonth: (date) => dispatch(setMonth(date)),
    showMonthPicker: (bool) => dispatch(showMonthPicker(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsScreen);