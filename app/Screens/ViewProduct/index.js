import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '../../colors';
import {VText, VView, Buttons, Header} from '../../components';
import {FONTS_SIZES} from '../../fonts';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const ViewProduct = props => {
  let _slider1Ref = useRef(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    if (props?.route?.params?.data) {
      setProductData(props?.route?.params?.data);
    }
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{uri: item}} style={styles.image} resizeMode="contain" />
      </View>
    );
  };

  if (Object.keys(productData).length === 0) {
    return null;
  }
  return (
    <VView style={{backgroundColor: 'white', flex: 1}}>
      <VView>
        <Header showshare {...props} showBack />
      </VView>
      <ScrollView>
        <VView
          style={{
            backgroundColor: Colors.grey1,
            height: 350,
            width: '100%',
          }}>
          <Carousel
            loop={true}
            autoplay={true}
            layout="stack"
            layoutCardOffset={9}
            ref={_slider1Ref}
            data={[
              ...productData.imageUrls,
              ...productData.imageUrls,
              ...productData.imageUrls,
            ]}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={index => setCurrentActiveIndex(index)}
          />
          <Pagination
            dotsLength={productData.imageUrls.length}
            activeDotIndex={currentActiveIndex}
            carouselRef={_slider1Ref}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            tappableDots={true}
          />
        </VView>
        <VView style={{padding: 16}}>
          <VView>
            <VText
              style={{fontSize: FONTS_SIZES.s3, fontWeight: '700'}}
              text={productData?.productName}
            />
            <VText
              text={'$' + productData?.productPrice}
              style={{
                fontSize: FONTS_SIZES.s3,
                fontWeight: '700',
                paddingVertical: 8,
              }}
            />
            <VText
              style={{color: Colors.black60, marginBottom: 16}}
              text={productData.productDescription}
            />
            <Buttons text="buy from the store" />
          </VView>
        </VView>
      </ScrollView>
    </VView>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
    borderRadius: 8,
    width: '100%',
    paddingBottom: 16,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  dotStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 0,
    backgroundColor: 'red',
  },
});
