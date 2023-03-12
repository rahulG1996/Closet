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
  const [secondQuestionData, setsecondQuestionData] = useState([]);
  const [thirdQuestionData, setThirdQuestions] = useState([]);
  const [forthQuestionData, setForthQuestions] = useState([]);
  const [fifthQuestionData, setFifthQuestions] = useState([]);
  const [sixthQuestionData, setSixthQuestions] = useState([]);
  const [seventhQuestionData, setSeventhQuestions] = useState([]);
  const [preferencesObj, setPreferencesObj] = useState([]);
  const [brandSearchKey, setBrandSearchKey] = useState('');
  const preferencesQsResponse =
    useSelector(state => state.ProfileReducer.preferencesQsResponse) || [];
  const [brandList, setBrandList] = useState(preferencesQsResponse[0].options);

  const setBrandsFilter = item => {
    if (currentActiveTab === 1) {
      let firstQuestionData1 = [...firstQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setFirstQuestions(firstQuestionData1);
    }
    if (currentActiveTab === 2) {
      let firstQuestionData1 = [...secondQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setsecondQuestionData(firstQuestionData1);
    }
    if (currentActiveTab === 3) {
      let firstQuestionData1 = [...thirdQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setThirdQuestions(firstQuestionData1);
    }
    if (currentActiveTab === 4) {
      let firstQuestionData1 = [...forthQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setForthQuestions(firstQuestionData1);
    }
    if (currentActiveTab === 5) {
      let firstQuestionData1 = [...fifthQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setFifthQuestions(firstQuestionData1);
    }
    if (currentActiveTab === 6) {
      let firstQuestionData1 = [...sixthQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setSixthQuestions(firstQuestionData1);
    }
    if (currentActiveTab === 7) {
      let firstQuestionData1 = [...seventhQuestionData];
      if (firstQuestionData1.includes(item.brandId)) {
        firstQuestionData1 = firstQuestionData1.filter(i => i !== item.brandId);
      } else {
        firstQuestionData1.push(item.brandId);
      }
      setSeventhQuestions(firstQuestionData1);
    }
  };

  console.log('@@ firstQuestionData', firstQuestionData);

  const searchBrand = (e, type) => {
    setBrandSearchKey(e);
    let allBrandList = preferencesQsResponse[type].options;
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
            onChangeText={e => searchBrand(e, 0)}
            value={brandSearchKey}
          />
          {renderList(brandList, firstQuestionData)}
        </>
      </View>
    );
  };

  const handleNext = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (currentActiveTab === 7) {
      props.navigation.navigate('Home');
      return;
    }
    setCurrentActiveTab(currentActiveTab + 1);
    setBrandSearchKey('');
    setBrandList(preferencesQsResponse[currentActiveTab].options);
  };

  const handleBack = () => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setCurrentActiveTab(currentActiveTab - 1);
    setBrandList(preferencesQsResponse[currentActiveTab - 1].options);
  };

  const renderList = (data, answers) => {
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
                backgroundColor: answers.includes(item.brandId)
                  ? '#DBDBDB'
                  : 'transparent',
                alignItems: 'center',
              }}>
              <Text>{item.brandName}</Text>
              {answers.includes(item.brandId) ? (
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
            onChangeText={e => searchBrand(e, 1)}
            value={brandSearchKey}
          />
          {renderList(brandList, secondQuestionData)}
        </>
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
          {renderList(brandList, thirdQuestionData)}
        </>
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
          {renderList(brandList, forthQuestionData)}
        </>
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
          {renderList(brandList, fifthQuestionData)}
        </>
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
          {renderList(brandList, sixthQuestionData)}
        </>
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
          {renderList(brandList, seventhQuestionData)}
        </>
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
        <ScrollView contentContainerStyle={{paddingTop: 40}} ref={ref}>
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

        <Buttons text="next" onPress={handleNext} />
        {currentActiveTab > 1 && (
          <Buttons text="back" isInverse onPress={handleBack} />
        )}
      </View>
    </View>
  );
};

export default YourPreferences;
