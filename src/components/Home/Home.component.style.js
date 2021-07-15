import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const mainText = {
    fontSize: 17,
    letterSpacing: 5,
};

const baseTextColor = 'grey';

const optionText = {
    fontSize: 15,
    color: baseTextColor,
    secondaryColor: '#A9A9A9',
    expenseColor: '#D73E68',
    incomeColor: '#6CA870',
    transferColor: '#F9BB00',
    clickableColor: 'black',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    logoutIcon: {
        fontSize: 22,
        height: 26,
        color: 'white',
        marginRight: 10,
    },
    topHeader: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    displayDate: {
        marginHorizontal: 6
    },
    displayDateText: {
        color: 'white',
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 30,
        elevation: 5,
    },
    topContainer: {
        backgroundColor: colors.theme === 'pink' ? 'pink' : '#8DC7BB',
        height: 40,
        width: 380,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    yearText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    bottomContainer: {
        backgroundColor: 'white',
        height: 110,
        width: 380,
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    itemView: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        elevation: 3,
        top: 40,
        width: 380,
        height: 530,
        borderRadius: 20,
    },
    titleContainer: {
        height: 140,
        alignItems: 'center',
        paddingTop: 30,
    },
    titleIcon: {
        fontSize: 50,
        color: baseTextColor,
    },
    title: {
        color: baseTextColor,
        fontSize: mainText.fontSize,
        letterSpacing: mainText.letterSpacing,
        marginTop: 15,
    },
    optionContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    optionChildContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
    },
    optionChildTitle: {
        width: 90,
        marginRight: 20,
        textAlign: 'right',
        fontSize: optionText.fontSize,
        color: optionText.color,
    },
    optionChildSelection: {
        height: 140,
        width: 225,
        borderWidth: 0,
        marginTop: 15,
        elevation: 1,
    },
    optionChildText: {
        fontSize: optionText.fontSize,
        color: optionText.secondaryColor,
        marginHorizontal: 20,
    },
    optionChildIcon: {
        fontSize: 20,
    },
    dropdownContainer: {
        flexDirection: 'row',
        paddingVertical: 11,
        paddingHorizontal: 20,
    },
    dropdownText: {
        marginLeft: 20,
        fontSize: optionText.fontSize,
        color: optionText.color,
    },
    dropdownIcon: {
        fontSize: 20,
    },
    textInput: {
        width: 185,
        fontSize: optionText.fontSize,
        color: optionText.secondaryColor,
        marginLeft: 20,
        marginTop: -4,
    },
    textInputIcon: {
        fontSize: 20,
        marginLeft: 20,
    },
    dateTimeText: {
        fontSize: optionText.fontSize,
        color: optionText.clickableColor,
        marginLeft: 20,
        borderBottomColor: optionText.secondaryColor,
        borderBottomWidth: 0.5,
    },
    checkbox: {
        marginTop: -5,
        marginLeft: 10,
    },
    repeatDetails: {
        flexDirection: 'row',
    },
    detailsSelection: {
        height: 70,
        borderWidth: 0,
        marginTop: 10,
        elevation: 1,
    },
    detailsClickableText: {
        fontSize: optionText.fontSize,
        color: optionText.color,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    detailsText: {
        fontSize: optionText.fontSize,
        color: optionText.color,
        marginHorizontal: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    saveButton: {
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText: {
        color: 'white',
        fontSize: mainText.fontSize,
        letterSpacing: mainText.letterSpacing,
    },
});

export default styles;