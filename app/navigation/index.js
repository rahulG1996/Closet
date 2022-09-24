import Home from '../Screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Image} from 'react-native';
import React from 'react';
import {VText, VView} from '../components';

const Tab = createBottomTabNavigator();

const renderTab = (route, imgSource) => {
  return (
    <VView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={imgSource}
        style={{width: 24, height: 24}}
        resizeMode="contain"
      />
      <VText text={route.name} style={{paddingLeft: 8}} />
    </VView>
  );
};

export function TabData() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let imgSource = '';
          if (route.name === 'Shop') {
            imgSource = focused
              ? require('../assets/iLockSelected.webp')
              : require('../assets/iLock.webp');
          } else if (route.name === 'Closet') {
            imgSource = focused
              ? require('../assets/iClosetSelected.webp')
              : require('../assets/iCloset.webp');
          }
          if (route.name === 'Outfits') {
            imgSource = focused
              ? require('../assets/iOutfitSelected.webp')
              : require('../assets/outfite.webp');
          }

          return renderTab(route, imgSource);
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="Shop" component={Home} />
      <Tab.Screen name="Closet" component={Home} />
      <Tab.Screen name="Outfits" component={Home} />
    </Tab.Navigator>
  );
}
