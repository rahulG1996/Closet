import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';

import styles from './styles';

const SliderScreen = () => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <ScrollView>
      <Slider
        style={styles.slider}
        min={0}
        max={1000}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.valueText}>{low}</Text>
        <Text style={styles.valueText}>{high}</Text>
      </View>
    </ScrollView>
  );
};

export default SliderScreen;
