import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Header, VText, VView} from '../../components';
import {Images} from '../../assets';
import {Colors} from '../../colors';
import {useSelector} from 'react-redux';
import PhotoEditor from 'react-native-photo-editor';
// import PhotoEditor from 'react-native-photo-editor';

let data = [
  {
    categoryType: 'Tops',
    categoryData: [
      {
        images: require('../../assets/sweatshirt.webp'),
      },
      {
        images: require('../../assets/sweatshirt.webp'),
      },
    ],
  },
  {
    categoryType: 'Layers',
    categoryData: [
      {
        images: require('../../assets/sweatshirt.webp'),
      },
      {
        images: require('../../assets/sweatshirt.webp'),
      },
    ],
  },
  {
    categoryType: 'Bottoms',
    categoryData: [
      {
        images: require('../../assets/sweatshirt.webp'),
      },
      {
        images: require('../../assets/sweatshirt.webp'),
      },
    ],
  },
  {
    categoryType: 'Beach',
    categoryData: [
      {
        images: require('../../assets/sweatshirt.webp'),
      },
      {
        images: require('../../assets/sweatshirt.webp'),
      },
    ],
  },
];

export default props => {
  const [selectedImage, setSelectedImage] = useState('');
  const [gridType, setGrid] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const categoryData = useSelector(state => state.ClosetReducer.categoryData);

  useEffect(() => {
    setSelectedImage('');
  }, []);
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(img => {
      props.navigation.navigate('EditCloset');
      props.navigation.navigate('EditCloset', {
        imgSource: img.path,
      });
    });
  };

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(img => {
      console.log('teststtststs', img);
      setSelectedImage(img?.path);
      props.navigation.navigate('EditCloset', {
        imgSource: img.path,
      });
    });
  };

  const emptyScreen = () => {
    return (
      <VView style={styles.bodyContainer}>
        <VView
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={Images.whiteBox} style={styles.whiteBoxStyle} />
          <VText
            text={'Your closet is empty. Add clothes to get...'}
            style={styles.emptyClosetText}
          />
          <VView style={{marginTop: 16}}>
            <Image
              source={Images.lineArrow}
              style={styles.lineArrowStyle}
              resizeMode="stretch"
            />
          </VView>
        </VView>
      </VView>
    );
  };

  const switchValue = value => {
    setGrid(value);
  };

  const listGrid = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingHorizontal: 16,
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              style={{marginVertical: 8}}
              onPress={() =>
                props.navigation.navigate('ClosetCategory', {
                  categoryType: item.categoryType,
                })
              }>
              <View
                style={{
                  width: 160,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {item.categoryData.splice(0, 4).map(i => {
                  return (
                    <View
                      style={{
                        width: '40%',
                        height: 80,
                        backgroundColor: Colors.grey1,
                        margin: 2,
                      }}>
                      <Image
                        source={i.images}
                        style={{width: '95%', height: '95%'}}
                      />
                    </View>
                  );
                })}
              </View>
              <Text style={{marginTop: 8}}>{item.categoryType}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(item.categoryName)}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor:
            activeTab === item.categoryName ? Colors.black60 : 'transparent',
        }}>
        <Text>{item.categoryName}</Text>
      </TouchableOpacity>
    );
  };

  const lisSectionGrid = () => {
    return (
      <View>
        <FlatList
          data={[{categoryName: 'All'}, ...categoryData]}
          horizontal
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
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
      </View>
    );
  };

  return (
    <VView style={styles.container}>
      <Header
        title="Closet"
        showMenu
        navigation={props.navigation}
        shoSwicth
        switchValue={switchValue}
      />
      {/* {emptyScreen()} */}
      <ScrollView style={{}}>
        {gridType ? lisSectionGrid() : listGrid()}
      </ScrollView>
      <VView style={styles.footerContainer}>
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={handleCamera}
          style={styles.footerImageContainer}>
          <Image source={Images.camera} style={styles.footerImage} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={handleGallery}
          style={styles.footerImageContainer}>
          <Image source={Images.photos} style={styles.footerImage} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={() => alert('Hi')}
          style={styles.footerImageContainer}>
          <Image source={Images.googleIcon} style={styles.footerImage} />
        </TouchableHighlight>
      </VView>
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  footerImageContainer: {
    marginRight: 16,
    borderRadius: 20,
  },
  bodyContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBoxStyle: {
    height: 100,
    width: 100,
  },
  emptyClosetText: {
    marginTop: 16,
    fontSize: 15,
  },
  footerContainer: {
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 16,
  },
  footerImage: {
    height: 44,
    width: 44,
  },
  lineArrowStyle: {
    height: 131,
    width: 27,
  },
});
