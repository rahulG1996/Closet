import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {FONTS_SIZES} from '../../fonts';
import VText from '../Text';
import VView from '../View';
import {Images} from '../../assets';

const Header = ({
  showshare = false,
  title = '',
  navigation = () => {},
  showFilter = false,
  showBack = false,
  showMenu = false,
  showSwitch = false,
  switchValue = () => {},
  showVerticalMenu = false,
  openMenu = () => {},
  handleSorting = () => {},
  showSort = false,
}) => {
  const [switchIcon, setSwitch] = useState(false);
  const toggleSwitch = () => {
    switchValue(!switchIcon);
    setSwitch(!switchIcon);
  };

  const verticalMenuClicked = () => {
    openMenu(true);
  };

  const sortClicked = () => {
    handleSorting();
  };

  return (
    <VView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <VView style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <VView style={{flexDirection: 'row', alignItems: 'center'}}>
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
        {showSwitch && (
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={toggleSwitch}>
            <Image
              resizeMode="contain"
              source={switchIcon ? Images.onIcon : Images.offIcon}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        )}
        {showSort && (
          <TouchableOpacity
            onPress={sortClicked}
            style={{paddingHorizontal: 10}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/sort.png')}
              style={{width: 32, height: 32}}
            />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Menu')}
            style={{paddingHorizontal: 10}}>
            <Image
              resizeMode="contain"
              source={Images.menuBar}
              style={{width: 22, height: 22}}
            />
          </TouchableOpacity>
        )}

        {showVerticalMenu && (
          <TouchableOpacity
            onPress={verticalMenuClicked}
            style={{paddingHorizontal: 10}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/vertical.png')}
              style={{width: 32, height: 32}}
            />
          </TouchableOpacity>
        )}
      </VView>
    </VView>
  );
};

export default Header;
