import React, {useEffect, useRef, useState} from 'react';
import {Buttons, VText, VView} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import {Colors} from '../../colors';
import Categories from './components/Categories';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import Lottie from 'lottie-react-native';

const Home = props => {
  const dispatch = useDispatch();
  const [showBambuser, setShowBambuser] = useState(false);
  const isProfileCreated = useSelector(
    state => state.AuthReducer.isProfileCreated,
  );
  const [searchIcon, showSearchIcon] = useState(false);
  const _scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = ({
    nativeEvent: {
      contentOffset: {y},
    },
  }) => {
    if (y > 70) {
      showSearchIcon(true);
    } else {
      showSearchIcon(false);
    }
  };

  const renderItem = item => {
    switch (item) {
      case 1:
        return <Categories {...props} />;
      case 2:
        return (
          <VView
            style={{
              backgroundColor: Colors.grey1,
              padding: 16,
              margin: 16,
            }}>
            <VText
              text="For You"
              style={{fontSize: FONTS_SIZES.s3, fontWeight: '700'}}
            />
            <VText
              text="Description of the first above heading will go here"
              style={{
                marginVertical: 8,
                paddingRight: 8,
                color: Colors.black60,
              }}
            />
            <Buttons text="Set your preferences" />
          </VView>
        );
      case 3:
        return <Categories />;
    }
  };
  return (
    <VView style={styles.conatiner}>
      <VView style={styles.headingContainer}>
        <VText style={styles.headingText} text="Shop" />
        <VView style={{flexDirection: 'row'}}>
          {searchIcon && (
            <VView style={{paddingRight: 20}}>
              <Image
                source={require('../../assets/search.webp')}
                style={styles.menuIcon}
              />
            </VView>
          )}
          <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
            <Image
              source={require('../../assets/menu.webp')}
              style={styles.menuIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </VView>
      </VView>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll}>
        <Lottie
          source={require('../../assets/ripple.json')}
          autoPlay
          loop
          style={{
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -99,
          }}>
          <TouchableOpacity
            style={{
              height: 64,
              width: 64,
              borderRadius: 32,
              backgroundColor: Colors.grey1,
              margin: 20,
              zIndex: 99,
            }}
            onPress={() => setShowBambuser(true)}>
            <Image
              resizeMode="contain"
              source={require('../../assets/live.png')}
              style={{width: '100%', height: '100%'}}
            />
            <View style={{position: 'absolute', bottom: -10, left: 13}}>
              <Image
                source={require('../../assets/livetext.png')}
                style={{width: 40, height: 24}}
              />
            </View>
          </TouchableOpacity>
        </Lottie>

        <VView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search jeans, top, hats..."
          />
        </VView>
        {[1, 2, 3].map(item => {
          return renderItem(item);
        })}
      </ScrollView>

      {showBambuser && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', top: 16, right: 16, zIndex: 999}}
            onPress={() => setShowBambuser(false)}>
            <Image
              source={require('../../assets/cross.webp')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
          <WebView
            source={{
              uri: 'https://demo.bambuser.shop/content/webview-landing-v2.html',
            }}
          />
        </View>
      )}
    </VView>
  );
};

export default Home;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headingText: {
    fontSize: FONTS_SIZES.s1,
    fontWeight: '700',
  },
  menuIcon: {
    height: 22,
    width: 22,
  },
  inputContainer: {
    backgroundColor: Colors.grey1,
    marginBottom: 32,
    marginTop: 16,
    marginHorizontal: 16,
  },
  input: {
    padding: 16,
  },
});
