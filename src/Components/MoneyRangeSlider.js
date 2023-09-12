import React from 'react';
import styles from '../Styles';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { MoneyRangeCustomLabel } from './MoneyRangeCustomLabel';

import { Text } from './Text';

import { View } from 'react-native';

export const MoneyRangeSlider = (props) => {
  return (
    <View style={{ marginBottom: props.marginBottom }}>
      <Text
        text={props.label}
        fontSize={17}
        lineHeight={31}
        fontFamily='primary'
        fontWeight={700}
        color={styles.colorBlack0}
        marginBottom={16}
      />

      <MultiSlider
        values={props.value} // An array of either 1 number for 1 thumb or an array of 2 numbers for 2 thumbs
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        onValuesChangeFinish={newValues => props.onChangeFunc(props.stateName, props.statePath, newValues)}
        showSteps={true}
        showStepMarkers={true}
        showStepLabels={true}
        enableLabel={true}
        customLabel={(info) => <MoneyRangeCustomLabel data={info} small={props.small} textColor={props.textColor} />}
        // {container / track / selected / unselected / markerContainer / marker / pressedMarker / step / stepLabel / StepMarker} Style
        containerStyle={{ height: 15 }}
        trackStyle={{
          height: props.small ? 1 : 3,
          backgroundColor: styles.backgroundColorGrey0.backgroundColor,
        }}
        selectedStyle={{
          height: props.small ? 2 : 3,
          backgroundColor: props.selectedColor ? props.selectedColor : styles.backgroundColorYellow1.backgroundColor,
        }}
        markerStyle={{
          width: 15,
          height: 15,
          backgroundColor: props.markerColor ? props.markerColor : styles.backgroundColorYellow1.backgroundColor,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          borderWidth: 0,
        }}
      />
    </View>
  );
};
