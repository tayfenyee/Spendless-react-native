import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/Home.screen';
import StatsScreen from '../screens/Stats.screen';
import SettingsScreen from '../screens/Settings.screen';
import AccountsScreen from '../screens/Accounts.screen';
import { TabLabel, TabIcon } from '../components/Tab/Tab.component'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabLabel focused={focused} label={'Home'} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabIcon focused={focused} name={'list'} />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabLabel focused={focused} label={'Settings'} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabIcon focused={focused} name={'settings'} />
    ),
};

const StatsStack = createStackNavigator({
    Stats: StatsScreen,
});

StatsStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabLabel focused={focused} label={'Stats'} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabIcon focused={focused} name={'insert-chart'} />
    ),
};

const AccountsStack = createStackNavigator({
    Accounts: AccountsScreen,
});

AccountsStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabLabel focused={focused} label={'Accounts'} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabIcon focused={focused} name={'credit-card'} />
    ),
};

const BottomNavigator = createBottomTabNavigator(
    {
        HomeStack,
        StatsStack,
        AccountsStack,
        SettingsStack,
    }
);

export default BottomNavigator;