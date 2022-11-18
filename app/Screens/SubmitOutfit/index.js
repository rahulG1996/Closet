import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header, Input} from '../../components';

const SubmitOutfit = props => {
  const [selectedSeason, setSeason] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack showVerticalMenu {...props} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <BigImage imgSource={props?.route?.params?.imgSource?.data} />
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.headingStyle}>Name</Text>
          <Input placeholder="Name" />
          <Text style={styles.headingStyle}>Description</Text>
          <Input placeholder="Description" />
          <Text style={styles.headingStyle}>Season</Text>
          <View style={{flexDirection: 'row'}}>
            {['spring', 'summer', 'fall', 'winter'].map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSeason(item)}
                  style={[
                    styles.seasonContainer,
                    {
                      borderColor:
                        item === selectedSeason
                          ? Colors.black60
                          : 'rgba(0,0,0,0.16)',
                    },
                  ]}>
                  <Text style={{textTransform: 'capitalize'}}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{marginTop: 12, marginBottom: 30}}>
            <Buttons text="Add" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SubmitOutfit;

const styles = StyleSheet.create({
  headingStyle: {
    marginTop: 16,
  },
  seasonContainer: {
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderColor: 'rgba(0,0,0,0.16)',
    marginTop: 8,
  },
});
