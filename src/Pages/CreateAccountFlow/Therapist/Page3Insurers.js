import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'


import {
    View,
} from 'react-native'



export const Page3Insurers = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page3Insurers'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    useEffect(() => {
        props.setNextPageNumber(4)
    }, [])

    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Please select the insurers you work with.'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <View style={[styles.paddingH10]}>
                <AddAnotherDropdown
                    stateName='insurers'
                    statePath={null}
                    value={props.pageQuestions.insurers}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={46}
                    marginBottom={65}
                    forTherapist
                    options={prefAndProfileOptions.insuranceOptions}
                />
            </View>
        </View>
    )
}