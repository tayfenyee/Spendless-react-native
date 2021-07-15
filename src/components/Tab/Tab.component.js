import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Tab.component.style'
import colors from '../../constants/colors'

export class TabIcon extends React.Component {
    render() {
        const { name, focused } = this.props;
        return (
            <Icon
                name={name}
                size={22}
                style={styles.tabIcon}
                color={focused ? colors.tabSelected : colors.tabDefault}
            />
        );
    }
}

TabIcon.propTypes = {
    focused: PropTypes.bool,
    name: PropTypes.string,
}

export class TabLabel extends React.Component {
    render() {
        const { label, focused } = this.props;
        return (
            <Text style={[styles.tabLabel, { color: focused ? colors.tabSelected : colors.tabDefault }]}>
                {label}
            </Text>
        );
    }
}

TabLabel.propTypes = {
    focused: PropTypes.bool,
    label: PropTypes.string,
}