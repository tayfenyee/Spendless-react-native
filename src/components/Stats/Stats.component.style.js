import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pieContainer: {
        backgroundColor: 'white',
        elevation: 2,
        height: 350,
    },
    transactionContainer: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 10,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.2,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    transactionText: {
        fontSize: 12,
        color: '#686868',
        textAlignVertical: 'center',
        width: 170,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    transactionDay: {
        fontSize: 8,
        fontFamily: 'sans-serif-light',
        color: 'white',
        backgroundColor: '#A9A9A9',
        paddingHorizontal: 2,
        paddingVertical: 1,
        marginRight: 5,
    },
    transactionTimestamp: {
        fontSize: 8,
        color: '#A9A9A9',
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
    noDataText: {
        textAlign: 'center',
        color: 'grey',
        marginTop: 20,
    }
});

export default styles;