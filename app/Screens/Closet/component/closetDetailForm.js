import React from 'react';
import {Image, ScrollView} from 'react-native';
import {VView, VText, Buttons, Header, Input} from '../../../components';
import {FONTS_SIZES} from '../../../fonts';
import {Colors} from '../../../colors';

const ClosetDetailsFrom = props => {
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <VView>
        <Header {...props} showBack />
      </VView>
      <ScrollView>
        <VView
          style={{
            alignItems: 'center',
            backgroundColor: Colors.grey1,
            height: 350,
          }}>
          <Image
            source={require('../../../assets/sweatshirt.webp')}
            style={{height: '100%'}}
          />
        </VView>
        <VView style={{padding: 16}}>
          <VView>
            <VText text="Category" />
            <Input placeholder="Tops, Pants, Shorts..." />
            <VText text="Brand" />
            <Input placeholder="H&M, Zara, Nike..." />
            <VText text="Season" />
            <VView style={{flexDirection: 'row'}}>
              {['Spring', 'Summer', 'Fall', 'Winter'].map((item, index) => {
                return (
                  <VView
                    style={{
                      borderWidth: 1,
                      marginRight: 8,
                      padding: 8,
                      borderColor: 'rgba(0,0,0,0.16)',
                      marginTop: 8,
                    }}>
                    <VText text={item} />
                  </VView>
                );
              })}
            </VView>
            <Buttons text="Add" />
          </VView>
        </VView>
      </ScrollView>
    </VView>
  );
};

export default ClosetDetailsFrom;
