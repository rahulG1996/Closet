import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../../colors';
import {Buttons, Input} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileSetup = props => {
  const [state, setState] = useState({
    page1: true,
    page2: false,
    page3: false,
    currentActiveTab: 0,
    genderData: [{type: 'Male'}, {type: 'Female'}, {type: 'Other'}],
    genderSelected: '',
    userImage: '',
  });

  const selectGeneder = (item, index) => {
    setState({...state, genderSelected: item.type, genderErr: ''});
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.warn(image);
      setState({...state, userImage: image.path});
    });
  };

  const handleName = () => {
    let {name, nameError} = state;
    if (!name) {
      nameError = 'Please enter your name';
      setState({...state, nameError});
    } else {
      setState({...state, currentActiveTab: 1, page2: true});
    }
  };

  const handleGender = () => {
    let {genderSelected, genderErr} = state;
    if (!genderSelected) {
      setState({...state, genderErr: '*Please Select your gender'});
    } else {
      setState({...state, currentActiveTab: 2, page3: true});
    }
  };

  return (
    <View style={{padding: 16, flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
          style={{
            width: 100,
            borderWidth: 1,
            borderColor: state.page1 ? Colors.black : Colors.greyBorder,
          }}
        />
        <View
          style={{
            width: 100,
            borderWidth: 1,
            marginHorizontal: 16,
            borderColor: state.page2 ? Colors.black : Colors.greyBorder,
          }}
        />
        <View
          style={{
            width: 100,
            borderWidth: 1,
            borderColor: state.page3 ? Colors.black : Colors.greyBorder,
          }}
        />
      </View>
      {state.currentActiveTab === 0 ? (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 40,
                marginBottom: 8,
              }}>
              What’s your name?
            </Text>
            <Input
              placeholder="Name"
              errorText={state.nameError}
              onChangeText={e => setState({...state, name: e, nameError: ''})}
              value={state.name}
            />
            <Text style={{fontSize: 13}}>
              You can change this later in your profile settings
            </Text>
          </View>
          <View>
            <Buttons text="Next" onPress={handleName} />
          </View>
        </View>
      ) : state.currentActiveTab == 1 ? (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 40,
                marginBottom: 8,
              }}>
              What’s your gender?
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              {state.genderData.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 24,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderColor:
                        item.type === state.genderSelected
                          ? Colors.black
                          : Colors.greyBorder,
                      marginHorizontal: index == 1 && 8,
                    }}
                    onPress={() => selectGeneder(item, index)}>
                    <Text>{item.type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {state.genderErr && (
              <Text style={{color: 'red'}}>{state.genderErr}</Text>
            )}
            <Text style={{fontSize: 13, lineHeight: 20}}>
              Feeds will be prioritised based on your selected gender. You can
              change this later in your profile settings
            </Text>
          </View>
          <View>
            <Buttons text="Next" onPress={handleGender} />
            <Buttons
              text="go back"
              isInverse
              noBorder
              onPress={() =>
                setState({...state, currentActiveTab: 0, page2: false})
              }
            />
          </View>
        </View>
      ) : (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 40,
                marginBottom: 8,
              }}>
              Wanna upload your cool picture?
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            {state.userImage ? (
              <Image
                source={{uri: state.userImage}}
                style={{width: 128, height: 128, borderRadius: 64}}
              />
            ) : (
              <Image
                source={require('../../assets/iProfile.png')}
                style={{width: 128, height: 128}}
              />
            )}
          </View>
          <View>
            <Buttons
              text={state.userImage ? 'Dome' : 'upload'}
              onPress={pickImage}
            />
            <Buttons
              text="go back"
              isInverse
              noBorder
              onPress={() =>
                setState({...state, currentActiveTab: 1, page3: false})
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileSetup;
