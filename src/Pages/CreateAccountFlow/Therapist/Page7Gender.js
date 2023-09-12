import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'

import {
    View,
} from 'react-native'


export const Page7Gender = (props) => {
    const pageStateName = 'page7Gender'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        // let stateArray = [...props.pageQuestions.gender]
        // if (stateArray.length === 0) {
        //     if (newValue.includes('Other')) {
        //         stateArray.push({
        //             name: newValue.split('Other - ')[1],
        //             other: true
        //         })
        //     } else {
        //         stateArray.push({
        //             name: newValue,
        //             other: false
        //         })
        //     }
        // } else {
        //     if (newValue.includes('Other')) {
        //         stateArray[0].name = newValue.split('Other - ')[1]
        //         stateArray[0].other = true
        //     } else {
        //         stateArray[0].name = newValue
        //         stateArray[0].other = false
        //     }
        // }
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Which category best represents your gender identity?'
                fontSize={24}
                lineHeight={29}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={11}
            />

            <Text
                text='Choose one'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={74}
            />

            <View style={[styles.paddingH10]}>
                <AddAnotherDropdown
                    small
                    stateName='gender'
                    statePath={null}
                    value={props.pageQuestions.gender}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={1}
                    marginBottom={28}
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
        </View>
    )
}