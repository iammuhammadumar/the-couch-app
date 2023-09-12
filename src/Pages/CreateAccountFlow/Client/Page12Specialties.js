import React, { useEffect } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'

import {
    Platform,
    View,
} from 'react-native'


export const Page12Specialties = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page12Specialties'

    useEffect(() => {
        props.setNextPageNumber(12)
    }, [])


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Let us know what you are looking for help with.'
                fontSize={26}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={Platform.OS === 'ios' ? 4 : 15}
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
                        stateName='specialties'
                        statePath={null}
                        value={props.pageQuestions.specialties}
                        updateAnswerOnPage={updateAnswerOnPage}
                        maxNumOfDropdowns={41}
                        marginBottom={60}
                        options={prefAndProfileOptions.specialtyOptions}
                    />
                </View>

                <YesNoSwitch
                    hasIcon
                    hasInfoModal
                    stateName='specialtiesDealBreaker'
                    statePath={null}
                    label='Is this a dealbreaker?'
                    value={props.pageQuestions.specialtiesDealBreaker}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
            </View>
        </View>
    )
}