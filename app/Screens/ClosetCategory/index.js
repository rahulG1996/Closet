import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../colors';
import {Header} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {openClosetDetails} from '../../redux/actions/closetAction';
import {FilterModal} from '../Closet';

const ClosetCategory = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.AuthReducer.userId);
  const singleClosetReponse = useSelector(
    state => state.ClosetReducer.singleClosetReponse,
  );
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    if (Object.keys(singleClosetReponse).length) {
      dispatch({type: 'SINGLE_CLOSET', value: {}});
      props.navigation.navigate('ClosetInfo', {
        apiData: singleClosetReponse,
      });
    }
  }, [dispatch, props.navigation, singleClosetReponse]);
  const openClosetInfo = id => {
    let data = {
      userId: userId,
      closetItemId: id,
    };
    dispatch(openClosetDetails(data));
  };

  const showFilterFunction = value => {
    setModal(true);
  };

  const setFilter = data => {
    setModal(false);
    let dataObj = {
      categoryIds: data.selectedCategory,
      subCategoryIds: data.selectedSubCategory,
      brandIds: data.selectedBrands,
      seasons: data.seasonData,
      colorCodes: data.colorsFilter,
      userId: userId,
    };
    props.navigation.navigate('ClosetFilter', {
      filterData: dataObj,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        showBack
        showFilter
        showFilterFunction={showFilterFunction}
        title={props?.route?.params?.categoryType?.category}
        {...props}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {props?.route?.params?.categoryType?.subCategory.map(item => {
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
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {
        <FilterModal
          from="closet"
          showModal={showModal}
          hideModal={() => setModal(false)}
          setFilter={setFilter}
        />
      }
    </View>
  );
};

export default ClosetCategory;
