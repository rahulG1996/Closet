import React from 'react';
import {Image, Text, View} from 'react-native';
import {Header} from '../../components';

const Outfits = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Outfits" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <Image
          source={require('../../assets/empty.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={{textAlign: 'center', padding: 16, lineHeight: 24}}>
          No Outfits to show. {'\n'} Create outfits to get more personalised
          clothing experinece
        </Text>
      </View>
    </View>
  );
};

export default Outfits;
