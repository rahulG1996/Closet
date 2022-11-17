import React, {useState} from 'react';
import {Image, Touchable, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header} from '../../components';

const EditCloset = props => {
  const [isImageEdit, setImageEdit] = useState(false);
  const [newImage, setImage] = useState(null);
  const editTools = [
    {
      type: 'crop',
      icon: require('../../assets/crop.png'),
    },
    {
      type: 'rotate',
      icon: require('../../assets/rotate.png'),
    },
    {
      type: 'crop',
      icon: require('../../assets/erase.png'),
    },
    {
      type: 'crop',
      icon: require('../../assets/adjust.png'),
    },
  ];

  const editImage = type => {
    if (type === 'crop') {
      ImageCropPicker.openCropper({
        path: isImageEdit ? newImage : props?.route?.params?.imgSource,
        width: 300,
        height: 400,
      }).then(image => {
        setImageEdit(true);
        setImage(image.path);
        console.log(image);
      });
    }
    if (type === 'rotate') {
      ImageCropPicker.openCropper({
        path: isImageEdit ? newImage : props?.route?.params?.imgSource,
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then(image => {
        setImageEdit(true);
        setImage(image.path);
        console.log(image);
      });
    }
  };

  console.log('edit', props?.route?.params?.imgSource?.data);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <View style={{flex: 1}}>
        <BigImage
          imgSource={
            isImageEdit ? newImage : props?.route?.params?.imgSource?.path
          }
        />
        <View style={{paddingHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 16,
            }}>
            {editTools.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => editImage(item.type)}
                  style={{padding: 28, backgroundColor: Colors.grey1}}>
                  <Image source={item.icon} style={{width: 24, height: 24}} />
                </TouchableOpacity>
              );
            })}
          </View>
          <Buttons
            text="next"
            onPress={() =>
              props.navigation.navigate('ClosetDetailsFrom', {
                imgSource: isImageEdit
                  ? newImage
                  : props?.route?.params?.imgSource,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default EditCloset;
