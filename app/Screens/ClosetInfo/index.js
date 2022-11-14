import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const ClosetInfo = props => {
  const [activeOutfit, setActiveOutfit] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <ScrollView>
        <View>
          <View style={{alignItems: 'center'}}>
            <BigImage imgSource={props.route?.params?.apiData?.itemImageUrl} />
          </View>
          <View style={{paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setActiveOutfit(true)}
                style={[
                  styles.tabStyle,
                  {
                    borderBottomColor: activeOutfit
                      ? Colors.black60
                      : 'transparent',
                  },
                ]}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Outfits
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveOutfit(false)}
                style={[
                  styles.tabStyle,
                  {
                    borderBottomColor: !activeOutfit
                      ? Colors.black60
                      : 'transparent',
                  },
                ]}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Information
                </Text>
              </TouchableOpacity>
            </View>
            {activeOutfit ? (
              <View style={styles.dataContainer}>
                <Image
                  source={require('../../assets/iOutfit.png')}
                  style={{width: 87, height: 87}}
                />
                <Text style={{textAlign: 'center', paddingVertical: 20}}>
                  No Outfit created with this cloth
                </Text>
              </View>
            ) : (
              <View style={styles.dataContainer}>
                <Text>Closet Details</Text>
              </View>
            )}

            <Buttons
              text="Create Outfit"
              onPress={() => props.navigation.navigate('AddOutfit')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ClosetInfo;

const styles = StyleSheet.create({
  tabStyle: {
    width: '50%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  dataContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
