import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components';
import {
  getFilterCloset,
  openClosetDetails,
} from '../../redux/actions/closetAction';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../colors';
import {ScrollView} from 'react-native-gesture-handler';

const ClosetFilter = props => {
  const dispatch = useDispatch();
  const getFilterClosetResponse =
    useSelector(state => state.ClosetReducer.getFilterClosetResponse) || [];
  const userId = useSelector(state => state.AuthReducer.userId);

  useEffect(() => {
    dispatch(getFilterCloset(props?.route?.params?.filterData));
  }, []);

  const openClosetInfo = id => {
    let data = {
      userId: userId,
      closetItemId: id,
    };
    dispatch(openClosetDetails(data));
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {getFilterClosetResponse?.length > 0 ? (
            getFilterClosetResponse.map(item => {
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
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                borderWidth: 2,
              }}>
              <Text>No Data Found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ClosetFilter;
