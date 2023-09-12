import React from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const Page8Gender = (props) => {
    const pageStateName = 'page8Gender'

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Do you have a gender preference for your therapist?'
                fontSize={24}
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
                marginBottom={40}
            />

            <View style={[styles.paddingH10]}>
                <View style={[styles.flexGrow1]}>
                    <AddAnotherDropdown
                        stateName='gender'
                        statePath={null}
                        value={props.pageQuestions.gender}
                        updateAnswerOnPage={updateAnswerOnPage}
                        maxNumOfDropdowns={15}
                        marginBottom={60}
                        options={[
                            'Agender',
                            'Cisgender Man',
                            'Cisgender Woman',
                            'Genderqueer',
                            'Man',
                            'Non-Binary',
                            'Questioning',
                            'Transgender man',
                            'Transgender woman',
                            'Two-spirit',
                            'Woman',
                            'Gender-fluid',
                            'Not sure',
                            'Prefer not to say',
                            'Other',
                        ]}
                    />
                </View>

                <YesNoSwitch
                    hasIcon
                    hasInfoModal
                    stateName='genderDealBreaker'
                    statePath={null}
                    label='Is this a dealbreaker?'
                    value={props.pageQuestions.genderDealBreaker}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
            </View>
        </View>
    )
}