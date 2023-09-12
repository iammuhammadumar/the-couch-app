import React from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { OneOptionCheckBoxes } from '../../../Components/OneOptionCheckBoxes'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const Page9Lgbtqia = (props) => {
    const pageStateName = 'page9Lgbtqia'
    const getLgbtqiaString = { '1': 'Yes', '0': 'No', '2': 'Prefer not to say' }
    const getLgbtqiaBool = { 'Yes': 1, 'No': 0, 'Prefer not to say': 2 }

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    const updateLgbtqia = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, getLgbtqiaBool[newValue])
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Are you looking for a therapist that is part of the LGBTQIA+ community?'
                fontSize={24}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={25}
            />

            <OneOptionCheckBoxes
                stateName='lgbtqia'
                statePath={null}
                label='Check one:'
                value={getLgbtqiaString[props.pageQuestions.lgbtqia]}
                options={['Yes', 'No', 'Prefer not to say']}
                onChangeFunc={updateLgbtqia}
                marginBottom={25}
            />

            <YesNoSwitch
                hasIcon
                hasInfoModal
                stateName='lgbtqiaDealBreaker'
                statePath={null}
                label='Is this a dealbreaker?'
                value={props.pageQuestions.lgbtqiaDealBreaker}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={25}
            />
        </View>
    )
}