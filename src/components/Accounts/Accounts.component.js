import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, ScrollView, Text } from 'react-native';
import { Text as SvgText } from 'react-native-svg';
import { StackedBarChart } from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmallIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

import styles from './Accounts.component.style';
import { parseAmount } from '../../helpers';

export class AccountDropdown extends React.Component {
    componentDidUpdate() {
        const { accountSelected } = this.props;
        if (accountSelected === '') {
            this.refs.dropdown.select(-1);
        }
    }

    render() {
        const { accounts, selectAccount } = this.props;

        return (
            <View style={styles.subheader}>
                <View style={styles.dropdownContainer}>
                    <SmallIcon name={'menu-down'} style={styles.dropdownIcon} />
                    <ModalDropdown
                        ref={'dropdown'}
                        defaultValue={'Select an account'}
                        dropdownStyle={styles.dropdownSelection}
                        textStyle={styles.dropdownClickableText}
                        showsVerticalScrollIndicator={false}
                        options={accounts}
                        renderRow={(option) => { return (<Text style={styles.dropdownText}>{option.key}</Text>) }}
                        renderSeparator={() => { return (<View />) }}
                        onSelect={(index) => { selectAccount(index) }}
                        renderButtonText={(selectedOption) => { return (<Text>{selectedOption.key}</Text>) }}
                    />
                </View>
            </View>
        )
    }
}

AccountDropdown.propTypes = {
    accounts: PropTypes.array,
    accountSelected: PropTypes.string,
    selectAccount: PropTypes.func,
}

export class AccountInfo extends React.Component {
    render() {
        const { accountInfo, chartData, allCategories, categorySelected } = this.props;

        var keys = Object.keys(allCategories);
        var colors = [];
        Object.keys(allCategories).map((key) => colors.push(allCategories[key].color));

        const Labels = ({ x, y, data }) => {
            data.map((obj) => {
                var yOffset = 0;
                Object.keys(obj).map((key) => {
                    if (obj[key].amount !== '0.00') {
                        obj[key].yOffsetPrev = yOffset;
                        yOffset = yOffset + parseAmount(obj[key].amount);
                        obj[key].yOffset = yOffset;
                    }
                });
            });

            return data.map((obj, index) =>
                index === 0 ? //Income
                    Object.keys(obj).map((key) =>
                        obj[key].amount !== '0.00' ?
                            (
                                <SvgText
                                    key={key}
                                    x={115}
                                    y={(y(obj[key].yOffset) + y(obj[key].yOffsetPrev)) / 2}
                                    fontSize={10}
                                    fill={'#600'}
                                    fontWeight={categorySelected === key ? 'bold' : 'normal'}
                                    alignmentBaseline={'middle'}
                                    textAnchor={'middle'}
                                >
                                    {key + `\n$` + obj[key].amount}
                                </SvgText>
                            )
                            : null
                    )
                    : //Expense
                    Object.keys(obj).map((key) =>
                        obj[key].amount !== '0.00' ?
                            (
                                <SvgText
                                    key={key}
                                    x={280}
                                    y={(y(obj[key].yOffset) + y(obj[key].yOffsetPrev)) / 2}
                                    fontSize={10}
                                    fill={'#600'}
                                    fontWeight={categorySelected === key ? 'bold' : 'normal'}
                                    alignmentBaseline={'middle'}
                                    textAnchor={'middle'}
                                >
                                    {key + `\n$` + obj[key].amount}
                                </SvgText>
                            )
                            : null
                    )
            )
        };

        return (
            <View>
                <View style={styles.summaryTab}>
                    <View>
                        <Text style={styles.summaryText}>Total Incoming</Text>
                        <Text style={[styles.summaryText, { color: 'green' }]}>
                            ${accountInfo.totalIn}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.summaryText}>Total Outgoing</Text>
                        <Text style={[styles.summaryText, { color: 'red' }]}>
                            ${accountInfo.totalOut}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <StackedBarChart
                        style={{ height: 265 }}
                        colors={colors}
                        contentInset={{ top: 30, bottom: 30, left: 25, right: 25 }}
                        data={chartData}
                        keys={keys}
                        valueAccessor={({ item, key }) => parseAmount(item[key].amount)}
                    >
                        <Labels />
                    </StackedBarChart>
                    {accountInfo.info !== '' ?
                        <View>
                            <Text style={styles.infoText}>Info:</Text>
                            <Text style={styles.infoText}>{accountInfo.info}</Text>
                        </View>
                        : null
                    }
                </View>
            </View>
        )
    }
}

AccountInfo.propTypes = {
    accountInfo: PropTypes.object,
    chartData: PropTypes.array,
    allCategories: PropTypes.object,
    categorySelected: PropTypes.string,
}

export class TransactionsByAccount extends React.Component {
    render() {
        const { mappings, accountSelected, accountTransIn, accountTransOut, categorySelected } = this.props;

        transForDisplay = accountTransIn.concat(accountTransOut);

        transactionList = (transactions) => {
            return (
                transactions.length > 0 ?
                    transactions.map((trans) =>
                        trans.action === 'Transfer' ?
                            categorySelected === '' || categorySelected === 'Transfer' ?
                                <View key={trans.id} style={styles.transactionRow}>
                                    <View style={styles.iconSet}>
                                        <Icon name={mappings[trans.action].iconName} style={[styles.icon, { color: mappings[trans.action].color }]} />
                                        <View>
                                            <Text style={styles.transactionText}>{trans.action}</Text>
                                            <View style={styles.dateRow}>
                                                <Text style={styles.transactionDay}>{moment(parseInt(trans.date)).format("ddd")}</Text>
                                                <Text style={styles.transactionTimestamp}>{moment(parseInt(trans.date)).format("DD MMM hh:mma")}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.transactionText}>{trans.from} &#10140; {trans.to}</Text>
                                    <Text style={[styles.transactionAmount, { color: accountSelected === trans.from ? 'red' : 'green' }]}>${trans.amount}</Text>
                                </View>
                                : null
                            :
                            categorySelected === '' || categorySelected === trans.category ?
                                <View key={trans.id} style={styles.transactionRow}>
                                    <View style={styles.iconSet}>
                                        <SmallIcon
                                            name={mappings[trans.action].option.Category.find(obj => obj.key === trans.category).iconName}
                                            style={[styles.icon, { color: mappings[trans.action].option.Category.find(obj => obj.key === trans.category).color }]}
                                        />
                                        <View>
                                            <Text style={styles.transactionText}>{trans.category}</Text>
                                            <View style={styles.dateRow}>
                                                <Text style={styles.transactionDay}>{moment(parseInt(trans.date)).format("ddd")}</Text>
                                                <Text style={styles.transactionTimestamp}>{moment(parseInt(trans.date)).format("DD MMM hh:mma")}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.transactionText}>{trans.account}</Text>
                                        {trans.remarks !== '' ?
                                            <Text style={styles.transactionTimestamp}>* {trans.remarks}</Text>
                                            :
                                            <View></View>
                                        }
                                    </View>
                                    <Text style={[styles.transactionAmount, { color: trans.action === 'Expense' ? 'red' : 'green' }]}>${trans.amount}</Text>
                                </View>
                                : null
                    )
                    :
                    <Text style={styles.noDataText}>No data available.</Text>
            )
        }

        return (
            <ScrollView style={styles.transactionContainer}>
                {transactionList(transForDisplay)}
            </ScrollView>
        )
    }
}

TransactionsByAccount.propTypes = {
    mappings: PropTypes.object,
    accountSelected: PropTypes.string,
    accountTransIn: PropTypes.array,
    accountTransOut: PropTypes.array,
    categorySelected: PropTypes.string,
}