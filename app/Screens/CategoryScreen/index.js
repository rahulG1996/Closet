import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {VView, Header} from '../../components';
import {
  getFilteredProducts,
  getProductDetailsApi,
} from '../../redux/actions/homeActions';
import {FilterModal} from '../Closet';
import CategoryCard from './components/categoryCard';

const CategoryScreen = props => {
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    state => state.HomeReducer.filteredProducts,
  );

  useEffect(() => {
    if (props.route.params.data) {
      const data = {
        categoryId: props.route.params.data.categoryId,
      };
      dispatch(getFilteredProducts(data));
    }
  }, []);

  useEffect(() => {
    if (filteredProducts.length) {
      dispatch({type: 'FILTERED_PRODUCTS', value: []});
    }
  }, [filteredProducts, dispatch]);

  const getProductDetails = productId => {
    dispatch(getProductDetailsApi(productId));
  };

  const showFilterFunction = value => {
    setModal(true);
  };
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <Header
        showSort
        title={props?.route?.params?.data?.categoryName}
        showFilter
        showBack
        showFilterFunction={showFilterFunction}
        {...props}
      />
      <FlatList
        data={filteredProducts?.productDetails || []}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CategoryCard
            index={index}
            item={item}
            getProductDetails={() => getProductDetails(item.productId)}
          />
        )}
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
      />
      {
        <FilterModal
          showModal={showModal}
          from="home"
          hideModal={() => setModal(false)}
          filterValue={{
            selectedCategory: [props?.route?.params?.data?.categoryId],
            setSeasonData: [],
            selectedBrands: [],
            selectedSubCategory: [],
            colorsFilter: [],
          }}
        />
      }
    </VView>
  );
};
export default CategoryScreen;
