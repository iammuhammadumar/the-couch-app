import React, { useState, useEffect } from 'react';
import styles from '../../../Styles';

import { Text } from '../../../Components/Text';
import { MoneyRangeSlider } from '../../../Components/MoneyRangeSlider';
import { YesNoSwitch } from '../../../Components/YesNoSwitch';
import { InfoModal } from '../../../Components/InfoModal';

import { Platform, View } from 'react-native';

export const Page3HourlyRate = props => {
  const pageStateName = 'page3HourlyRate';


  const updateAnswerOnPage = (stateName, statePath, newValue) => {
    props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue);
  };

  useEffect(() => {
    props.setNextPageNumber(4);
  }, []);

  return (
    <View style={[styles.flexGrow1, styles.width100]}>
      <Text
        text="Whats your hourly rate?"
        fontSize={25}
        lineHeight={32}
        fontFamily='primary'
        fontWeight={700}
        color={styles.colorGrey2}
        textAlign="center"
        marginBottom={65}
      />

      <View style={[styles.width100, styles.alignCenter, styles.paddingH10]}>
        <MoneyRangeSlider
          stateName="hourlyRateRange"
          statePath={null}
          label=""
          value={props.pageQuestions.hourlyRateRange}
          min={0}
          max={500}
          onChangeFunc={updateAnswerOnPage}
          marginBottom={Platform.OS === 'ios' ? 0 : 40}
        />

      </View>
    </View>
  );
};
