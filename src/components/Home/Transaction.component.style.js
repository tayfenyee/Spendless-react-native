import { StyleSheet } from 'react-native';

const grey = '#686868';
const lightGrey = '#A9A9A9';

const styles = StyleSheet.create({
    summaryTab: {
        height: 55,
        width: 440,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        elevation: 2,
    },
    summaryText: {
        textAlign: 'center'
    },
    contentContainer: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    spinnerIcon: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 20,
    },
    notFound: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 120,
    },
    notFoundText: {
        color: lightGrey,
        textAlign: 'center',
        marginTop: 10,
    },
    items: {
        marginVertical: 5,
        backgroundColor: 'white',
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    daySummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: lightGrey,
        borderBottomWidth: 0.5,
        paddingBottom: 5,
        marginBottom: 8,
    },
    amountSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 140,
        paddingRight: 8,
    },
    incomeSummary: {
        color: 'green',
    },
    expenseSummary: {
        color: 'red',
    },
    date: {
        fontSize: 30,
        fontWeight: 'bold',
        color: grey,
        marginRight: 5,
    },
    dateDetails: {
        flexDirection: 'column',
        padding: 5,
    },
    month: {
        fontSize: 10,
        fontFamily: 'sans-serif-light',
        color: grey,
    },
    day: {
        fontSize: 9,
        fontFamily: 'sans-serif-light',
        color: 'white',
        backgroundColor: lightGrey,
        paddingHorizontal: 2,
        paddingVertical: 1,
        marginRight: 12,
    },
    swipeoutBox: {
        backgroundColor: 'white',
        borderRightColor: '#E8E8E8',
        borderRightWidth: 3,
        marginVertical: 5,
    },
    swipeoutIcon: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginVertical: 3,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    transactionText: {
        fontSize: 12,
        color: grey,
        textAlignVertical: 'center',
    },
    transactionTimestamp: {
        fontSize: 8,
        color: lightGrey,
        textAlignVertical: 'bottom',
    },
    transactionAmount: {
        fontSize: 14,
        textAlign: 'right',
        marginRight: 6,
        width: 70,
    },
    icon: {
        fontSize: 20,
        marginLeft: 3,
        marginRight: 12,
    },
    iconSet: {
        flexDirection: 'row',
        width: 130,
    },
    calendarContainer: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 9,
        paddingBottom: 10,
    },
    calendarGridHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    calendarGridHeaderText: {
        fontSize: 11,
        width: 60,
        textAlign: 'center',
    },
    calendarGridContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    disabledGrid: {
        backgroundColor: '#F8F8F8',
        width: 60,
        height: 83,
        borderRightWidth: 0.2,
        borderRightColor: '#E0E0E0',
        borderTopWidth: 0.5,
        borderTopColor: lightGrey,
        padding: 2,
    },
    activeGrid: {
        backgroundColor: 'white',
        width: 60,
        height: 83,
        borderRightWidth: 0.2,
        borderRightColor: '#E0E0E0',
        borderTopWidth: 0.5,
        borderTopColor: lightGrey,
        padding: 2,
    },
    dateText: {
        fontSize: 11,
        color: grey,
    },
    expenseText: {
        fontSize: 10,
        color: 'red',
        textAlign: 'right',
        marginTop: 25,
    },
    incomeText: {
        fontSize: 10,
        color: 'green',
        textAlign: 'right',
    },
    transactionContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        elevation: 3,
        top: 230,
        width: 380,
        height: 250,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default styles;