import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
// import { YesNoSwitch } from '../../../Components/YesNoSwitch'
// import { InfoModal } from '../../../Components/InfoModal'


import {
    // Platform,
    View,
} from 'react-native'


export const Page11Specialties = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page11Specialties'


    useEffect(() => {
        props.setNextPageNumber(12)
    }, [])

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='What are your specialties?'
                fontSize={25}
                lineHeight={30}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={13}
            />

            <Text
                text='Select up to 3'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={50}
            />

            <View style={[styles.paddingH10]}>
                <AddAnotherDropdown
                    stateName='specialties'
                    statePath={null}
                    value={props.pageQuestions.specialties}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={3}
                    marginBottom={60}
                    options={prefAndProfileOptions.specialtyOptions}
                />
            </View>
        </View>
    )
}