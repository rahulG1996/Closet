import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {VText, VView} from '../components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewProduct from '../screens/ViewProduct';
import CategoryScreen from '../screens/CategoryScreen';
import LandingPage from '../screens/LandingPage';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyEmail from '../screens/VerifyEmail';
import ResetPassword from '../screens/ResetPassword';
import ProfileSetup from '../screens/ProfileSetup';
import {useDispatch, useSelector} from 'react-redux';
import TermConditions from '../screens/TermCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ClosetScreen from '../screens/Closet';
import ClosetDetailsFrom from '../screens/Closet/component/closetDetailForm';
import Menu from '../screens/Menu';
import Outfits from '../screens/Outfits';
import {getUserProfile} from '../redux/actions/profileAction';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewProduct" component={ViewProduct} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      {/* <Stack.Screen name="ClosetDetailsFrom" component={ClosetDetailsFrom} /> */}
    </Stack.Navigator>
  );
}

const ClosetStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClosetScreen" component={ClosetScreen} />
      <Stack.Screen name="ClosetDetailsFrom" component={ClosetDetailsFrom} />
      <Stack.Screen name="ViewProduct" component={ViewProduct} />
    </Stack.Navigator>
  );
};

function TabData() {
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
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="Closet" component={ClosetStack} />
      <Tab.Screen name="Outfits" component={Outfits} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.AuthReducer.userId);
  const isProfileCreated = useSelector(
    state => state.AuthReducer.isProfileCreated,
  );
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile());
      //get user profile api
    }
  }, [dispatch, userId]);
  return !userId ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="TermConditions" component={TermConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TabData" component={TabData} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isProfileCreated ? (
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      ) : null}
      <Stack.Screen name="TabData" component={TabData} />

      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="TermConditions" component={TermConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
