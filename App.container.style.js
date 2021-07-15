import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    splashScreen: {
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined,
    },
    loadingIcon: {
        backgroundColor: 'transparent',
        width: 60,
        height: 30,
        position: 'absolute',
        top: 420,
        left: 180,
    },
});

export default styles;