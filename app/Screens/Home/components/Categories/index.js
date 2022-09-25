import React from 'react';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../../colors';
import {VText, VView} from '../../../../components';
import {FONTS_SIZES} from '../../../../fonts';

const Categories = props => {
  const renderCategory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: Colors.grey1, marginLeft: 16}}
        onPress={() => props.navigation.navigate('ViewProduct')}>
        <Image
          source={require('../../../../assets/sweatshirt.webp')}
          style={{height: 192, width: 128}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <VView sty>
      <VView style={styles.headingContainer}>
        <VText text="Category Name" style={styles.headingLeftText} />
        <TouchableOpacity>
          <VText text="VIEW ALL" />
        </TouchableOpacity>
      </VView>
      <FlatList data={[1, 2, 3, 4, 5]} horizontal renderItem={renderCategory} />
    </VView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    alignItem: 'center',
    marginHorizontal: 16,
  },
  headingLeftText: {
    fontSize: FONTS_SIZES.s3,
    fontWeight: '700',
  },
});
