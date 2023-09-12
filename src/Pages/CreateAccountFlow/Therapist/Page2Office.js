import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { OneOptionCheckBoxes } from '../../../Components/OneOptionCheckBoxes'
import { TextInput } from '../../../Components/TextInput'
import { OneCheckBox } from '../../../Components/OneCheckBox'

import {
    View,
} from 'react-native'


export const Page2Office = (props) => {
    const pageStateName = 'page2Office'
    const getMeetingNum = { 'In-person': '0', 'Virtually': '1', 'Open to both': '2' }
    const getMeetingName = { '0': 'In-person', '1': 'Virtually', '2': 'Open to both' }

    const [infoModalVisible, setInfoModalVisible] = useState(false)

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    const updateMeetingPref = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, getMeetingNum[newValue])
    }

    useEffect(() => {
        if (props.pageQuestions.meetingPreference === '1') {
            props.updateAnswerOnPage(pageStateName, 'wheelChair', null, false)
        }
    }, [props.pageQuestions.meetingPreference])


    return (
        <View style={[styles.flex1, styles.width100]}>
            <Text
                text='Where is your office?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={33}
            />

            <View style={[styles.paddingH10]}>
                <TextInput
                    label='Zip Code'
                    value={props.pageQuestions.zipCode}
                    onChangeFunc={newValue => updateAnswerOnPage('zipCode', null, newValue)}
                    placeholder='Type here'
                    keyboardType='number-pad'
                    marginBottom={58}
                />
            </View>

            <OneOptionCheckBoxes
                stateName='meetingPreference'
                statePath={null}
                label='How would you like to meet?'
                value={getMeetingName[props.pageQuestions.meetingPreference]}
                options={['Virtually', 'In-person', 'Open to both']}
                onChangeFunc={updateMeetingPref}
                marginBottom={30}
            />

            {props.pageQuestions.meetingPreference === '0' || props.pageQuestions.meetingPreference === '2' ?
                // Wheel chair check box
                <OneCheckBox
                    stateName='wheelChair'
                    statePath={null}
                    label='My office is wheelchair accessible'
                    value={props.pageQuestions.wheelChair}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
                : null}

        </View>
    )
}