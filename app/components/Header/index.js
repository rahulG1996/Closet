import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {FONTS_SIZES} from '../../fonts';
import VText from '../Text';
import VView from '../View';

const Header = ({
  showshare = false,
  title = '',
  navigation = () => {},
  showFilter = false,
  showBack = false,
}) => {
  return (
    <VView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <VView style={{flexDirection: 'row'}}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={require('../../assets/iBack.webp')}
              style={{width: 24, height: 18}}
            />
          </TouchableOpacity>
        )}
        {title && (
          <VText
            text={title}
            style={{
              paddingLeft: !showBack || 20,
              fontSize: FONTS_SIZES.s3,
              fontWeight: '700',
            }}
          />
        )}
      </VView>
      {showshare && (
        <VView style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Image
              resizeMode="stretch"
              source={require('../../assets/iAdd.webp')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 20}}>
            <Image
              resizeMode="stretch"
              source={require('../../assets/iAddCloset.webp')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              resizeMode="stretch"
              source={require('../../assets/iShare.webp')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </VView>
      )}
      {showFilter && (
        <TouchableOpacity>
          <Image
            resizeMode="stretch"
            source={require('../../assets/iFilter.webp')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      )}
    </VView>
  );
};

export default Header;
