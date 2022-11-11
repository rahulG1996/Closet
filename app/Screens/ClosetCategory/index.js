import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../colors';
import {Header} from '../../components';

const ClosetCategory = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        showBack
        showFilter
        title={props?.route?.params?.categoryType}
        {...props}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {[1, 2, 3, 4, 5, 6, , 7, 8, 9].map(item => {
            return (
              <TouchableOpacity
                style={{
                  width: '45%',
                  alignItems: 'center',
                  backgroundColor: Colors.grey1,
                  paddingHorizontal: 7,
                  paddingVertical: 12,
                  margin: 8,
                }}
                onPress={() => props.navigation.navigate('ClosetInfo')}>
                <Image
                  source={require('../../assets/sweatshirt.webp')}
                  style={{width: 150, height: 140}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ClosetCategory;
