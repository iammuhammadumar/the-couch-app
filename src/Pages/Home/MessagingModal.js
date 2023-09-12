import React, { useEffect, useState } from 'react';
import styles from '../../Styles';

import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

import { View, TouchableOpacity } from 'react-native';

export const MessagingModal = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.setModalToShow('connecting')}
        backgroundColor="transparent">
        <Text
          text="Back"
          fontSize={18}
          lineHeight={24}
          fontFamily='primary'
          fontWeight={300}
          color="#fff"
          marginBottom={5}
        />
      </TouchableOpacity>
      <View style={[styles.paddingH15, styles.alignCenter]}>
        <Text
          text="Write your message here. Let them know what you are looking for and when you are available."
          fontSize={18}
          lineHeight={25}
          fontFamily='primary'
          fontWeight={700}
          color="#fff"
          textAlign="center"
          marginBottom={23}
        />

        <TextInput
          height={107}
          multiline={true}
          maxLength={200}
          // label=' '
          value={
            props.messageToTherapist !== 'Hi, can I schedule an appointment?' &&
              props.messageToTherapist !==
              'What is your availability on weekdays?'
              ? props.messageToTherapist
              : ''
          }
          onChangeFunc={newValue => props.setMessageToTherapist(newValue)}
          placeholder="Write a message..."
          placeholderTextColor="#A5A0A0"
          marginBottom={26}
          inputStyle={{ borderRadius: 10 }}
        />

        <Text
          text="You can also select a pre-written message."
          width="65%"
          fontSize={18}
          lineHeight={22}
          fontFamily='primary'
          fontWeight={700}
          color="#fff"
          textAlign="center"
          marginBottom={20}
        />

        <Button
          text="Hi, can I schedule an appointment?"
          width="100%"
          onPress={() =>
            props.setMessageToTherapist('Hi, can I schedule an appointment?')
          }
          fontSize={15}
          lineHeight={18}
          fontFamily='primary'
          fontWeight={300}
          color={styles.colorBlack0}
          textAlign="left"
          backgroundColor={
            props.messageToTherapist === 'Hi, can I schedule an appointment?'
              ? styles.backgroundColorOrange2
              : styles.backgroundColorWhite
          }
          btnStyle={styles.border1}
          paddingLeft={14}
          paddingRight={0}
          paddingTop={16}
          paddingBottom={16}
          marginBottom={20}
        />

        <Button
          text="What is your availability on weekdays?"
          width="100%"
          onPress={() =>
            props.setMessageToTherapist(
              'What is your availability on weekdays?',
            )
          }
          fontSize={15}
          lineHeight={18}
          fontFamily='primary'
          fontWeight={300}
          color={styles.colorBlack0}
          textAlign="left"
          backgroundColor={
            props.messageToTherapist ===
              'What is your availability on weekdays?'
              ? styles.backgroundColorOrange2
              : styles.backgroundColorWhite
          }
          btnStyle={styles.border1}
          paddingLeft={14}
          paddingRight={0}
          paddingTop={16}
          paddingBottom={16}
          marginBottom={30}
        />

        <Button
          text={`Send to Dr. ${props.currentTherapistObj?.family_name}`}
          width="100%"
          onPress={() => props.sendMessage()}
          fontsize={21}
          lineHeight={25}
          marginBottom={34}
        />

        <Text
          text="You can also add this therapist to the message list and get in touch later."
          width="85%"
          fontSize={18}
          lineHeight={25}
          fontFamily='primary'
          fontWeight={700}
          color="#fff"
          textAlign="center"
          marginBottom={24}
        />

        <Button
          text="Add to message list"
          width="100%"
          onPress={() => props.addToMessageList()}
          fontsize={21}
          lineHeight={25}
        />
      </View>
    </View>
  );
};
