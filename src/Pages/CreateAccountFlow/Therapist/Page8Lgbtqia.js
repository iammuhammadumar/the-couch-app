import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { OneOptionCheckBoxes } from '../../../Components/OneOptionCheckBoxes'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'
import { InfoModal } from '../../../Components/InfoModal'

import {
    View,
} from 'react-native'


export const Page8Lgbtqia = (props) => {
    const pageStateName = 'page8Lgbtqia'
    const getLgbtqiaString = { '1': 'Yes', '0': 'No', '2': 'Prefer not to say' }
    const getLgbtqiaBool = { 'Yes': 1, 'No': 0, 'Prefer not to say': 2 }

    const updateLgbtqia = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, getLgbtqiaBool[newValue])
    }

    return (
        <View style={[styles.width100, styles.paddingT25]}>
            <Text
                text='Are you part of the LGBTQIA+ community?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={50}
            />

            <OneOptionCheckBoxes
                stateName='lgbtqia'
                statePath={null}
                label=' '
                value={getLgbtqiaString[props.pageQuestions.lgbtqia]}
                options={['Yes', 'No', 'Prefer not to say']}
                onChangeFunc={updateLgbtqia}
                marginBottom={25}
            />
        </View>
    )
}