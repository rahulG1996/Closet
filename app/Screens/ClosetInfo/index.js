import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../colors';
import {Buttons, Header} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const ClosetInfo = props => {
  const [activeOutfit, setActiveOutfit] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <ScrollView>
        <View>
          <View style={{alignItems: 'center', backgroundColor: Colors.grey1}}>
            <Image
              source={require('../../assets/sweatshirt.webp')}
              style={{width: 150, height: 350}}
            />
          </View>
          <View style={{paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setActiveOutfit(true)}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                  borderBottomColor: activeOutfit
                    ? Colors.black60
                    : 'transparent',
                }}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Outfits
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveOutfit(false)}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: !activeOutfit
                    ? Colors.black60
                    : 'transparent',
                }}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Information
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{textAlign: 'center', paddingVertical: 32}}>
              No Outfit created with this cloth
            </Text>
            <Buttons text="Create Outfit" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClosetInfo;
