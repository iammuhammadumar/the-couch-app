import React, { useEffect, useState } from 'react';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

import { MessagingModal } from './MessagingModal';

import { Dimensions, View, Modal, TouchableOpacity, Image } from 'react-native';

export const AddedToMessageListModal = props => {
  const { screenWidth } = useAppContext();

  return (
    <View>
      <TouchableOpacity
        onPress={() => props.setModalToShow('messaging')}
        backgroundColor="transparent">
        <Text
          text="Back"
          fontSize={18}
          lineHeight={24}
          fontFamily='primary'
          fontWeight={300}
          color="#fff"
          marginBottom={22}
        />
      </TouchableOpacity>

      <Text
        text="Added to your message list."
        fontSize={24}
        lineHeight={25}
        fontFamily='primary'
        fontWeight={700}
        color="#fff"
        textAlign="center"
        marginBottom={20}
      />

      <Image
        source={props.currentTherapistObj && props.currentTherapistObj.picture}
        style={[
          styles.width100,
          styles.borderTopRadius10,
          { height: screenWidth, marginBottom: 40 },
        ]}
        alt=""
      />

      {/* therapist Image here */}

      <View style={[styles.paddingH15]}>
        <Button
          text="Keep swiping"
          fontsize={21}
          lineHeight={25}
          onPress={() => props.setModalFlowOpen(false)}
        />
      </View>
    </View>
  );
};
