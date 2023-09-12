import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'



export const Page4Provider = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page4Provider'

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    useEffect(() => {
        props.setNextPageNumber(5)
    }, [])

    return (
        <View style={[styles.flexGrow1, styles.width100, styles.paddingH10]}>
            <Text
                text='Who is your provider?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <View style={[styles.flexGrow1]}>
                <AddAnotherDropdown
                    insurance
                    stateName='providers'
                    statePath={null}
                    value={props.pageQuestions.providers}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={2}
                    subText='Check with your insurance provider to find out how much your copay may be.'
                    marginBottom={65}
                    options={prefAndProfileOptions.insuranceOptions}
                />
            </View>

            <YesNoSwitch
                hasIcon
                hasInfoModal
                stateName='providerIsDealBreaker'
                statePath={null}
                label='Is this a dealbreaker?'
                value={props.pageQuestions.providerIsDealBreaker}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={25}
            />
        </View>
    )
}