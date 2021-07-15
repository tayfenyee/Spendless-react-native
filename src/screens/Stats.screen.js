import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import moment from 'moment';
import { View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../constants/colors';
import { getItem, formatAmount, parseAmount } from '../helpers';
import { defaultMappings } from '../constants/mappings';
import { StatsTopNavigator } from '../navigation/top.navigator';
import { CustomHeaderLeft } from '../components/Home/Home.component';
import { showMonthPicker, setMonth } from '../redux/actions/home.actions';
import { setExpenseByCategory, setIncomeByCategory } from '../redux/actions/stats.actions';

class StatsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mappings: defaultMappings,
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
                elevation: 0,
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
        //Get Mappings
        getItem('userId').then((userId) => {
            var database = firebase.database().ref('mappings/' + userId);
            database.once('value').then((snapshot) => {
                if (snapshot.val() !== null) {
                    this.setState({ mappings: snapshot.val() });
                }
                this.populateStatsByCategory(transactions);
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { month, transactions } = this.props;
        if (month !== nextProps.month) {
            this.props.navigation.setParams({
                month: nextProps.month
            });
        }
        if (nextProps.transactions && transactions !== nextProps.transactions) {
            this.populateStatsByCategory(nextProps.transactions);
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

    populateStatsByCategory = (transactions) => {
        const { setExpenseByCategory, setIncomeByCategory } = this.props;
        const { mappings } = this.state;

        var expenseMapping = mappings.Expense.option.Category;
        var incomeMapping = mappings.Income.option.Category;
        this.addTransactionMapping(expenseMapping);
        this.addTransactionMapping(incomeMapping);

        for (dayTrans of transactions) {
            for (timestamp of Object.keys(dayTrans)) {
                for (trans of dayTrans[timestamp]) {
                    if (trans.action === 'Expense') {
                        this.updateTransactionMapping(expenseMapping, trans);
                    } else if (trans.action === 'Income') {
                        this.updateTransactionMapping(incomeMapping, trans);
                    }
                }
            }
        }
        setExpenseByCategory(expenseMapping);
        setIncomeByCategory(incomeMapping);
    }

    addTransactionMapping = (mapping) => {
        return mapping.map((obj) => {
            obj.svg = { fill: obj.color };
            obj.transactions = [];
            obj.total = '0.00';
        });
    }

    updateTransactionMapping = (mapping, trans) => {
        return mapping.find((obj) => {
            if (obj.key === trans.category) {
                obj.transactions.push(trans);
                obj.total = formatAmount(parseAmount(obj.total) + parseAmount(trans.amount));
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatsTopNavigator />
            </View>
        )
    }
}

StatsScreen.propTypes = {
    month: PropTypes.number,
    monthPickerVisible: PropTypes.bool,
    setMonth: PropTypes.func,
    showMonthPicker: PropTypes.func,
    transactions: PropTypes.array,
    setExpenseByCategory: PropTypes.func,
    setIncomeByCategory: PropTypes.func,
}

const mapStateToProps = (state) => ({
    month: state.home.month,
    monthPickerVisible: state.home.monthPickerVisible,
    transactions: state.home.transactions,
    expenseByCategory: state.stats.expenseByCategory,
});

const mapDispatchToProps = (dispatch) => ({
    setMonth: (date) => dispatch(setMonth(date)),
    showMonthPicker: (bool) => dispatch(showMonthPicker(bool)),
    setExpenseByCategory: (array) => dispatch(setExpenseByCategory(array)),
    setIncomeByCategory: (array) => dispatch(setIncomeByCategory(array)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);