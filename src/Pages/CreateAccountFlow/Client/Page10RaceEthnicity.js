import React from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const Page10RaceEthnicity = (props) => {
    const pageStateName = 'page10RaceEthnicity'

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Do you have a race/ethnicity preference for your therapist?'
                fontSize={23}
                lineHeight={29}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={4}
            />

            <Text
                text='Select all that apply'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={33}
            />

            <View style={[styles.paddingH10]}>
                <View style={[styles.flexGrow1]}>
                    <AddAnotherDropdown
                        stateName='ethnicity'
                        statePath={null}
                        value={props.pageQuestions.ethnicity}
                        updateAnswerOnPage={updateAnswerOnPage}
                        maxNumOfDropdowns={12}
                        marginBottom={60}
                        options={[
                            'White',
                            'Black',
                            'Asian',
                            'Latin',
                            'Hispanic',
                            'Indigenous American',
                            'Indigenous non-American',
                            'Bi/multiracial',
                            'Pacific Islander',
                            'POC',
                            'Prefer not to say',
                            'Other',
                        ]}
                    />
                </View>

                <YesNoSwitch
                    hasIcon
                    hasInfoModal
                    stateName='ethnicityDealbreaker'
                    statePath={null}
                    label='Is this a dealbreaker?'
                    value={props.pageQuestions.ethnicityDealbreaker}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
            </View>
        </View>
    )
}