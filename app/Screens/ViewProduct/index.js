import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Colors} from '../../colors';
import {VText, VView, Buttons, Header} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const ViewProduct = props => {
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <VView>
        <Header showshare {...props} showBack />
      </VView>
      <ScrollView>
        <VView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.grey1,
            height: 350,
          }}>
          <Image
            source={require('../../assets/sweatshirt.webp')}
            style={{height: '100%'}}
          />
        </VView>
        <VView style={{padding: 16}}>
          <VView>
            <VText
              style={{fontSize: FONTS_SIZES.s3, fontWeight: '700'}}
              text="Name of the Product"
            />
            <VText
              text="$67"
              style={{
                fontSize: FONTS_SIZES.s3,
                fontWeight: '700',
                paddingVertical: 8,
              }}
            />
            <VText
              style={{color: Colors.black60}}
              text="Description of the first above heading will go here Description of the first above..."
            />
            <Buttons text="buy from the store" />
          </VView>
        </VView>
      </ScrollView>
    </VView>
  );
};

export default ViewProduct;
