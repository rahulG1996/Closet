import React from 'react';
import {FlatList} from 'react-native';
import {VView, Header} from '../../components';
import CategoryCard from './components/categoryCard';

const CategoryScreen = props => {
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Category Name" showFilter showBack {...props} />
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
    </VView>
  );
};
export default CategoryScreen;
