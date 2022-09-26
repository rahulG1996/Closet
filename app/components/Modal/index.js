/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../colors';
import {FONTS_SIZES} from '../../fonts';
import VText from '../Text';
import VView from '../View';

const VModal = props => {
  return (
    <Modal
      backdropColor={Colors.black16}
      coverScreen
      isVisible={true}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <VView
        style={{
          backgroundColor: Colors.white,
          flex: 0.4,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
        }}>
        <VView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <VText
            text={props?.screenName}
            style={{
              fontSize: FONTS_SIZES.s3,
              fontWeight: '700',
            }}
          />
          <Image
            source={require('../../assets/cross_circle.webp')}
            style={{
              height: 44,
              width: 44,
            }}
            resizeMode="contain"
          />
        </VView>
        {props?.children}
      </VView>
    </Modal>
  );
};

export default VModal;

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: '#000000',
  },
});
