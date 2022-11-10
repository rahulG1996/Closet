import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Header, VText, VView} from '../../components';
import {Images} from '../../assets';
// import PhotoEditor from 'react-native-photo-editor';

export default props => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setSelectedImage('');
  }, []);
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      props.navigation.navigate('ClosetDetailsFrom');
      // PhotoEditor.Edit({
      //   path: image?.path,
      // });
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
      props.navigation.navigate('ClosetDetailsFrom');
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
  return (
    <VView style={styles.container}>
      <Header title="Closet" showMenu />

      {/* <VView style={{flex: 1, backgroundColor: 'green'}}> */}
      {/* {selectedImage ? (
        <VView>
          <Image
            source={{uri: selectedImage}}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </VView>
      ) : ( */}
      {emptyScreen()}
      {/* )} */}
      {/* </VView> */}
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
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
