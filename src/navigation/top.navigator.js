import { createMaterialTopTabNavigator } from 'react-navigation';

import colors from '../constants/colors';
import DayView from '../screens/Day.view';
import CalendarView from '../screens/Calendar.view';
import ExpenseView from '../screens/Expense.view';
import IncomeView from '../screens/Income.view';

export const HomeTopNavigator = createMaterialTopTabNavigator(
    {
        DayView,
        CalendarView,
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
        initialRouteName: 'DayView',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: 'white',
                height: 5,
            },
            labelStyle: {
                fontSize: 12,
                color: 'white',
            },
            tabStyle: {
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style: {
                backgroundColor: colors.themeColor,
                elevation: 3,
            },
            upperCaseLabel: false,
            pressColor: colors.themeColor,
        },
    },
);

export const StatsTopNavigator = createMaterialTopTabNavigator(
    {
        IncomeView,
        ExpenseView,
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
        initialRouteName: 'IncomeView',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: false,
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: 'white',
                height: 5,
            },
            labelStyle: {
                fontSize: 12,
                color: 'white',
            },
            tabStyle: {
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style: {
                backgroundColor: colors.themeColor,
                elevation: 3,
            },
            upperCaseLabel: false,
            pressColor: colors.themeColor,
        },
    },
);