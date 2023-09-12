import React, { useEffect, useState } from 'react';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { OneCheckBox } from '../../Components/OneCheckBox'

import {
    View,
} from 'react-native';


export const ConnectingModal = (props) => {
    const { screenHeight } = useAppContext()

    return (
        <View style={{ paddingTop: screenHeight >= 550 ? 110 : 50 }}>
            <View style={[styles.paddingH10]}>
                <Text
                    text='You’ve chosen to connect with this therapist.'
                    fontSize={25}
                    lineHeight={25}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#fff'
                    textAlign='center'
                    marginBottom={34}
                />

                <Text
                    text='Hit yes to add them to your message list. You will then have the option to message them now or later. Hit no to go back and view their profile again.'
                    fontSize={17}
                    lineHeight={25}
                    fontFamily='secondary'
                    fontWeight={400}
                    color='#fff'
                    textAlign='center'
                    marginBottom={57}
                />
            </View>

            <View style={[styles.flexRow, styles.justifySpaceBetween, { marginBottom: 45 }]}>
                <Button
                    width='45%'
                    text={`No, \n go back.`}
                    onPress={() => props.undoSelection()}
                    fontsize={21}
                    lineHeight={25}
                    paddingTop={10}
                    paddingBottom={10}
                />

                <Button
                    width='45%'
                    text={`Yes, \n add to list!`}
                    onPress={() => props.addToMessageList()}
                    fontsize={21}
                    lineHeight={25}
                    paddingTop={10}
                    paddingBottom={10}
                />
            </View>

            <View style={[styles.flexRow, styles.justifyCenter]}>
                <OneCheckBox
                    label='Don’t show again'
                    value={props.dontShowConnectingPage}
                    onChangeFunc={(newValue) => props.setDontShowConnectingPage(newValue)}
                    backgroundColor='#fff'
                    marginBottom={0}
                />
            </View>
        </View>
    )
}