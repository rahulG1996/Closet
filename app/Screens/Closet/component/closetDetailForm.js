/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  VView,
  VText,
  Buttons,
  Header,
  BigImage,
  OverlayModal,
} from '../../../components';
import {Colors} from '../../../colors';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDataInCloset,
  editDataInCloset,
  getClosetData,
} from '../../../redux/actions/closetAction';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ColorPicker from 'react-native-wheel-color-picker';

let gPicker = '';
const ClosetDetailsFrom = props => {
  const dispatch = useDispatch();
  const [bgImageUrl, setBgImag] = useState(
    props?.route?.params?.imgSource?.path,
  );
  const [currentColor, setCurrentColor] = useState('');
  const [swatchesOnly, setSwatchesOnly] = useState('');

  const [swatchesLast, setSwatchesLast] = useState(true);
  const [swatchesEnabled, setSwatchesEnabled] = useState('');
  const [disc, setDisc] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [getColor, setGetColor] = useState('#fff');
  const [showModal, setShowModal] = useState(false);
  const [selectedSeason, setSeason] = useState('');
  const brandData = useSelector(state => state.ClosetReducer.brandData);
  const categoryData = useSelector(state => state.ClosetReducer.categoryData);
  const userId = useSelector(state => state.AuthReducer.userId);

  const addClosetResponse = useSelector(
    state => state.ClosetReducer.addClosetResponse,
  );
  const editClosetResponse = useSelector(
    state => state.ClosetReducer.editClosetResponse,
  );

  const [state, setState] = useState({
    brandDataUpdated: [],
    brandSelected: '',
    categoryDataUpdated: [],
  });

  console.warn(
    'props',
    JSON.stringify(
      {
        name: props?.route?.params?.editClosetData?.brandName,
        id: props?.route?.params?.editClosetData?.brandId,
      },
      undefined,
      2,
    ),
  );

  useEffect(() => {
    if (props?.route?.params?.editClosetData) {
      setSeason(props?.route?.params?.editClosetData?.season);
      let brandSelected1 = {
        name: props?.route?.params?.editClosetData?.brandName,
        id: props?.route?.params?.editClosetData?.brandId,
      };
      let categorySelected1 = {
        name:
          props?.route?.params?.editClosetData?.categoryName +
          ' --> ' +
          props?.route?.params?.editClosetData?.subCategoryName,
        id: `${props?.route?.params?.editClosetData?.categoryId} ${props?.route?.params?.editClosetData?.subCategoryId}`,
      };
      setBgImag(props?.route?.params?.editClosetData?.itemImageUrl);
      console.warn('@@@@', categorySelected1, brandSelected1);
      setState({
        ...state,
        brandSelected: brandSelected1,
        categorySelected: categorySelected1,
      });
    }
  }, []);

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
    if (Object.keys(editClosetResponse).length) {
      if (editClosetResponse.statusCode === 200) {
        dispatch({type: 'EDIT_CLOSET', value: {}});
        Toast.show('Closet Information edit successfully');
        props.navigation.navigate('ClosetInfo', {
          apiData: editClosetResponse,
        });
      }
    }
  }, [editClosetResponse, dispatch]);

  useEffect(() => {
    let brandSelected1 = {};
    let categorySelected1;
    if (props?.route?.params?.editClosetData) {
      setSeason(props?.route?.params?.editClosetData?.season);
      brandSelected1 = {
        name: props?.route?.params?.editClosetData?.brandName,
        id: props?.route?.params?.editClosetData?.brandId,
      };
      categorySelected1 = {
        name:
          props?.route?.params?.editClosetData?.categoryName +
          ' --> ' +
          props?.route?.params?.editClosetData?.subCategoryName,
        id: `${props?.route?.params?.editClosetData?.categoryId} ${props?.route?.params?.editClosetData?.subCategoryId}`,
      };
      setBgImag(props?.route?.params?.editClosetData?.itemImageUrl);
      console.warn('@@@@', categorySelected1, brandSelected1);
    }
    let items = brandData.map(item => {
      return {
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
      brandSelected: brandSelected1,
      categorySelected: categorySelected1,
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
      colorCode: JSON.stringify(selectedColors),
      itemImageUrl: props?.route?.params?.editCloset
        ? bgImageUrl
        : `data:image/jpeg;base64,${props?.route?.params?.imgSource?.data}`,
    };
    console.warn('data', data);
    if (props?.route?.params?.editCloset) {
      data.closetItemId = props.route?.params.editClosetData?.closetItemId;
      dispatch(editDataInCloset(data));
      return;
    }
    dispatch(addDataInCloset(data));
  };

  console.warn(state.brandSelected, state.categorySelected);

  const onColorChange = clr => {
    //     setCurrentColor
    // setSwatchesOnly
    console.log('changed color', clr);
  };

  const onColorSelect = clr => {
    setGetColor(clr);
  };

  const renderColorPalette = () => {
    return (
      <VView style={{}}>
        <ColorPicker
          color={currentColor}
          swatchesOnly={swatchesOnly}
          onColorChange={onColorChange}
          onColorChangeComplete={onColorSelect}
          noSnap={false}
          row={true}
          vertical={false}
          swatchesLast={swatchesLast}
          swatches={swatchesEnabled}
          discrete={disc}
          sliderHidden={true}
        />
        <VView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <VText text="Selected Color" />
          <VView
            style={{
              paddingVertical: 14,
              backgroundColor: getColor,
              marginLeft: 10,
              borderWidth: 1,
              borderColor: Colors.greyBorder,
              borderRadius: 5,
              width: 50,
            }}
          />
        </VView>
        <Buttons
          text="Add Color"
          // isInverse
          onPress={() => {
            let checkColorExist = selectedColors.includes(getColor);
            if (!checkColorExist) {
              setSelectedColors(oldArray => [...oldArray, getColor]);
              setShowModal(false);
              setGetColor('');
            } else {
              Toast.show('Color already added');
            }
          }}
        />
      </VView>
    );
  };
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <VView>
        <Header {...props} showBack />
      </VView>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <BigImage imgSource={bgImageUrl} />
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
              {['spring', 'summer', 'fall', 'winter'].map((item, index) => {
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
                    <VText style={{textTransform: 'capitalize'}} text={item} />
                  </TouchableOpacity>
                );
              })}
            </VView>
            <VView style={{marginVertical: 16}}>
              <VText
                text="Color"
                style={{
                  marginBottom: 8,
                }}
              />
              <VView
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {selectedColors?.map((colr, index) => {
                  return (
                    <VView
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: colr,
                        marginRight: 8,
                        marginBottom: 8,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: Colors.greyBorder,
                      }}
                    />
                  );
                })}

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setShowModal(true)}>
                  <Image
                    source={require('../../../assets/color.png')}
                    style={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              </VView>
            </VView>
            <Buttons text="Add" onPress={addCloset} />
          </VView>
        </VView>
      </KeyboardAwareScrollView>
      <OverlayModal showModal={showModal} component={renderColorPalette()} />
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
