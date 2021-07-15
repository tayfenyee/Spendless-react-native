import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import BottomNavigator from './bottom.navigator';
import AuthLoading from '../screens/Authentication.screen';
import LoginScreen from '../screens/Login.screen';
import RegisterScreen from '../screens/Register.screen';

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
});

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        App: BottomNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default AppNavigator;