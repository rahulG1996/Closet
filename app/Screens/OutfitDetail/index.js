import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../colors';
import {BigImage, Buttons, Header, Input, OverlayModal} from '../../components';
import Modal from 'react-native-modal';

const OutfitDetail = props => {
  const [showModal, setModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const openMenu = () => {
    setModal(true);
  };
  const renderItem = (item, index) => {
    return (
      <View
        style={{
          marginBottom: 16,
          alignSelf: 'center',
          flex: 0.5,
          marginHorizontal: 8,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.grey1,
            paddingVertical: 10,
            paddingHorizontal: 13,
            width: '100%',
            alignSelf: 'center',
            marginBottom: 8,
          }}>
          <Image
            source={require('../../assets/sweatshirt.webp')}
            style={{
              height: 140,
              width: 100,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const deleteCloset = () => {
    setModal(false);
    setTimeout(() => {
      setDeleteModal(true);
    }, 400);
  };
  const renderMenu = () => {
    return (
      <View>
        <Buttons
          text="Edit"
          isInverse
          //   onPress={() => {
          //     setModal(false);
          //     props.navigation.navigate('ClosetDetailsFrom', {
          //       editClosetData: props.route?.params?.apiData,
          //       editCloset: true,
          //     });
          //   }}
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
    // dispatch(
    //   deleteClosetData({
    //     userId: userId,
    //     closetItemId: props.route?.params?.apiData?.closetItemId,
    //   }),
    // );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header showBack showVerticalMenu {...props} openMenu={openMenu} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <BigImage />
        <View style={{padding: 16}}>
          <Text style={styles.titleStyle}>Name</Text>
          <Text style={styles.subitleStyle}>Name</Text>
          <Text style={styles.titleStyle}>Description</Text>
          <Text style={styles.subitleStyle}>Description</Text>

          <Text style={styles.titleStyle}>Season</Text>
          <Text style={styles.subitleStyle}>season</Text>
          <Text style={styles.titleStyle}>Clothes in this outfit</Text>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => renderItem(item, index)}
            contentContainerStyle={{
              paddingVertical: 16,
              paddingHorizontal: 8,
              paddingBottom: 100,
            }}
          />
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OutfitDetail;

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
              Are you sure you want to remove this from your outfits?
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
  subitleStyle: {
    color: Colors.black60,
    marginTop: 8,
    marginBottom: 16,
  },
});
