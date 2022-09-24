import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {TabData} from './app/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <TabData />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

export default App;
