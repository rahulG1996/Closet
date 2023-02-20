import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  VView,
  Header,
  OverlayModal,
  Buttons,
  SortComponent,
} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {
  getFilteredProducts,
  getProductDetailsApi,
} from '../../redux/actions/homeActions';
import {FilterModal} from '../Closet';
import CategoryCard from './components/categoryCard';

const CategoryScreen = props => {
  const sortingData = [
    {
      type: 'asc',
      title: 'Price Low to High',
      isSelected: true,
    },
    {
      type: 'desc',
      title: 'Price High to Low',
      isSelected: false,
    },
    {
      type: 'dateDesc',
      title: 'Latest First',
      isSelected: false,
    },
  ];
  const [showModal, setModal] = useState(false);
  const [showSortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState({});
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);
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

  const getProductDetails = productId => {
    dispatch(getProductDetailsApi(productId));
  };

  const showFilterFunction = value => {
    setModal(true);
  };

  const handleSortingModal = () => {
    setSortModal(true);
  };

  const handleSortingOption = (item, index) => {
    setSelectedSort(item);
    setSelectedSortIndex(index);
  };

  const handleSorting = () => {
    // sort logic
    setSortModal(false);
  };

  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <Header
        showSort
        title={props?.route?.params?.data?.categoryName}
        showFilter
        showBack
        showFilterFunction={showFilterFunction}
        handleSorting={handleSortingModal}
        {...props}
      />
      <FlatList
        data={filteredProducts?.productDetails}
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
            selectedCategory: [],
            setSeasonData: [],
            selectedBrands: [],
            selectedSubCategory: [],
            colorsFilter: [],
          }}
        />
      }
      <OverlayModal
        showModal={showSortModal}
        component={
          <SortComponent
            sortingData={sortingData}
            setSortModal={setSortModal}
            handleSortingOption={handleSortingOption}
            handleSorting={handleSorting}
            selectedSortIndex={selectedSortIndex}
          />
        }
      />
    </VView>
  );
};
export default CategoryScreen;
