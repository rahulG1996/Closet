import React, {Component, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {useSelector} from 'react-redux';
import {Colors} from '../../colors';
import {Buttons, Header} from '../../components';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
const screen = Dimensions.get('window');

const AddCloset = props => {
  const categoryData = useSelector(state => state.ClosetReducer.categoryData);
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');
  const [outfitImages, setOutfitImages] = useState([]);

  const [closetData, setClosetData] = useState([
    {
      id: 1,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 2,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 3,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 4,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 5,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 6,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 7,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
    {
      id: 8,
      imageSrc: require('../../assets/sweatshirt.webp'),
      added: false,
    },
  ]);

  const addClosetInOutfit = (index, id) => {
    // const filteredPeople = people.filter((item) => item.id !== idToRemove);
    let closetData1 = closetData;
    closetData1[index].added = !closetData1[index].added;
    setClosetData(closetData1);
    if (!outfitImages.some(item => item.id === id)) {
      setOutfitImages(oldArray => [
        ...oldArray,
        {
          pan: new Animated.ValueXY(0, 0),
          imageSrc: require('../../assets/sweatshirt.webp'),
          id: id,
          scale: new Animated.Value(1),
        },
      ]);
    } else {
      //remove image logic
      const filteredOutFitImage = outfitImages.filter(item => item.id !== id);
      setOutfitImages(filteredOutFitImage);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(item.categoryName)}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor:
            activeTab === item.categoryName ? Colors.black60 : 'transparent',
        }}>
        <Text>{item.categoryName}</Text>
      </TouchableOpacity>
    );
  };

  const imageLocations = value => {
    console.warn('value', JSON.stringify(value, undefined, 2));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <ImageBackground
        source={require('../../assets/bg.png')}
        resizeMode="contain"
        style={{height: Dimensions.get('window').height * 0.5}}>
        <App outfitImages={outfitImages} imageLocations={imageLocations} />
      </ImageBackground>
      <BottomSheet
        ref={ref => (panelRef.current = ref)}
        sliderMinHeight={Dimensions.get('window').height * 0.3}
        wrapperStyle={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}
        innerContentStyle={{paddingBottom: 100}}
        sliderMaxHeight={Dimensions.get('window').height * 0.7}>
        {onScrollEndDrag => (
          <ScrollView onScrollEndDrag={onScrollEndDrag}>
            <FlatList
              data={[{categoryName: 'All'}, ...categoryData]}
              horizontal
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {closetData.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => addClosetInOutfit(index, item.id)}
                    style={{
                      alignItems: 'center',
                      backgroundColor: Colors.grey1,
                      paddingHorizontal: 7,
                      paddingVertical: 12,
                      margin: 8,
                    }}>
                    <Image
                      source={require('../../assets/sweatshirt.webp')}
                      style={{width: 50, height: 50}}
                    />
                    <View style={{position: 'absolute', right: 5, top: 5}}>
                      <Image
                        style={{width: 16, height: 16}}
                        source={
                          item.added
                            ? require('../../assets/check.png')
                            : require('../../assets/uncheck.png')
                        }
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </BottomSheet>
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          width: '100%',
          paddingHorizontal: 16,
        }}>
        <Buttons
          text="next"
          onPress={() => props.navigation.navigate('SubmitOutfit')}
        />
      </View>
    </View>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closedata: this.props.outfitImages,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.outfitImages !== this.props.outfitImages) {
      this.setState({closedata: this.props.outfitImages});
    }
    if (prevState.closedata !== this.state.closedata) {
      this.props.imageLocations(this.state.closedata);
    }
  }

  panResponder = (item, index) => {
    let {closedata} = this.state;
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        item.pan.setOffset({
          x: item.pan.x._value,
          y: item.pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: item.pan.x, dy: item.pan.y},
      ]),
      onPanResponderRelease: event => {
        closedata[index] = closedata[index];
        this.setState({closedata}, () => {
          this.props.imageLocations(this.state.closedata);
        });
        item.pan.flattenOffset();
      },
    });
  };

  onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  onPinchEvent = i =>
    Animated.event(
      [
        {
          nativeEvent: {scale: i.scale},
        },
      ],
      {
        useNativeDriver: true,
      },
    );

  render() {
    return (
      <View style={styles.container}>
        {this.props.outfitImages.map((i, index) => {
          return (
            <View style={{width: 100, height: 100}}>
              <PinchGestureHandler
                onGestureEvent={this.onPinchEvent(i)}
                onHandlerStateChange={this.onPinchStateChange}>
                <Animated.Image
                  {...this.panResponder(i, index).panHandlers}
                  source={i.imageSrc}
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 2,
                    transform: [
                      {scale: i.scale},
                      {translateX: i.pan.x},
                      {translateY: i.pan.y},
                    ],
                  }}
                  resizeMode="stretch"
                />
              </PinchGestureHandler>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.5,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 75,
    width: 75,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default AddCloset;
