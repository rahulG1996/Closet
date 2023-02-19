import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../colors';
import {Buttons, Input} from '../../components';

const YourPreferences = props => {
  const ref = useRef(null);
  const [currentActiveTab, setCurrentActiveTab] = useState(1);
  const [firstQuestionData, setFirstQuestions] = useState([]);

  const [brandSearchKey, setBrandSearchKey] = useState('');
  const preferencesQsResponse =
    useSelector(state => state.ProfileReducer.preferencesQsResponse) || [];
  const [brandList, setBrandList] = useState(preferencesQsResponse[0].options);

  const setBrandsFilter = item => {
    let firstQuestionData1 = [...firstQuestionData];
    if (firstQuestionData1.includes(item.brandId)) {
      firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
    } else {
      firstQuestionData1.push(item.brandId);
    }
    setFirstQuestions(firstQuestionData1);
  };

  const searchBrand = e => {
    setBrandSearchKey(e);
    let allBrandList = preferencesQsResponse[0].options;
    allBrandList = allBrandList.filter(i => {
      return i.brandName.toLowerCase().includes(e.toLowerCase());
    });
    setBrandList(allBrandList);
  };

  const getFirstPage = () => {
    const data = preferencesQsResponse[0];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const handleNext = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setCurrentActiveTab(currentActiveTab + 1);
  };

  const renderList = data => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.map(item => {
          return (
            <TouchableOpacity
              onPress={() => setBrandsFilter(item)}
              style={{
                borderWidth: 1,
                padding: 8,
                marginRight: 8,
                borderColor: Colors.greyBorder,
                marginBottom: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: firstQuestionData.includes(item.brandId)
                  ? '#DBDBDB'
                  : 'transparent',
                alignItems: 'center',
              }}>
              <Text>{item.brandName}</Text>
              {firstQuestionData.includes(item.brandId) ? (
                <Image
                  source={require('../../assets/crossIcon.png')}
                  style={{width: 12, height: 12, marginLeft: 8}}
                />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const getSecondPage = () => {
    const data = preferencesQsResponse[1];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const getThirdPage = () => {
    const data = preferencesQsResponse[2];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const getFourthPage = () => {
    const data = preferencesQsResponse[3];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const getFifthPage = () => {
    const data = preferencesQsResponse[4];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const getSixthPage = () => {
    const data = preferencesQsResponse[5];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>
        <Buttons text="Next" onPress={handleNext} />
      </View>
    );
  };

  const getSeventhPage = () => {
    const data = preferencesQsResponse[6];
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 16}}>
            {data.question}
          </Text>
          <Input
            placeholder="Search Brands"
            onChangeText={e => searchBrand(e)}
            value={brandSearchKey}
          />
          {renderList(brandList)}
        </>

        <Buttons
          text="Next"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    );
  };

  return (
    <View
      style={{padding: 16, flex: 1, backgroundColor: 'white', paddingTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        {preferencesQsResponse.length > 0 &&
          preferencesQsResponse.map((item, index) => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width / 9,
                  borderWidth: 1,
                  marginRight: 8,
                  borderColor:
                    currentActiveTab >= index + 1
                      ? Colors.black
                      : Colors.greyBorder,
                }}
              />
            );
          })}
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={{paddingTop: 40}} ref={ref}>
          {currentActiveTab === 1
            ? getFirstPage()
            : currentActiveTab === 2
            ? getSecondPage()
            : currentActiveTab === 3
            ? getThirdPage()
            : currentActiveTab === 4
            ? getFourthPage()
            : currentActiveTab === 5
            ? getFifthPage()
            : currentActiveTab === 6
            ? getSixthPage()
            : currentActiveTab === 7
            ? getSeventhPage()
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default YourPreferences;
