import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { getItem } from '../helpers';
import { defaultMappings } from '../constants/mappings';
import { CustomPieChart, TransactionsByCategory } from '../components/Stats/Stats.component';

class IncomeView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: params.dailySummary ? 'Income : $' + params.dailySummary['Income'] : 'Income',
        }
    };

    state = {
        mappings: defaultMappings,
        categorySelected: '',
        transByCategory: [],
    }

    componentWillMount() {
        const { dailySummary } = this.props;
        this.props.navigation.setParams({
            dailySummary
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
        const { dailySummary, transactions } = this.props;
        if (dailySummary !== nextProps.dailySummary) {
            this.props.navigation.setParams({
                dailySummary: nextProps.dailySummary
            });
        }
        if (nextProps.transactions && transactions !== nextProps.transactions) {
            this.setState({ categorySelected: '' });
            this.pieOnPress('');
        }
    }

    pieOnPress = (key) => {
        const { incomeByCategory } = this.props;
        incomeByCategory.map((category) => {
            if (category.key === key) {
                if (category.arc && category.arc.outerRadius === '108%') {
                    category.arc = { outerRadius: '103%' }
                    this.setState({
                        transByCategory: [],
                        categorySelected: '',
                    });
                } else {
                    category.arc = { outerRadius: '108%' }
                    this.setState({
                        transByCategory: category.transactions,
                        categorySelected: key,
                    });
                }
            } else {
                category.arc = { outerRadius: '103%' }
            }
        });
    }

    render() {
        const { mappings, categorySelected, transByCategory } = this.state;
        const { incomeByCategory } = this.props;

        var allTrans = [];
        incomeByCategory.map((category) => {
            category.svg.onPress = () => this.pieOnPress(category.key);
            allTrans = allTrans.concat(category.transactions);
        });

        return (
            <View style={{ flex: 1 }}>
                <CustomPieChart data={incomeByCategory} categorySelected={categorySelected} allTrans={allTrans} />
                <TransactionsByCategory mappings={mappings} categorySelected={categorySelected} transByCategory={transByCategory} allTrans={allTrans} />
            </View>
        )
    }
}

IncomeView.propTypes = {
    dailySummary: PropTypes.object,
    transactions: PropTypes.array,
    incomeByCategory: PropTypes.array,
}

const mapStateToProps = (state) => ({
    dailySummary: state.home.dailySummary,
    transactions: state.home.transactions,
    incomeByCategory: state.stats.incomeByCategory,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeView);