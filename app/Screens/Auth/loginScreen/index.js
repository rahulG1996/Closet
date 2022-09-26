import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {VView, VText} from '../../../components';
import Modal from 'react-native-modal';
import {Colors} from '../../../colors';
import {FONTS_SIZES} from '../../../fonts';
import VModal from '../../../components/Modal';

export default (props) => {
  return (
    <VModal 
    screenName="Login"
    handleCross={}
    >
      <VView
        style={{
          backgroundColor: 'green',
        }}>
        <VText text="hellloool" />
      </VView>
    </VModal>
  );
};
