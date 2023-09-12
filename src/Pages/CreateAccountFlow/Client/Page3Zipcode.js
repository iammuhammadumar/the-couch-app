import React, { useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'

import {
    View,
} from 'react-native'


export const Page3Zipcode = (props) => {
    const pageStateName = 'page3Zipcode'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flex1, styles.width100]}>
            <Text
                text='What is your zip code?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={500}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <Text
                text='We will connect you with nearby therapists. Enter a zip code or skip to see all the available therapists in your state.'
                fontSize={15}
                lineHeight={18}
                fontFamily='secondary'
                fontWeight={400}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={30}
            />


            <TextInput
                label='Zip Code'
                value={props.pageQuestions.zipCode}
                onChangeFunc={newValue => updateAnswerOnPage('zipCode', null, newValue)}
                placeholder='Type here'
                keyboardType='number-pad'
            />
        </View>
    )
}