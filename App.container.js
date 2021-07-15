import React from 'react';
import firebase from 'firebase';
import { Image, View } from 'react-native';
import { Asset, SplashScreen } from 'expo';

import styles from './App.container.style';
import AppNavigator from './src/navigation/app.navigator';
import { firebaseConfig } from './src/constants/firebase.config';

export default class AppContainer extends React.Component {
    state = {
        areReasourcesReady: false,
        showSplashScreen: true,
    };

    constructor(props) {
        super(props);
        SplashScreen.preventAutoHide();
    }

    setTimer = () => {
        if (this.timerHandle) {
            return;
        }

        this.timerHandle = setTimeout(() => {
            this.setState({ showSplashScreen: false })
            this.timerHandle = 0;
        }, 1000);
    };

    clearTimer = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    };

    async cacheResourcesAsync() {
        const images = [
            require('./src/assets/splash.png'),
            require('./src/assets/login.png'),
            require('./src/assets/loading.gif'),
            require('./src/assets/spinner.gif'),
            require('./src/assets/notfound.png'),
        ];
        const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
        return Promise.all(cacheImages)
    };

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
        this.cacheResourcesAsync()
            .then(() => this.setState({ areReasourcesReady: true }))
            .catch(error => console.error(`Unexpected error thrown when loading: ${error.stack}`));
    };

    render() {
        if (!this.state.areReasourcesReady) {
            return null;
        }

        if (this.state.showSplashScreen) {
            this.setTimer();
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.splashScreen}
                        source={require('./src/assets/splash.png')}
                        onLoadEnd={() => { SplashScreen.hide(); }}
                        fadeDuration={0}
                    />
                    <Image
                        style={styles.loadingIcon}
                        source={require('./src/assets/loading.gif')}
                    />
                </View>
            )
        }

        this.clearTimer();
        return (
            <View style={styles.container}>
                <AppNavigator />
            </View>
        );
    };
}