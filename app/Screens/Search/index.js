import React from 'react';
import {TextInput, View} from 'react-native';

const Search = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search jeans, top, hats..."
      />
    </View>
  );
};

export default Search;
