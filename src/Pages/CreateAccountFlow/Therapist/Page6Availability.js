import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AvailabilityCalendar } from '../../../Components/AvailabilityCalendar'


import {
    View,
} from 'react-native'


export const Page6Availability = (props) => {
    const pageStateName = 'page6Availability'

    useEffect(() => {
        props.setNextPageNumber(6.1)
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
            />
        </View>
    )
}