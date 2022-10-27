import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../../colors';
import {VView, VText} from '../../../components';
import {FONTS_SIZES} from '../../../fonts';

export default ({index}) => {
  return (
    <>
      <VView
        style={{
          marginBottom: 16,
          alignSelf: 'center',
          flex: 0.5,
          marginHorizontal: 8,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.grey1,
            paddingVertical: 10,
            paddingHorizontal: 13,
            width: '100%',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../../assets/iAdd.webp')}
            style={{
              height: 32,
              width: 32,
              alignSelf: 'flex-end',
            }}
            resizeMode="contain"
          />

          <Image
            source={require('../../../assets/sweatshirt.webp')}
            style={{
              height: 200,
              width: 100,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <VView
          style={{
            marginTop: 8,
          }}>
          <VText
            text="Product Name"
            style={{
              fontSize: FONTS_SIZES.s4,
            }}
          />
          <VText
            text="Description of the Pro..."
            style={{
              fontSize: FONTS_SIZES.s4,
              color: Colors.black60,
              paddingVertical: 5,
            }}
          />
          <VText
            text="Price"
            style={{
              fontSize: FONTS_SIZES.s4,
            }}
          />
        </VView>
      </VView>
    </>
  );
};
