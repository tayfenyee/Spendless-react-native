export const SET_EXPENSE_BY_CATEGORY = 'SET_EXPENSE_BY_CATEGORY';
export const SET_INCOME_BY_CATEGORY = 'SET_INCOME_BY_CATEGORY';

export const setExpenseByCategory = (array) => {
    return {
        type: SET_EXPENSE_BY_CATEGORY,
        expenseByCategory: array
    };
}

export const setIncomeByCategory = (array) => {
    return {
        type: SET_INCOME_BY_CATEGORY,
        incomeByCategory: array
    };
}