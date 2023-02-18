import React from 'react';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../../colors';
import {VText, VView} from '../../../../components';
import {FONTS_SIZES} from '../../../../fonts';

const Categories = props => {
  const {categoryName = '', subCategory = []} = props.data || {};
  const renderCategory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: Colors.grey1, marginLeft: 16}}
        onPress={() => props.navigation.navigate('ViewProduct')}>
        <Image
          source={{uri: item.subCategoryImage}}
          style={{height: 192, width: 128}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <VView>
      <VView style={styles.headingContainer}>
        <VText text={categoryName} style={styles.headingLeftText} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CategoryScreen')}>
          <VText text="VIEW ALL" />
        </TouchableOpacity>
      </VView>
      <FlatList data={subCategory} horizontal renderItem={renderCategory} />
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
