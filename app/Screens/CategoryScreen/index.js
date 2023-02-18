import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {VView, Header} from '../../components';
import {FilterModal} from '../Closet';
import CategoryCard from './components/categoryCard';

const CategoryScreen = props => {
  const [showModal, setModal] = useState(false);

  const showFilterFunction = value => {
    setModal(true);
  };
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <Header
        title="Category Name"
        showFilter
        showBack
        showFilterFunction={showFilterFunction}
        {...props}
      />
      <FlatList
        data={[1, 2, 3]}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <CategoryCard index={index} />}
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
    </VView>
  );
};
export default CategoryScreen;
