import firebase from 'firebase';
import moment from 'moment';
import { AsyncStorage } from 'react-native';

export const setItem = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('AsyncStorage #setItem error: ' + error.message);
    }
}

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('AsyncStorage #getItem error: ' + error.message);
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('AsyncStorage #removeItem error: ' + error.message);
    }
}

export const deleteTransactionFromDB = (transId, date) => {
    getItem('userId').then((userId) => {
        console.log(userId, date, transId);
        const timestamp = moment(date).startOf('day').valueOf();
        const database = firebase.database().ref('transactions/' + userId + '/' + timestamp);
        database.child(transId).remove();
    });
}

export const formatAmount = (input) => {
    return parseFloat(input).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const parseAmount = (input) => {
    return Number(input.replace(/[^0-9.-]+/g, ""));
}