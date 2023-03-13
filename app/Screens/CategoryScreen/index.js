import moment from 'moment';
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
import {addDataInCloset} from '../../redux/actions/closetAction';
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
  const [selectedSort, setSelectedSort] = useState({
    type: 'asc',
    title: 'Price Low to High',
    isSelected: true,
  });
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);
  const dispatch = useDispatch();
  const [productList, setProducts] = useState([]);
  const filteredProducts = useSelector(
    state => state.HomeReducer.filteredProducts,
  );
  const addClosetResponse = useSelector(
    state => state.ClosetReducer.addClosetResponse,
  );
  const userId = useSelector(state => state.AuthReducer.userId);

  useEffect(() => {
    if (props.route.params.data) {
      const data = {
        categoryId: props.route.params.data.categoryId,
      };
      dispatch(getFilteredProducts(data));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(filteredProducts).length) {
      setProducts(filteredProducts?.productDetails);
    }
  }, [filteredProducts]);

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
    setSortModal(false);
    let data = filteredProducts?.productDetails;
    data = data.sort((a, b) => {
      if (selectedSort.type === 'asc') {
        return a.productPrice > b.productPrice ? 1 : -1;
      } else if (selectedSort.type === 'desc') {
        return a.productPrice < b.productPrice ? 1 : -1;
      } else if (selectedSort.type === 'dateDesc') {
        return moment(a.createdOn) < moment(b.createdOn) ? 1 : -1;
      }
    });
    setProducts(data);
  };

  const addToCloset = item => {
    let data = {
      userId: userId,
      categoryId: item.categoryId,
      subCategoryId: item.subCategoryId,
      brandId: item.brandId,
      season: item.seasons,
      colorCode: [item.productColor],
      itemImageUrl: item.imageUrls[0],
    };
    dispatch(addDataInCloset(data));
  };

  const setFilter = data => {
    setModal(false);
    let data1 = {};
    if (data.selectedCategory.length) {
      data1.categoryIds = data.selectedCategory;
    }
    if (data.selectedBrands.length) {
      data1.brandIds = data.selectedCategory;
    }
    if (data.selectedSubCategory.length) {
      data1.subCategoryIds = data.selectedSubCategory;
    }
    if (data.seasonData.length) {
      data1.seasonData = data.seasonData;
    }
    if (data.colorsFilter.length) {
      data1.colorsFilter = data.colorsFilter;
    }
    if (data.sizeFilter.length) {
      data1.sizeFilter = data.sizeFilter;
    }
    dispatch(getFilteredProducts(data1));
    console.log('@@ data', JSON.stringify(data1, undefined, 2));
  };

  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <Header
        showSort
        title={props?.route?.params?.title}
        showFilter
        showBack
        showFilterFunction={showFilterFunction}
        handleSorting={handleSortingModal}
        {...props}
      />
      <FlatList
        data={productList}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CategoryCard
            index={index}
            item={item}
            getProductDetails={() => getProductDetails(item.productId)}
            addToCloset={() => addToCloset(item)}
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
          setFilter={setFilter}
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
