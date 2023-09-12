import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'

import { Button } from '../../../Components/Button'

import {
    Platform,
    Animated,
    View,
} from 'react-native'


export const Page10Modality = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page10Modality'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Choose your treatment modality.'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={Platform.OS === 'ios' ? 5 : 15}
            />

            <Text
                text='Select up to 3'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={13}
            />

            <View style={[styles.paddingH10]}>
                <View style={[styles.flexGrow1]}>
                    <AddAnotherDropdown
                        arrayOfObjects
                        otherHasTwoInputs
                        stateName='modality'
                        statePath={null}
                        firstPropName='value'
                        secondPropName='description'
                        value={props.pageQuestions.modality}
                        updateAnswerOnPage={updateAnswerOnPage}
                        maxNumOfDropdowns={3}
                        marginBottom={60}
                        forTherapist
                        therapistSelectsModality
                        options={prefAndProfileOptions.modalityOptions}
                    />
                </View>
            </View>
        </View>
    )
}