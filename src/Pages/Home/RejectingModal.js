import React, { useEffect, useState } from 'react';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { OneCheckBox } from '../../Components/OneCheckBox'

import {
    View,
} from 'react-native';


export const RejectingModal = (props) => {
    const { screenHeight } = useAppContext()

    return (
        <View style={{ paddingTop: screenHeight >= 550 ? 110 : 50 }}>
            <View style={[styles.paddingH10]}>
                <Text
                    text='Are you sure this therapist isn’t a good fit?'
                    fontSize={25}
                    lineHeight={25}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#fff'
                    textAlign='center'
                    marginBottom={34}
                />

                <Text
                    text='If they aren’t, they will go to the end of your queue and may come up again once you’ve gone through all the therapists in your area.'
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
                    text={`Yes, \n next please.`}
                    onPress={() => { props.rejectTherapist() }}
                    fontsize={21}
                    lineHeight={25}
                    paddingTop={10}
                    paddingBottom={10}
                />
            </View>

            <View style={[styles.flexRow, styles.justifyCenter]}>
                <OneCheckBox
                    label='Don’t show again'
                    value={props.dontShowRejectingPage}
                    onChangeFunc={(newValue) => props.setDontShowRejectingPage(newValue)}
                    backgroundColor='#fff'
                    marginBottom={0}
                />
            </View>
        </View>
    )
}