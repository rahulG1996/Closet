import Home from '../Screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export function TabData() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Shop" component={Home} />
      <Tab.Screen name="Closet" component={Home} />
      <Tab.Screen name="Outfits" component={Home} />
    </Tab.Navigator>
  );
}
