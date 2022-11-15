import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {VView, VText, Buttons, Header, BigImage} from '../../../components';
import {Colors} from '../../../colors';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDataInCloset,
  getClosetData,
} from '../../../redux/actions/closetAction';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ClosetDetailsFrom = props => {
  const dispatch = useDispatch();
  const [selectedSeason, setSeason] = useState('');
  const brandData = useSelector(state => state.ClosetReducer.brandData);
  const categoryData = useSelector(state => state.ClosetReducer.categoryData);
  const userId = useSelector(state => state.AuthReducer.userId);
  const addClosetResponse = useSelector(
    state => state.ClosetReducer.addClosetResponse,
  );
  const [state, setState] = useState({
    brandDataUpdated: [],
    brandSelected: '',
    categoryDataUpdated: [],
  });

  useEffect(() => {
    if (Object.keys(addClosetResponse).length) {
      if (addClosetResponse.statusCode == 200) {
        dispatch({type: 'ADD_TO_CLOSET', value: {}});
        Toast.show('Closet added successfully');
        dispatch(getClosetData());
        props.navigation.navigate('ClosetScreen');
      }
    }
  }, [addClosetResponse, dispatch, props.navigation]);

  useEffect(() => {
    let items = brandData.map(item => {
      return {
        ...item,
        name: item.brandName,
        id: item.brandId,
      };
    });
    let groupedData = categoryData.flatMap(el =>
      el.subCategory.map(proj => ({
        name: el.categoryName + ' --> ' + proj.subCategoryName,
        id: el.categoryId + ' ' + proj.subCategoryId,
      })),
    );
    setState({
      ...state,
      brandDataUpdated: items,
      categoryDataUpdated: groupedData,
    });
  }, []);

  const addCloset = () => {
    let {brandSelected, categorySelected} = state;
    if (!brandSelected) {
      Toast.show('Please select Brand from given options');
      return;
    }
    if (!categorySelected) {
      Toast.show('Please select Category from given options');
      return;
    }
    if (!selectedSeason) {
      Toast.show('Please select seasons');
      return;
    }
    if (categorySelected && !categorySelected?.id) {
      Toast.show('Please select Category from given options');
      return;
    }
    if (brandSelected && !brandSelected?.id) {
      Toast.show('Please select Category from given options');
      return;
    }
    categorySelected = categorySelected.id.split(' ');

    let data = {
      userId: userId,
      categoryId: categorySelected[0],
      subCategoryId: categorySelected[1],
      brandId: state.brandSelected?.id,
      season: selectedSeason,
      colorCode: '#111111',
      itemImageUrl: `data:image/jpeg;base64,${props?.route?.params?.imgSource?.data}`,
    };
    dispatch(addDataInCloset(data));
  };

  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <VView>
        <Header {...props} showBack />
      </VView>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <BigImage imgSource={props?.route?.params?.imgSource?.path} />
        <VView style={{padding: 16}}>
          <VView>
            <VText text="Category" />
            <SearchableDropdown
              onTextChange={text =>
                setState({...state, categorySelected: text})
              }
              onItemSelect={item =>
                setState({...state, categorySelected: item})
              }
              containerStyle={styles.dropDownContainer}
              textInputStyle={styles.inputContainer}
              textInputProps={{value: state.categorySelected?.name}}
              itemStyle={styles.searchItemContainer}
              itemTextStyle={{
                color: '#222',
              }}
              itemsContainerStyle={{
                maxHeight: '60%',
              }}
              items={state.categoryDataUpdated}
              defaultIndex={2}
              placeholder="Tops, Pants, Shorts..."
              resPtValue={false}
              underlineColorAndroid="transparent"
            />
            <VText text="Brand" />
            <SearchableDropdown
              onTextChange={text =>
                setState({...state, brandSelected: text.name})
              }
              onItemSelect={item => setState({...state, brandSelected: item})}
              containerStyle={styles.dropDownContainer}
              textInputStyle={styles.inputContainer}
              textInputProps={{value: state.brandSelected?.name}}
              itemStyle={styles.searchItemContainer}
              itemTextStyle={{
                color: '#222',
              }}
              itemsContainerStyle={{
                maxHeight: '60%',
              }}
              items={state.brandDataUpdated}
              defaultIndex={2}
              placeholder="Tops, Pants, Shorts..."
              resPtValue={false}
              underlineColorAndroid="transparent"
            />

            <VText text="Season" />
            <VView style={{flexDirection: 'row'}}>
              {['Spring', 'Summer', 'Fall', 'Winter'].map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSeason(item)}
                    style={[
                      styles.seasonContainer,
                      {
                        borderColor:
                          item === selectedSeason
                            ? Colors.black60
                            : 'rgba(0,0,0,0.16)',
                      },
                    ]}>
                    <VText text={item} />
                  </TouchableOpacity>
                );
              })}
            </VView>
            <Buttons text="Add" onPress={addCloset} />
          </VView>
        </VView>
      </KeyboardAwareScrollView>
    </VView>
  );
};

export default ClosetDetailsFrom;

const styles = StyleSheet.create({
  seasonContainer: {
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderColor: 'rgba(0,0,0,0.16)',
    marginTop: 8,
  },
  dropDownContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.grey1,
    height: 350,
  },
  inputContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
  },
  searchItemContainer: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#bbb',
    borderWidth: 1,
  },
});
