import React, {useRef} from 'react';
import {Animated, Image, PanResponder, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {OverlayModal} from '../../components';

const AddCloset = () => {
  const data = [
    {
      pan: useRef(new Animated.ValueXY()).current,
      imageSrc: require('../../assets/sweatshirt.webp'),
    },
    {
      pan: useRef(new Animated.ValueXY()).current,
      imageSrc: require('../../assets/sweatshirt.webp'),
    },
    {
      pan: useRef(new Animated.ValueXY()).current,
      imageSrc: require('../../assets/sweatshirt.webp'),
    },
  ];

  const panResponder = item =>
    useRef(
      PanResponder.create({
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
        onPanResponderRelease: () => {
          item.pan.flattenOffset();
        },
      }),
    ).current;

  return (
    <View style={styles.container}>
      {data.map((i, index) => {
        return (
          <Animated.View
            style={{
              transform: [{translateX: i.pan.x}, {translateY: i.pan.y}],
            }}
            {...panResponder(i).panHandlers}>
            <View style={{borderWidth: 1, width: 100, height: 100}}>
              <Image
                source={i.imageSrc}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    borderWidth: 1,
    overflow: 'hidden',
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
