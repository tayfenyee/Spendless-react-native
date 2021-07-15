import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    }, splashScreen: {
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined,
    }, welcomeText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'sans-serif',
        letterSpacing: 3,
        textAlign: 'center',
        marginBottom: 40,
    }, text: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'sans-serif-light',
        letterSpacing: 1,
        textAlign: 'center',
        marginVertical: 5,
    }, warning: {
        fontSize: 12,
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
        marginTop: 10,
    }, inputBox: {
        textAlign: 'center',
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        marginHorizontal: 50,
        marginTop: 20,
    }, loginButton: {
        height: 40,
        opacity: 0.2,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 50,
        marginTop: 20,
    }, loginIcon: {
        fontSize: 24,
        height: 26,
        color: 'white',
        alignSelf: 'center',
        marginVertical: 5,
    }, actionBox: {
        marginBottom: 60, 
        marginTop: -90,
    },
});

export default styles;