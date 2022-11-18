import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../colors';
import {Buttons, Header, OverlayModal} from '../../components';
import {FONTS_SIZES} from '../../fonts';

const Outfits = props => {
  const [showModal, setModal] = useState(false);
  const [sortingData, setSortingData] = useState([
    {
      type: 'asc',
      title: 'Alphabetical (A to Z)',
      isSelected: true,
    },
    {
      type: 'desc',
      title: 'Alphabetical (Z to A)',
      isSelected: false,
    },
    {
      type: 'asc1',
      title: 'Date added',
      isSelected: false,
    },
    {
      type: 'asc2',
      title: 'Date modified',
      isSelected: false,
    },
  ]);
  const renderItem = (item, index) => {
    return (
      <View
        style={{
          marginBottom: 16,
          alignSelf: 'center',
          flex: 0.5,
          marginHorizontal: 8,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('OutfitDetail')}
          style={{
            backgroundColor: Colors.grey1,
            paddingVertical: 10,
            paddingHorizontal: 13,
            width: '100%',
            alignSelf: 'center',
            marginBottom: 8,
          }}>
          <Image
            source={require('../../assets/sweatshirt.webp')}
            style={{
              height: 200,
              width: 100,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <Text>Black and White</Text>
      </View>
    );
  };

  const sortData = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
            Sort
          </Text>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Image
              source={require('../../assets/cross.webp')}
              style={{width: 32, height: 32}}
            />
          </TouchableOpacity>
        </View>
        {sortingData.map(item => {
          return (
            <TouchableOpacity
              onPress={() => changeFilter(item)}
              style={{paddingVertical: 12, flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 22,
                }}>
                {item.isSelected && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 10,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              </View>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const changeFilter = item => {
    let sortingData1 = sortingData;
    sortingData1 = sortingData1.map(i => {
      if (i.title === item.title) {
        return {...i, isSelected: true};
      } else {
        return {...i, isSelected: false};
      }
    });
    setSortingData(sortingData1);
  };

  const handleSorting = () => {
    setModal(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        title="Outfits"
        showSort
        showMenu
        {...props}
        handleSorting={handleSorting}
      />
      {/* <View
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
      </View> */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => renderItem(item, index)}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 8,
          paddingBottom: 100,
        }}
      />
      <OverlayModal showModal={showModal} component={sortData()} />
      <View
        style={{padding: 16, position: 'absolute', bottom: 16, width: '100%'}}>
        <Buttons
          text="Create Outfit"
          onPress={() => props.navigation.navigate('AddOutfit')}
        />
      </View>
    </View>
  );
};

export default Outfits;
