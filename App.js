import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './app/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {store, persistor} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <StatusBar
                  barStyle="dark-content"
                  translucent
                  // backgroundColor={backgroundColor}
                  {...this.props}
                />
                <AppNavigation />
              </PersistGate>
            </Provider>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

export default App;

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);
