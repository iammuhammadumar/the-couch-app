import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AvailabilityCalendarConfirm } from '../../../Components/AvailabilityCalendarConfirm'

import {
    View,
} from 'react-native'


export const Page6AvailabilityConfirm = (props) => {

    useEffect(() => {
        props.setNextPageNumber(7)
    }, [])


    return (
        <View style={[styles.flex1, styles.width100]}>
            <Text
                text='Confirm times'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={20}
            />

            <AvailabilityCalendarConfirm
                data={props.availabilityArray}
                marginBottom={50}
            />

        </View>
    )
}