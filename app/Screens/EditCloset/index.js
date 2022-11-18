import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
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
  ];

  const editImage = type => {
    if (type === 'crop') {
      ImageCropPicker.openCropper({
        path: isImageEdit
          ? newImage.path
          : props?.route?.params?.imgSource?.path,
        width: 300,
        height: 400,
      }).then(image => {
        setImageEdit(true);
        setImage(image);
        console.log(image);
      });
    }
    if (type === 'rotate') {
      ImageCropPicker.openCropper({
        path: isImageEdit
          ? newImage.path
          : props?.route?.params?.imgSource?.path,
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then(image => {
        setImageEdit(true);
        setImage(image);
        console.log(image);
      });
    }
  };

  console.log('edit', props?.route?.params?.imgSource?.data);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <ScrollView style={{flex: 1}}>
        <BigImage
          imgSource={
            isImageEdit ? newImage?.path : props?.route?.params?.imgSource?.path
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
                  style={{
                    flex: 1,
                    paddingVertical: 28,
                    backgroundColor: Colors.grey1,
                    alignItems: 'center',
                    marginHorizontal: 8,
                  }}>
                  <Image source={item.icon} style={{width: 24, height: 24}} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{marginBottom: 8}}>
            <Buttons
              text="remove background"
              isInverse
              onPress={() => alert('work in progress')}
            />
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
      </ScrollView>
    </View>
  );
};

export default EditCloset;
