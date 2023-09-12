import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

// import { Text } from '../../../Components/Text'
import { OneOptionCheckBoxes } from '../../../Components/OneOptionCheckBoxes'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'
import { MileRangeSlider } from '../../../Components/MileRangeSlider'
import { OneCheckBox } from '../../../Components/OneCheckBox'

import {
    View,
} from 'react-native'


export const Page2Meeting = (props) => {
    const pageStateName = 'page2Meeting'
    const getMeetingNum = { 'In-person': '0', 'Virtually': '1', 'Open to both': '2' }
    const getMeetingName = { '0': 'In-person', '1': 'Virtually', '2': 'Open to both' }

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
        <View style={[styles.flex1, styles.width100, styles.alignCenter]}>
            <OneOptionCheckBoxes
                stateName='meetingPreference'
                statePath={null}
                label='How would you like to meet?'
                value={getMeetingName[props.pageQuestions.meetingPreference]}
                options={['Virtually', 'In-person', 'Open to both']}
                onChangeFunc={updateMeetingPref}
                marginBottom={44}
            />

            <YesNoSwitch
                hasIcon
                hasInfoModal
                stateName='meetingPrefIsDealBreaker'
                statePath={null}
                label='Is this a dealbreaker?'
                value={props.pageQuestions.meetingPrefIsDealBreaker}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={48}
            />

            <MileRangeSlider
                stateName='searchMiles'
                statePath={null}
                label='Search up to 20 miles away'
                value={[props.pageQuestions.searchMiles]}
                min={1}
                max={20}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={props.pageQuestions.meetingPreference === '0' || props.pageQuestions.meetingPreference === '2' ? 50 : 0}
            />

            {props.pageQuestions.meetingPreference === '0' || props.pageQuestions.meetingPreference === '2' ?
                // Wheel chair check box
                <OneCheckBox
                    stateName='wheelChair'
                    statePath={null}
                    label='I prefer wheelchair accessibility'
                    value={props.pageQuestions.wheelChair}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
                : null}

        </View>
    )
}