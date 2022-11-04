import React, {useRef, useState} from 'react';
import {Buttons, VText, VView} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Colors} from '../../colors';
import Categories from './components/Categories';
import {useDispatch} from 'react-redux';

const Home = props => {
  const dispatch = useDispatch();
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
            <Buttons
              text="Set your preferences"
              onPress={() => dispatch({type: 'LOGOUT'})}
            />
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
          <Image
            source={require('../../assets/menu.webp')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </VView>
      </VView>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll}>
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
