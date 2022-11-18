import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Buttons, Header, VText, VView} from '../../components';
import {Images} from '../../assets';
import {Colors} from '../../colors';
import {useDispatch, useSelector} from 'react-redux';
import PhotoEditor from 'react-native-photo-editor';
import {openClosetDetails} from '../../redux/actions/closetAction';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import WebView from 'react-native-webview';
import ViewShot, {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';

export default props => {
  const dispatch = useDispatch();
  const captureViewRef = useRef();
  const [showWebView, setWebView] = useState(false);
  const [gridType, setGrid] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const getcloset = useSelector(state => state.ClosetReducer.getcloset);
  const [gridClosetData, setGridClosetData] = useState([]);

  const userId = useSelector(state => state.AuthReducer.userId);
  const [filterClosetData, setFilterClosetData] = useState(getcloset);

  const categoryData = useSelector(state => state.ClosetReducer.categoryData);

  const singleClosetReponse = useSelector(
    state => state.ClosetReducer.singleClosetReponse,
  );

  useEffect(() => {
    if (Object.keys(singleClosetReponse).length) {
      dispatch({type: 'SINGLE_CLOSET', value: {}});
      props.navigation.navigate('ClosetInfo', {
        apiData: singleClosetReponse,
      });
    }
  }, [dispatch, props.navigation, singleClosetReponse]);

  useEffect(() => {
    if (!gridType) {
      let categoryArray = [
        ...new Set(getcloset.map(item => item.categoryName)),
      ];

      let finalArray = [];

      for (let i = 0; i < categoryArray.length; i++) {
        let tempArray = [];
        for (let j = 0; j < getcloset.length; j++) {
          if (getcloset[j].categoryName === categoryArray[i]) {
            tempArray.push(getcloset[j]);
          }
        }
        finalArray.push({
          total: tempArray.length,
          category: categoryArray[i],
          subCategory: tempArray,
        });
        setGridClosetData(finalArray);
      }
    }
  }, [getcloset, gridType]);

  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(img => {
      props.navigation.navigate('EditCloset');
      props.navigation.navigate('EditCloset', {
        imgSource: img,
      });
    });
  };

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(img => {
      console.warn('comp', JSON.stringify(img.path, undefined, 2));
      props.navigation.navigate('EditCloset', {
        imgSource: img,
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
        {gridClosetData.length
          ? gridClosetData.map(item => {
              return (
                <TouchableOpacity
                  style={{marginVertical: 8}}
                  onPress={() =>
                    props.navigation.navigate('ClosetCategory', {
                      categoryType: item,
                    })
                  }>
                  <View
                    style={{
                      width: 160,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    {item.subCategory.length !== 0 &&
                      [1, 2, 3, 4].map((i, index) => {
                        return (
                          <View
                            style={{
                              width: '45%',
                              height: 80,
                              backgroundColor: Colors.grey1,
                              margin: 2,
                            }}>
                            <Image
                              source={{
                                uri: item.subCategory[index]?.itemImageUrl,
                              }}
                              style={{width: '95%', height: '95%'}}
                            />
                          </View>
                        );
                      })}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{marginTop: 8}}>{item.category}</Text>
                    <Text style={{marginTop: 8}}>{item.total}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
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

  useEffect(() => {
    if (activeTab) {
      if (activeTab !== 'All') {
        let filterData = getcloset;
        filterData = getcloset.filter(item => {
          if (item.categoryName === activeTab) {
            return {...item};
          }
        });
        setFilterClosetData(filterData);
      } else {
        setFilterClosetData(getcloset);
      }
    }
  }, [activeTab, getcloset]);

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
          {filterClosetData.length > 0 ? (
            filterClosetData.map(item => {
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
                  onPress={() => openClosetInfo(item.closetItemId)}>
                  <Image
                    source={{uri: item.itemImageUrl}}
                    style={{width: 150, height: 140}}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text>No Data Found</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const openClosetInfo = id => {
    let data = {
      userId: userId,
      closetItemId: id,
    };
    dispatch(openClosetDetails(data));
  };

  const onCapture = () => {
    captureRef(captureViewRef, {
      format: 'jpeg',
      quality: 0.9,
    }).then(
      uri => {
        RNFS.readFile(uri, 'base64').then(res => {
          props.navigation.navigate('EditCloset', {
            imgSource: {data: res, path: uri},
            from: 'google',
          });
          setWebView(false);
          console.warn('urlString', uri);
        });

        // console.warn(uri);
      },
      error => alert('Oops, snapshot failed', error),
    );
  };

  return (
    <VView style={styles.container}>
      <Header
        title="Closet"
        showMenu
        navigation={props.navigation}
        showSwitch
        switchValue={switchValue}
      />
      {getcloset.length === 0 ? (
        emptyScreen()
      ) : (
        <ScrollView style={{}}>
          {gridType ? lisSectionGrid() : listGrid()}
        </ScrollView>
      )}

      {showWebView ? (
        <View
          style={{
            margin: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: '45%',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingVertical: 20,
            }}
            onPress={onCapture}>
            <Text style={{color: 'white', textTransform: 'uppercase'}}>
              Add to Closet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setWebView(false)}
            style={{
              width: '45%',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingVertical: 20,
            }}>
            <Text style={{color: 'white', textTransform: 'uppercase'}}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
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
            onPress={() => setWebView(true)}
            style={styles.footerImageContainer}>
            <Image source={Images.googleIcon} style={styles.footerImage} />
          </TouchableHighlight>
        </VView>
      )}
      {showWebView && (
        <View
          ref={captureViewRef}
          style={{
            height: '90%',
            position: 'absolute',
            zIndex: 999,
            width: '100%',
          }}>
          <WebView
            automaticallyAdjustContentInsets={false}
            source={{
              uri: 'https://www.google.co.in/',
            }}
          />
        </View>
      )}
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    zIndex: -999,
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
