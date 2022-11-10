import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const TermConditions = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{position: 'absolute', top: 16, right: 16}}
        onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../assets/cross.webp')}
          style={{width: 44, height: 44}}
        />
      </TouchableOpacity>
      <Text>Term & Conditions</Text>
    </View>
  );
};

export default TermConditions;