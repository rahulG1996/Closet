import React from 'react';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../../colors';
import {VText, VView} from '../../../../components';
import {FONTS_SIZES} from '../../../../fonts';

const Categories = props => {
  const {categoryName = '', products = []} = props.data || {};

  const renderCategory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: Colors.grey1, marginLeft: 16}}
        onPress={() => props.getProductDetails(item.productId)}>
        <Image
          source={{uri: item.productImage}}
          style={{height: 192, width: 128}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <VView>
      <VView style={styles.headingContainer}>
        <VText text={categoryName} style={styles.headingLeftText} />
        <TouchableOpacity onPress={props.viewAll}>
          <VText text="VIEW ALL" />
        </TouchableOpacity>
      </VView>
      <FlatList data={products} horizontal renderItem={renderCategory} />
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
