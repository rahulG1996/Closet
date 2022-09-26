import * as React from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FONTS_SIZES} from '../../fonts';
import {Buttons} from '../../components';
import LoginScreen from '../Auth/loginScreen';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
          title: 'Heading will go here',
          subtitle: 'Description of the first illustration will go here',
          imgSrc: require('../../assets/banner.webp'),
        },
        {
          title: 'Heading will go here',
          subtitle: 'Description of the first illustration will go here',
          imgSrc: require('../../assets/banner.webp'),
        },
        {
          title: 'Heading will go here',
          subtitle: 'Description of the first illustration will go here',
          imgSrc: require('../../assets/banner.webp'),
        },
      ],
      activeIndex: 0,
      isLoginVisible: false,
    };
  }
  _renderItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={item.imgSrc} style={styles.image} resizeMode="contain" />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.subtitle}</Text>
      </View>
    );
  };
  handleLogin = () => {
    this.setState({
      isLoginVisible: true,
    });
  };
  render() {
    console.log('isLoginVisible', this.state.isLoginVisible);
    return (
      <View style={{paddingHorizontal: 16, backgroundColor: 'white', flex: 1}}>
        <View>
          <Carousel
            loop={true}
            autoplay={true}
            layout="stack"
            layoutCardOffset={9}
            ref={c => (this._slider1Ref = c)}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={index => this.setState({activeIndex: index})}
          />
          <Pagination
            dotsLength={this.state.entries.length}
            activeDotIndex={this.state.activeIndex}
            carouselRef={c => (this._slider1Ref = c)}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        <ScrollView>
          <Buttons text="login" onPress={() => this.handleLogin()} />
          <Buttons text="Create Account" isInverse />
          <TouchableOpacity
            style={{paddingVertical: 16, marginTop: 16}}
            onPress={() => this.props.navigation.navigate('TabData')}>
            <Text style={{textAlign: 'center', textTransform: 'uppercase'}}>
              I want to explore first
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.isLoginVisible && <LoginScreen />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: '#222',
    fontSize: FONTS_SIZES.s3,
    fontWeight: '700',
    paddingLeft: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  body: {
    color: '#222',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    textAlign: 'center',
  },
});
