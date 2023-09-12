import React from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'

export const Page6PreferredLanguage = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page6PreferredLanguage'

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    return (
        <View style={[styles.flexGrow1, styles.width100, styles.paddingH10]}>
            <Text
                text='What is your preferred language?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <View style={[styles.flexGrow1]}>
                <AddAnotherDropdown
                    stateName='languages'
                    statePath={null}
                    value={props.pageQuestions.languages}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={36}
                    marginBottom={65}
                    options={prefAndProfileOptions.languageOptions}
                />
            </View>

            <YesNoSwitch
                hasIcon
                hasInfoModal
                stateName='languageDealBreaker'
                statePath={null}
                label='Is this a dealbreaker?'
                value={props.pageQuestions.languageDealBreaker}
                onChangeFunc={updateAnswerOnPage}
                marginBottom={25}
            />
        </View>
    )
}