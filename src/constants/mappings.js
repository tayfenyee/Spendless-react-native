import firebase from 'firebase';
import colors from './colors';
import { getItem } from '../helpers';

export const configMappings = (mappings) => {
    getItem('userId').then((userId) => {
        var database = firebase.database().ref('mappings');
        database.set({ [userId]: mappings });
    });
}

export const configAccounts = (accounts) => {
    getItem('userId').then((userId) => {
        // Update accounts
        var accDb = firebase.database().ref('accounts');
        accDb.set({ [userId]: accounts });
        // Update mappings
        var mapDb = firebase.database().ref('mappings/' + userId)
        mapDb.once('value').then((snapshot) => {
            if (snapshot.val() !== null) {
                var newMappings = snapshot.val();
                newMappings.Expense.option.Account = accounts;
                newMappings.Income.option.Account = accounts;
                newMappings.Transfer.option.From = accounts.slice(1);
                newMappings.Transfer.option.To = accounts.slice(1);
                mapDb.update(newMappings);
            }
        })
    });
}

export const defaultAccounts =
    [
        { key: 'Cash', iconName: 'cash-usd', color: '#93EEAA', info: '' },
    ]

export const defaultMappings =
{
    Expense:
    {
        iconName: 'account-balance-wallet',
        color: colors.actionColor1,
        option:
        {
            Date: '',
            Category: [
                { key: 'Food', iconName: 'food', color: '#FFD586', budget: '0.00' },
                { key: 'Shopping', iconName: 'shopping', color: '#FF97CB', budget: '0.00' },
                { key: 'Entertainment', iconName: 'movie', color: '#F4D2F4', budget: '0.00' },
                { key: 'Transportation', iconName: 'bus', color: '#C6C6FF', budget: '0.00' },
                { key: 'Gym', iconName: 'google-fit', color: '#FFE1C6', budget: '0.00' },
                { key: 'Family', iconName: 'home-heart', color: '#74BAAC', budget: '0.00' },
                { key: 'Household', iconName: 'home-outline', color: '#A5DBEB', budget: '0.00' },
                { key: 'Travel', iconName: 'airplane-takeoff', color: '#D7ACAC', budget: '0.00' },
                { key: 'Gift', iconName: 'gift', color: '#FFC8C8', budget: '0.00' },
                { key: 'Other', iconName: 'asterisk', color: '#A9A9A9', budget: '0.00' },
            ],
            Account: defaultAccounts,
            Amount: 0,
            Remarks: '',
            Repeat:
            {
                interval: 0,
                intervalUnit: ['Months', 'Years'],
            },
        }
    },
    Income:
    {
        iconName: 'attach-money',
        color: colors.actionColor2,
        option:
        {
            Date: '',
            Category: [
                { key: 'Salary', iconName: 'cash-multiple', color: '#7CEB98' },
                { key: 'Bonus', iconName: 'book-plus', color: '#FFE099' },
                { key: 'Payback', iconName: 'cash-refund', color: '#C0E0DA' },
                { key: 'Rebates', iconName: 'backup-restore', color: '#E994AB' },
                { key: 'Sales', iconName: 'wallet-giftcard', color: '#C8C800' },
                { key: 'Other', iconName: 'asterisk', color: '#A9A9A9' },
            ],
            Account: defaultAccounts,
            Amount: 0,
            Remarks: '',
            Repeat:
            {
                interval: 0,
                intervalUnit: ['Months', 'Years'],
            },
        }
    },
    Transfer:
    {
        iconName: 'swap-horiz',
        color: colors.actionColor3,
        option:
        {
            Date: '',
            From: defaultAccounts.slice(1),
            To: defaultAccounts.slice(1),
            Amount: 0,
            Remarks: '',
            Repeat:
            {
                interval: 0,
                intervalUnit: ['Months', 'Years'],
            },
        }
    }
}