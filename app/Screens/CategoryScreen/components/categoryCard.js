import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../../colors';
import {VView, VText} from '../../../components';
import {FONTS_SIZES} from '../../../fonts';

export default ({item, index, getProductDetails, addToCloset}) => {
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
          onPress={getProductDetails}
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.grey1,
            paddingVertical: 10,
            paddingHorizontal: 13,
            width: '100%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={addToCloset}>
            <Image
              source={require('../../../assets/iAdd.webp')}
              style={{
                height: 32,
                width: 32,
                alignSelf: 'flex-end',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={{uri: item?.imageUrls[0]}}
            resizeMode="contain"
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
            text={item.productName}
            style={{
              fontSize: FONTS_SIZES.s4,
              fontWeight: 'bold',
            }}
          />

          <VText
            text={`$${item.productPrice}`}
            style={{
              fontSize: FONTS_SIZES.s4,
            }}
          />
        </VView>
      </VView>
    </>
  );
};
