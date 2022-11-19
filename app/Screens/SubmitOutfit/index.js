import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header, Input} from '../../components';
import {addOutfit, getOutfitsList} from '../../redux/actions/outfitActions';

const SubmitOutfit = props => {
  const [outfitName, setOutfitName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const [selectedSeason, setSeason] = useState([]);
  const userId = useSelector(state => state.AuthReducer.userId);
  const [nameErr, setNameError] = useState('');
  const [descriptionErr, setDescErr] = useState('');
  const [loading, setLoading] = useState(false);

  const addOutfitReponse = useSelector(
    state => state.OutfitReducer.addOutfitReponse,
  );

  useEffect(() => {
    if (props?.route?.params?.editOutfitData) {
      setOutfitName(props?.route?.params?.editOutfitData?.name);
      setDescription(props?.route?.params?.editOutfitData?.description);
      setSeason(props?.route?.params?.editOutfitData?.seasons);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(addOutfitReponse).length) {
      dispatch({type: 'ADD_OUTFIT', value: {}});
      if (addOutfitReponse.statusCode === 200) {
        Toast.show('Outfit added successfully');
        dispatch(getOutfitsList());
        setLoading(false);
        props.navigation.navigate('Outfits');
      } else {
        setLoading(false);
      }
    }
  }, [addOutfitReponse, dispatch]);

  const setSeasonData = item => {
    let selectedSeason1 = [...selectedSeason];
    if (!selectedSeason.includes(item)) {
      selectedSeason1.push(item);
    } else {
      selectedSeason1 = selectedSeason1.filter(i => i !== item);
    }

    setSeason(selectedSeason1);
  };

  const addOutfitData = () => {
    if (!outfitName) {
      setNameError('Please enter outfit name');
      return;
    }
    if (!description) {
      setDescErr('Please enter outfit description');
      return;
    }
    if (!selectedSeason.length) {
      Toast.show('Please select season');
      return;
    }
    let data = {
      userId: userId,
      closetItemIds: props?.route?.params?.outfitData?.closetIds,
      outfitImageType: props?.route?.params?.outfitData?.imgSource?.data,
      name: outfitName,
      description: description,
      seasons: selectedSeason,
      imageData: props?.route?.params?.outfitData?.imageData,
    };
    setLoading(true);
    dispatch(addOutfit(data));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <BigImage
          imgSource={
            props?.route?.params?.editoutfit
              ? props?.route?.params?.editOutfitData?.outfitImageType
              : props?.route?.params?.outfitData?.imgSource?.data
          }
          showEdit={props?.route?.params?.editOutfitData?.outfitImageType}
          editImage={() =>
            props.navigation.navigate('AddOutfit', {
              editOutfitData: props?.route?.params?.editOutfitData,
              editoutfit: true,
            })
          }
        />
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.headingStyle}>Name</Text>
          <Input
            placeholder="Name"
            onChangeText={e => {
              setOutfitName(e);
              setNameError('');
            }}
            value={outfitName}
            errorText={nameErr}
          />
          <Text style={styles.headingStyle}>Description</Text>
          <Input
            placeholder="Description"
            errorText={descriptionErr}
            onChangeText={e => {
              setDescription(e);
              setDescErr('');
            }}
            value={description}
          />
          <Text style={styles.headingStyle}>Season</Text>
          <View style={{flexDirection: 'row'}}>
            {['spring', 'summer', 'fall', 'winter'].map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSeasonData(item)}
                  style={[
                    styles.seasonContainer,
                    {
                      borderColor: selectedSeason.includes(item)
                        ? Colors.black60
                        : 'rgba(0,0,0,0.16)',
                    },
                  ]}>
                  <Text style={{textTransform: 'capitalize'}}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{marginTop: 12, marginBottom: 30}}>
            <Buttons text="Add" onPress={addOutfitData} loading={loading} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SubmitOutfit;

const styles = StyleSheet.create({
  headingStyle: {
    marginTop: 16,
  },
  seasonContainer: {
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderColor: 'rgba(0,0,0,0.16)',
    marginTop: 8,
  },
});
