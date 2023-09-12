import React, { useState, useEffect } from 'react';
import styles from '../../../Styles';

import { Text } from '../../../Components/Text';
import { MoneyRangeSlider } from '../../../Components/MoneyRangeSlider';
import { YesNoSwitch } from '../../../Components/YesNoSwitch';
import { InfoModal } from '../../../Components/InfoModal';

import { Platform, View } from 'react-native';

export const Page4OutOfPocket = props => {
  const pageStateName = 'page4OutOfPocket';

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const updateAnswerOnPage = (stateName, statePath, newValue) => {
    props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue);
  };

  useEffect(() => {
    props.setNextPageNumber(5);
  }, []);

  return (
    <View style={[styles.flexGrow1, styles.width100]}>
      <Text
        text="How much are you willing to pay out of pocket?"
        fontSize={25}
        lineHeight={32}
        fontFamily='primary'
        fontWeight={700}
        color={styles.colorGrey2}
        textAlign="center"
        marginBottom={Platform.OS === 'ios' ? 10 : 40}
      />

      <View
        style={[
          styles.width100,
          styles.alignCenter,
          styles.flexGrow1,
          styles.paddingH10,
          styles.justifyEvenly,
        ]}>
        <MoneyRangeSlider
          stateName="outOfPocketRange"
          statePath={null}
          label=""
          value={props.pageQuestions.outOfPocketRange}
          min={0}
          max={500}
          step={5}
          onChangeFunc={updateAnswerOnPage}
          marginBottom={Platform.OS === 'ios' ? 0 : 40}
        />

        <YesNoSwitch
          hasIcon
          hasInfoModal
          stateName="outOfPocketDealBreaker"
          statePath={null}
          label="Is this a dealbreaker?"
          value={props.pageQuestions.outOfPocketDealBreaker}
          onChangeFunc={updateAnswerOnPage}
          modalText="Dealbreakers make your preferences strict. Turn a dealbreaker on if a particular preference is non-negotiable for you."
          marginBottom={Platform.OS === 'ios' ? 0 : 30}
        />

      </View>
    </View>
  );
};
