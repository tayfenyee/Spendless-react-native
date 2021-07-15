import moment from 'moment';

export const SHOW_FLOATING_BUTTON = 'SHOW_FLOATING_BUTTON';
export const SHOW_MONTHPICKER = 'SHOW_MONTHPICKER';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_ACTION = 'SET_ACTION';
export const SET_ICON = 'SET_ICON';
export const SET_COLOR = 'SET_COLOR';
export const SET_MONTH = 'SET_MONTH';
export const SHOW_DATETIMEPICKER = 'SHOW_DATETIMEPICKER';
export const SET_DATE = 'SET_DATE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_AMOUNT = 'SET_AMOUNT';
export const SET_REMARKS = 'SET_REMARKS';
export const SET_REPEAT = 'SET_REPEAT';
export const SET_INTERVAL = 'SET_INTERVAL';
export const SET_INTERVAL_UNIT = 'SET_INTERVAL_UNIT';
export const SET_FROM = 'SET_FROM';
export const SET_TO = 'SET_TO';
export const SET_TRANSID = 'SET_TRANSID';
export const SET_BEF_EDIT_DATE = 'SET_BEF_EDIT_DATE';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_DAILY_SUMMARY = 'SET_DAILY_SUMMARY';

export const showFloatingButton = (bool) => {
    return {
        type: SHOW_FLOATING_BUTTON,
        floatingButtonVisible: bool
    };
}

export const showMonthPicker = (bool) => {
    return {
        type: SHOW_MONTHPICKER,
        monthPickerVisible: bool
    };
};

export const showModal = (bool) => {
    return {
        type: SHOW_MODAL,
        modalVisible: bool
    }
}

export const setAction = (action, mappings) => {
    return (dispatch) => {
        dispatch(_setAction(action));
        if (action in mappings) {
            actionProps = mappings[action]
            dispatch(setIcon(actionProps.iconName));
            dispatch(setColor(actionProps.color))
        }
    }
}

export const _setAction = (string) => {
    return {
        type: SET_ACTION,
        action: string
    }
}

export const setIcon = (string) => {
    return {
        type: SET_ICON,
        icon: string
    }
}

export const setColor = (string) => {
    return {
        type: SET_COLOR,
        color: string,
    }
}

export const setMonth = (int) => {
    return {
        type: SET_MONTH,
        month: int
    }
}

export const openModal = (action, mappings) => {
    return (dispatch) => {
        dispatch(showModal(true));
        dispatch(setAction(action, mappings));
    }
}

export const showDateTimePicker = (bool) => {
    return {
        type: SHOW_DATETIMEPICKER,
        dateTimePickerVisible: bool
    }
}

export const setDate = (date) => {
    return {
        type: SET_DATE,
        date: date
    }
}

export const setCategory = (string) => {
    return {
        type: SET_CATEGORY,
        category: string
    }
}

export const setAccount = (string) => {
    return {
        type: SET_ACCOUNT,
        account: string
    }
}

export const setAmount = (string) => {
    return {
        type: SET_AMOUNT,
        amount: string
    }
}

export const setRemarks = (string) => {
    return {
        type: SET_REMARKS,
        remarks: string
    }
}

export const setRepeat = (bool) => {
    return {
        type: SET_REPEAT,
        repeat: bool
    }
}

export const setInterval = (int) => {
    return {
        type: SET_INTERVAL,
        interval: int
    }
}

export const setIntervalUnit = (string) => {
    return {
        type: SET_INTERVAL_UNIT,
        intervalUnit: string
    }
}

export const setFrom = (string) => {
    return {
        type: SET_FROM,
        from: string
    }
}

export const setTo = (string) => {
    return {
        type: SET_TO,
        to: string
    }
}

export const setTransId = (string) => {
    return {
        type: SET_TRANSID,
        transId: string
    }
}

export const setBefEditDate = (date) => {
    return {
        type: SET_BEF_EDIT_DATE,
        befEditDate: date
    }
}

export const setTransactions = (object) => {
    return {
        type: SET_TRANSACTIONS,
        transactions: object
    }
}

export const setDailySummary = (object) => {
    return {
        type: SET_DAILY_SUMMARY,
        dailySummary: object
    }
}

export const resetTransaction = () => {
    return (dispatch) => {
        dispatch(showModal(false));
        dispatch(showDateTimePicker(false));
        dispatch(setDate(moment().valueOf()));
        dispatch(setCategory(''));
        dispatch(setAccount(''));
        dispatch(setAmount(''));
        dispatch(setRemarks(''));
        dispatch(setRepeat(false));
        dispatch(setInterval(1));
        dispatch(setIntervalUnit('Months'));
        dispatch(setFrom(''));
        dispatch(setTo(''));
        dispatch(setTransId(''));
    }
}

export const editTransaction = (trans, mappings) => {
    return (dispatch) => {
        dispatch(setTransId(trans.id));
        dispatch(setDate(trans.date));
        dispatch(setBefEditDate(trans.date));
        dispatch(openModal(trans.action, mappings));
        dispatch(showDateTimePicker(false));
        dispatch(setAmount(trans.amount));
        dispatch(setRemarks(trans.remarks));
        if (trans.action === 'Transfer') {
            dispatch(setFrom(trans.from));
            dispatch(setTo(trans.to));
        } else {
            dispatch(setCategory(trans.category));
            dispatch(setAccount(trans.account));
        }
        if (trans.repeat) {
            dispatch(setRepeat(true));
            dispatch(setInterval(trans.repeat.interval));
            dispatch(setIntervalUnit(trans.repeat.intervalUnit));
        } else {
            dispatch(setRepeat(false));
            dispatch(setInterval(0));
            dispatch(setIntervalUnit('Months'));
        }
    }
}

export const deleteTransaction = () => {
    return (dispatch) => {
        dispatch(setTransactions(null));
    }
}