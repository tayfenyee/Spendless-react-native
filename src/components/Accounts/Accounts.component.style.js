import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    subheader: {
        height: 45,
        backgroundColor: colors.themeColor,
        elevation: 2,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.45)',
        borderRadius: 8,
        height: 32,
        width: 405,
        paddingVertical: 6,
        marginLeft: 10,
        marginTop: 3,
    },
    dropdownSelection: {
        backgroundColor: 'white',
        height: 120,
        width: 405,
        marginTop: -20.5,
        marginLeft: -28,
        borderWidth: 0,
        elevation: 1,
    },
    dropdownClickableText: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
    },
    dropdownText: {
        fontSize: 14,
        color: 'grey',
        marginVertical: 5,
        marginHorizontal: 28,
    },
    dropdownIcon: {
        fontSize: 24,
        marginTop: -3,
        marginHorizontal: 2,
        color: 'white',
    },
    summaryTab: {
        height: 55,
        width: 430,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        elevation: 2,
    },
    summaryText: {
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    infoText: {
        color: 'grey',
        marginBottom: 2,
        marginHorizontal: 10,
    },
    transactionContainer: {
        backgroundColor: 'white',
        elevation: 2,
        marginTop: 10,
        height: 225,
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