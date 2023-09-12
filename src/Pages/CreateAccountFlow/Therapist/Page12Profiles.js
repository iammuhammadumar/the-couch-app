import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'
import { AddAnotherTextInput } from '../../../Components/AddAnotherTextInput'

import {
    View,
} from 'react-native'


export const Page12Profiles = (props) => {
    const pageStateName = 'page12Profiles'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flex1, styles.width100]}>
            <Text
                text='Please share your website and/or relevant professional profiles.'
                fontSize={26}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={22}
            />

            <View style={[styles.paddingH10]}>
                <TextInput
                    label='Website'
                    value={props.pageQuestions.website}
                    onChangeFunc={newValue => updateAnswerOnPage('website', null, newValue)}
                    placeholder='Type here'
                    marginBottom={15}
                />

                <TextInput
                    label='Instagram'
                    value={props.pageQuestions.instagram}
                    onChangeFunc={newValue => updateAnswerOnPage('instagram', null, newValue)}
                    placeholder='Type here'
                    marginBottom={15}
                />

                <TextInput
                    label='Facebook'
                    value={props.pageQuestions.facebook}
                    onChangeFunc={newValue => updateAnswerOnPage('facebook', null, newValue)}
                    placeholder='Type here'
                    marginBottom={42}
                />

                <AddAnotherTextInput
                    stateName='otherWebsites'
                    statePath={null}
                    value={props.pageQuestions.otherWebsites}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={4}
                // marginBottom={20}
                />
            </View>
        </View>
    )
}

