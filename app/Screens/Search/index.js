import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../colors';
import {Header, OverlayModal, SortComponent} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import {addDataInCloset} from '../../redux/actions/closetAction';
import {
  getFilteredProducts,
  getProductDetailsApi,
  getSearchResult,
} from '../../redux/actions/homeActions';
import CategoryCard from '../CategoryScreen/components/categoryCard';
import {FilterModal} from '../Closet';

const Search = props => {
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
  const [showSearch, setSearch] = useState(true);
  const [showModal, setModal] = useState(false);
  const [showSortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState({
    type: 'asc',
    title: 'Price Low to High',
    isSelected: true,
  });
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();
  const [productList, setProducts] = useState([]);
  const filteredProducts = useSelector(
    state => state.HomeReducer.filteredProducts,
  );
  const [showLoader, setLoader] = useState(true);
  const productDetailResponse = useSelector(
    state => state.HomeReducer.productDetailResponse,
  );
  const addClosetResponse = useSelector(
    state => state.ClosetReducer.addClosetResponse,
  );
  const userId = useSelector(state => state.AuthReducer.userId);

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

  const getProductDetails = productId => {
    dispatch(getProductDetailsApi(productId));
  };

  useEffect(() => {
    if (Object.keys(filteredProducts).length) {
      setProducts(filteredProducts?.productDetails);
      setLoader(false);
    }
  }, [filteredProducts]);

  useEffect(() => {
    if (Object.keys(productDetailResponse).length) {
      dispatch({type: 'GET_PRODUCT_DETAILS', value: {}});
      props.navigation.navigate('ViewProduct', {
        data: productDetailResponse.productDetails,
      });
    }
  }, [dispatch, productDetailResponse, props.navigation]);

  const searchProduct = () => {
    setSearch(false);
    dispatch({type: 'GET_SEARCH_RESULT', value: []});
    const data = {
      key: searchKey,
    };
    dispatch(getFilteredProducts(data));
  };

  useEffect(() => {
    if (Object.keys(addClosetResponse).length) {
      if (addClosetResponse.statusCode == 200) {
        dispatch({type: 'ADD_TO_CLOSET', value: {}});
        Toast.show('Cloth successfully added in closet');
      }
    }
  }, [addClosetResponse, dispatch, props.navigation]);

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
    console.log('data', JSON.stringify(data, undefined, 2));
    dispatch(addDataInCloset(data));
  };

  const setFilter = data => {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {showSearch ? (
        <>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{width: '75%'}}>
              <TextInput
                style={{
                  paddingVertical: 16,
                  backgroundColor: Colors.grey1,
                  paddingLeft: 16,
                }}
                onChangeText={e => setSearchKey(e)}
                placeholder="Search jeans, top, hats..."
                autoFocus
                returnKeyLabel="Search"
                onSubmitEditing={searchProduct}
              />
            </View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16}}>
            <Text style={{textAlign: 'center', color: Colors.black30}}>
              "If you love something, wear it all the time... Find things that
              suit you. That's how you look extraordinary."
            </Text>
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 32,
                color: Colors.black30,
              }}>
              – Vivienne Westwood
            </Text>
          </View>
        </>
      ) : (
        <View style={{flex: 1}}>
          <Header
            showBack
            title={searchKey}
            {...props}
            showFilter
            showSort
            showFilterFunction={showFilterFunction}
            handleSorting={handleSortingModal}
            onBack={() => {
              setSearch(true);
              setProducts([]);
              dispatch({type: 'FILTERED_PRODUCTS', value: {}});
              setLoader(true);
            }}
          />
          {productList.length > 0 ? (
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
          ) : showLoader ? (
            <ActivityIndicator />
          ) : (
            <View style={{alignSelf: 'center', paddingTop: 50}}>
              <Text
                style={{
                  color: Colors.black60,
                  fontSize: 15,
                }}>
                Umm, nothing is here...
              </Text>
            </View>
          )}
        </View>
      )}
      {
        <FilterModal
          showModal={showModal}
          from="home"
          hideModal={() => setModal(false)}
          setFilter={setFilter}
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
    </View>
  );
};

export default Search;
