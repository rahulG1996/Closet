import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors} from '../../colors';
import {Header} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

const Menu = props => {
  const userProfileResponse = useSelector(
    state => state.ProfileReducer.userProfileResponse,
  );
  const dispatch = useDispatch();
  const menuData = [
    {
      icon: '',
      manuName: 'My Profile',
      route: 'ProfileSetup',
    },
    {
      icon: '',
      manuName: 'Preferences',
    },
    {
      icon: '',
      manuName: 'Terms & Conditions',
      route: 'TermConditions',
    },
    {
      icon: '',
      manuName: 'Privacy Policy',
      route: 'PrivacyPolicy',
    },
    {
      icon: '',
      manuName: 'Logout',
    },
    {
      icon: '',
      manuName: 'Delete Account',
    },
  ];

  const menuClick = item => {
    if (item.manuName === 'Logout') {
      Alert.alert('Vetir', 'Are you sure want to logout', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch({type: 'LOGOUT'})},
      ]);
    }
    if (item.route) {
      props.navigation.navigate(item.route);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header showBack title="Menu" {...props} />
      <View style={{flex: 1}}>
        <View style={styles.container1}>
          <View style={{marginHorizontal: 16}}>
            <Image
              source={
                userProfileResponse?.profilePicUrl
                  ? {uri: userProfileResponse.profilePicUrl}
                  : require('../../assets/iProfile.png')
              }
              style={{width: 80, height: 80, borderRadius: 40}}
            />
          </View>
          <View style={styles.profileDataContainer}>
            <Text style={{fontWeight: 'bold'}}>
              {userProfileResponse?.name}
            </Text>
            <Text style={{textTransform: 'capitalize'}}>
              {userProfileResponse?.gender}
            </Text>
            <Text>{userProfileResponse?.emailId}</Text>
          </View>
        </View>
        <View>
          {menuData.map(item => {
            return (
              <TouchableOpacity
                onPress={() => menuClick(item)}
                style={styles.menuContainer}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 16}}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: '#D9D9D9',
                      }}
                    />
                  </View>
                  <Text>{item.manuName}</Text>
                </View>
                <View style={{paddingRight: 20}}>
                  <Image
                    source={require('../../assets/rightArrow.png')}
                    style={{width: 10, height: 14}}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 24,
    marginVertical: 8,
  },
  profileDataContainer: {
    height: 80,
    justifyContent: 'space-between',
  },
  menuContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: Colors.grey1,
    justifyContent: 'space-between',
  },
});
