import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {Colors} from '../../colors';

const BigImage = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.grey1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
      }}>
      <Image
        source={
          props.imgSource
            ? {uri: props.imgSource}
            : require('../../assets/sweatshirt.webp')
        }
        style={{width: '80%', height: 375}}
      />
    </View>
  );
};

export default BigImage;
