import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header, OverlayModal} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {
  deleteClosetData,
  getClosetData,
} from '../../redux/actions/closetAction';

const ClosetInfo = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.AuthReducer.userId);
  const deleteClosetResponse = useSelector(
    state => state.ClosetReducer.deleteClosetResponse,
  );
  const [activeOutfit, setActiveOutfit] = useState(true);
  const [showModal, setModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const openMenu = () => {
    setModal(true);
  };

  useEffect(() => {
    if (Object.keys(deleteClosetResponse).length) {
      if (deleteClosetResponse.statusCode === 200) {
        dispatch({type: 'DELETE_CLOSET', value: {}});
        Toast.show('Closet Removed Successfuly');
        props.navigation.navigate('ClosetScreen');
        dispatch(getClosetData());
      }
    }
  }, [deleteClosetResponse, dispatch]);

  const renderMenu = () => {
    return (
      <View>
        <Buttons
          text="Edit"
          isInverse
          onPress={() => {
            setModal(false);
            props.navigation.navigate('ClosetDetailsFrom', {
              editClosetData: props.route?.params?.apiData,
              editCloset: true,
            });
          }}
        />
        <Buttons
          text="remove"
          isInverse
          textColor="red"
          onPress={deleteCloset}
        />
        <Buttons
          text="Cancel"
          isInverse
          noBorder
          onPress={() => setModal(false)}
        />
      </View>
    );
  };

  const removeCloset = () => {
    setDeleteModal(false);
    dispatch(
      deleteClosetData({
        userId: userId,
        closetItemId: props.route?.params?.apiData?.closetItemId,
      }),
    );
  };

  const deleteCloset = () => {
    setModal(false);
    setTimeout(() => {
      setDeleteModal(true);
    }, 400);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack {...props} showVerticalMenu openMenu={openMenu} />
      <ScrollView>
        <View>
          <View style={{alignItems: 'center'}}>
            <BigImage imgSource={props.route?.params?.apiData?.itemImageUrl} />
          </View>
          <View style={{paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setActiveOutfit(true)}
                style={[
                  styles.tabStyle,
                  {
                    borderBottomColor: activeOutfit
                      ? Colors.black60
                      : 'transparent',
                  },
                ]}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Outfits
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveOutfit(false)}
                style={[
                  styles.tabStyle,
                  {
                    borderBottomColor: !activeOutfit
                      ? Colors.black60
                      : 'transparent',
                  },
                ]}>
                <Text style={{fontSize: FONTS_SIZES.s3, fontWeight: 'bold'}}>
                  Information
                </Text>
              </TouchableOpacity>
            </View>
            {activeOutfit ? (
              <View style={[styles.dataContainer, {alignItems: 'center'}]}>
                <Image
                  source={require('../../assets/iOutfit.png')}
                  style={{width: 87, height: 87}}
                />
                <Text style={{textAlign: 'center', paddingVertical: 20}}>
                  No Outfit created with this cloth
                </Text>
              </View>
            ) : (
              <View style={styles.dataContainer}>
                <Text style={styles.titleStyle}>Category</Text>
                <Text style={styles.subitleStyle}>
                  {props.route?.params?.apiData?.categoryName}
                </Text>
                <Text style={styles.titleStyle}>Sub Category</Text>
                <Text style={styles.subitleStyle}>
                  {props.route?.params?.apiData?.subCategoryName}
                </Text>
                <Text style={styles.titleStyle}>Brand</Text>
                <Text style={styles.subitleStyle}>
                  {props.route?.params?.apiData?.brandName}
                </Text>
                <Text style={styles.titleStyle}>Season</Text>
                <Text style={styles.subitleStyle}>
                  {props.route?.params?.apiData?.season}
                </Text>
                <Text style={styles.titleStyle}>Color</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {props.route?.params?.apiData?.colorCode.map(item => {
                    return (
                      <View
                        style={{
                          backgroundColor: item,
                          width: 40,
                          height: 40,
                          marginTop: 8,
                          marginRight: 8,
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            )}

            <Buttons
              text="Create Outfit"
              onPress={() => props.navigation.navigate('AddOutfit')}
            />
          </View>
        </View>
        {showModal && (
          <OverlayModal showModal={showModal} component={renderMenu()} />
        )}
        {showDeleteModal && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            cancelModal={() => setDeleteModal(false)}
            deleteCloset={removeCloset}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ClosetInfo;

const styles = StyleSheet.create({
  tabStyle: {
    width: '50%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  dataContainer: {
    marginVertical: 20,
  },
  titleStyle: {},
  subitleStyle: {
    color: Colors.black60,
    marginTop: 8,
    marginBottom: 16,
  },
});

const DeleteModal = ({
  showDeleteModal = false,
  cancelModal = false,
  deleteCloset = () => {},
}) => {
  return (
    <View>
      <Modal
        animationIn="fadeInUpBig"
        avoidKeyboard
        animationInTiming={400}
        animationOutTiming={900}
        isVisible={showDeleteModal}
        style={{
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            width: Dimensions.get('window').width - 100,
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 24,
                paddingHorizontal: 16,
              }}>
              Are you sure you want to remove this from your closet?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderTopColor: '#00000029',
              }}>
              <TouchableOpacity
                style={{width: '50%', paddingVertical: 16}}
                onPress={deleteCloset}>
                <Text style={{color: 'red', textAlign: 'center'}}>REMOVE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cancelModal}
                style={{width: '50%', paddingVertical: 16}}>
                <Text style={{textAlign: 'center'}}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
