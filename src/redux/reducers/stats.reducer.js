import {
    SET_EXPENSE_BY_CATEGORY,
    SET_INCOME_BY_CATEGORY,
} from '../actions/stats.actions';

const defaultState = {
    expenseByCategory: [],
    incomeByCategory: [],
}

const stats = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EXPENSE_BY_CATEGORY: {
            return { ...state, expenseByCategory: action.expenseByCategory }
        }
        case SET_INCOME_BY_CATEGORY: {
            return { ...state, incomeByCategory: action.incomeByCategory }
        }
        default:
            return state;
    }
}

export default stats;