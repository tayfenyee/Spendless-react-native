import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, ScrollView, Text } from 'react-native';
import { G, Line, Text as SvgText } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import SmallIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Stats.component.style';
import { parseAmount, formatAmount } from '../../helpers';

export class CustomPieChart extends React.Component {
    render() {
        const { data, categorySelected, allTrans } = this.props;

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data, endAngle, startAngle } = slice;

                var xStartLine = labelCentroid[0];
                var yStartLine = labelCentroid[1];
                var xLabel = xStartLine > 0 ? xStartLine + 10 : xStartLine - 10;
                var yLabel = yStartLine - 10;
                if (categorySelected === data.key) {
                    xStartLine > 0 ? xLabel += 5 : xLabel -= 5;
                    yStartLine > 0 ? yLabel += 5 : yLabel -= 5;
                    xStartLine > 0 ? xStartLine += 5 : xStartLine -= 5;
                    yStartLine > 0 ? yStartLine += 10 : yStartLine -= 10;
                }

                var positionLabel = xStartLine > 0 ? "start" : "end";
                var percentage = ((endAngle - startAngle) / 6.283 * 100).toFixed(2) + '%';

                var budgetStatus, withinBudget;
                if (data.budget && data.budget !== '0.00') {
                    budgetStatus = parseAmount(data.budget) - parseAmount(data.total);
                    withinBudget = budgetStatus > 0 ? true : false;
                }

                return (
                    <G key={index}>
                        <Line
                            x1={xStartLine}
                            y1={yStartLine}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />
                        {categorySelected === data.key ?
                            <SvgText
                                x={pieCentroid[0]}
                                y={pieCentroid[1]}
                                fill={"black"}
                                fontSize={11}
                                textAnchor={"middle"}
                            >
                                {percentage}
                            </SvgText>
                            : null
                        }
                        <SvgText
                            x={xLabel}
                            y={yLabel}
                            fill={"#600"}
                            fontSize={11}
                            fontWeight={'bold'}
                            textAnchor={positionLabel}
                        >
                            {data.key}
                        </SvgText>
                        <SvgText
                            x={xLabel}
                            y={yLabel + 15}
                            fill={"#600"}
                            fontSize={10}
                            textAnchor={positionLabel}
                        >
                            {'$' + data.total}
                        </SvgText>
                        <SvgText
                            x={xLabel}
                            y={yLabel + 30}
                            fill={withinBudget ? "green" : "red"}
                            fontSize={10}
                            textAnchor={positionLabel}
                        >
                            {budgetStatus ? 'Budget: $' + formatAmount(data.budget) : ''}
                        </SvgText>
                    </G>
                )
            })
        }

        return (
            <View style={styles.pieContainer}>
                {allTrans.length > 0 ?
                    <PieChart
                        style={{ height: 350 }}
                        data={data.filter((item) => parseAmount(item.total) > 0)}
                        innerRadius={10}
                        outerRadius={103}
                        labelRadius={130}
                        valueAccessor={({ item }) => parseAmount(item.total)}
                    >
                        <Labels />
                    </PieChart>
                    :
                    null
                }
            </View>
        )
    }
}

CustomPieChart.propTypes = {
    data: PropTypes.array,
    categorySelected: PropTypes.string,
    allTrans: PropTypes.array,
}

export class TransactionsByCategory extends React.Component {
    render() {
        const { transByCategory, mappings, categorySelected, allTrans } = this.props;

        transactionList = (transactions) => {
            return (
                transactions.length > 0 ?
                    transactions.map((trans) =>
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
                    )
                    :
                    <Text style={styles.noDataText}>No data available.</Text>
            )
        }

        return (
            <ScrollView style={styles.transactionContainer}>
                {categorySelected === '' ?
                    transactionList(allTrans) : transactionList(transByCategory)
                }
            </ScrollView>
        )
    }
}

TransactionsByCategory.propTypes = {
    transByCategory: PropTypes.array,
    mappings: PropTypes.object,
    categorySelected: PropTypes.string,
    allTrans: PropTypes.array,
}