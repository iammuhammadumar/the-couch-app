import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'

import {
    Platform,
    View,
} from 'react-native'


export const Page3Insurance = (props) => {
    const pageStateName = 'page3Insurance'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    useEffect(() => {
        if (props.pageQuestions.insurance === 'Yes') {
            props.setNextPageNumber(3.1)
            props.updatePageDone(3, true);
        } else if (props.pageQuestions.insurance === 'No') {
            props.setNextPageNumber(3.2)
            props.updatePageDone(3, true);
        } else {
            props.updatePageDone(3, false);
        }
    }, [props.pageQuestions.insurance])

    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Do you take insurance?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={500}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <View style={[styles.flexGrow1, styles.justifyEvenly, styles.paddingH10]}>
                <Button
                    onPress={() => updateAnswerOnPage('insurance', null, 'Yes')}
                    text='Yes'
                    width={'100%'}
                    color={props.pageQuestions.insurance === 'Yes' && '#fff'}
                    backgroundColor={props.pageQuestions.insurance === 'Yes' ? styles.backgroundColorRed1 : styles.backgroundColorRed0}
                    marginBottom={Platform.OS === 'ios' ? 25 : 40}
                />

                <Button
                    onPress={() => updateAnswerOnPage('insurance', null, 'No')}
                    text='No'
                    width={'100%'}
                    color={props.pageQuestions.insurance === 'No' && '#fff'}
                    backgroundColor={props.pageQuestions.insurance === 'No' ? styles.backgroundColorRed1 : styles.backgroundColorRed0}
                    marginBottom={Platform.OS === 'ios' ? 25 : 40}
                />
            </View>
        </View>
    )
}