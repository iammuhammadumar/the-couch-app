import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AvailabilityCalendar } from '../../../Components/AvailabilityCalendar'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const Page7Availability = (props) => {
    const pageStateName = 'page7Availability'

    useEffect(() => {
        props.setNextPageNumber(7.1)
    }, [])


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    return (
        <View>
            <Text
                text='When are you available?'
                fontSize={27}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
            />

            <Text
                text='Select all that apply'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={400}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={4}
            />

            <AvailabilityCalendar
                stateName='availability'
                statePath={null}
                value={props.pageQuestions.availability}
                pageQuestions={{ ...props.pageQuestions }}
                updateAnswerOnPage={updateAnswerOnPage}
                marginBottom={44}
            />

            <YesNoSwitch
                hasIcon
                hasInfoModal
                stateName='availabilityDealBreaker'
                statePath={null}
                label='Is this a dealbreaker?'
                value={props.pageQuestions.availabilityDealBreaker}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={25}
            />
        </View>
    )
}