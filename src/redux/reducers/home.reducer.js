import moment from 'moment';
import {
    SHOW_FLOATING_BUTTON,
    SHOW_MONTHPICKER,
    SHOW_MODAL,
    SET_ACTION,
    SET_ICON,
    SET_COLOR,
    SET_MONTH,
    SHOW_DATETIMEPICKER,
    SET_DATE,
    SET_CATEGORY,
    SET_ACCOUNT,
    SET_AMOUNT,
    SET_REMARKS,
    SET_REPEAT,
    SET_INTERVAL,
    SET_INTERVAL_UNIT,
    SET_FROM,
    SET_TO,
    SET_TRANSID,
    SET_BEF_EDIT_DATE,
    SET_TRANSACTIONS,
    SET_DAILY_SUMMARY,
} from '../actions/home.actions';
import colors from '../../constants/colors';

const today = moment().valueOf();

const defaultState = {
    floatingButtonVisible: true,
    monthPickerVisible: false,
    modalVisible: false,
    action: 'Expense',
    icon: 'account-balance-wallet',
    color: colors.actionColor1,
    month: today,
    dateTimePickerVisible: false,
    date: today,
    category: '',
    account: '',
    amount: '',
    remarks: '',
    repeat: false,
    interval: 1,
    intervalUnit: 'Months',
    from: '',
    to: '',
    transId: '',
    befEditDate: today,
    transactions: null,
    dailySummary: {
        'Expense': '0.00',
        'Income': '0.00',
        'Positive': true,
        'Total': '0.00',
    },
};

const home = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_FLOATING_BUTTON: {
            return { ...state, floatingButtonVisible: action.floatingButtonVisible }
        }
        case SHOW_MONTHPICKER: {
            return { ...state, monthPickerVisible: action.monthPickerVisible }
        }
        case SHOW_MODAL: {
            return { ...state, modalVisible: action.modalVisible }
        }
        case SET_ACTION: {
            return { ...state, action: action.action }
        }
        case SET_ICON: {
            return { ...state, icon: action.icon }
        }
        case SET_COLOR: {
            return { ...state, color: action.color }
        }
        case SET_MONTH: {
            return { ...state, month: action.month }
        }
        case SHOW_DATETIMEPICKER: {
            return { ...state, dateTimePickerVisible: action.dateTimePickerVisible }
        }
        case SET_DATE: {
            return { ...state, date: action.date }
        }
        case SET_CATEGORY: {
            return { ...state, category: action.category }
        }
        case SET_ACCOUNT: {
            return { ...state, account: action.account }
        }
        case SET_AMOUNT: {
            return { ...state, amount: action.amount }
        }
        case SET_REMARKS: {
            return { ...state, remarks: action.remarks }
        }
        case SET_REPEAT: {
            return { ...state, repeat: action.repeat }
        }
        case SET_INTERVAL: {
            return { ...state, interval: action.interval }
        }
        case SET_INTERVAL_UNIT: {
            return { ...state, intervalUnit: action.intervalUnit }
        }
        case SET_FROM: {
            return { ...state, from: action.from }
        }
        case SET_TO: {
            return { ...state, to: action.to }
        }
        case SET_TRANSID: {
            return { ...state, transId: action.transId }
        }
        case SET_BEF_EDIT_DATE: {
            return { ...state, befEditDate: action.befEditDate }
        }
        case SET_TRANSACTIONS: {
            return { ...state, transactions: action.transactions }
        }
        case SET_DAILY_SUMMARY: {
            return { ...state, dailySummary: action.dailySummary }
        }
        default:
            return state;
    }
};

export default home;