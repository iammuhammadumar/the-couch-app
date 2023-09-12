import React, { useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'


import {
    View,
} from 'react-native'


export const Page5TherapyType = (props) => {
    const pageStateName = 'page5TherapyType'

    const therapyOptions = ['Individual', 'Couples', 'Family', 'Teen', 'Child']

    const updateAnswerOnPage = (stateName, statePath, option) => {
        let therapyTypeArray = [...props.pageQuestions.therapyTypes]

        // let isOptionAlreadyInState = therapyTypeArray.filter(obj => obj.name === option)
        // if (isOptionAlreadyInState.length === 0) { // add option obj
        //     console.log('isOptionAlreadyInState, empty so add: ', isOptionAlreadyInState)
        //     therapyTypeArray.push({
        //         id: `${option}${therapyTypeArray.length}`,
        //         name: option,
        //         other: false
        //     })
        // } else { // remove option obj
        //     therapyTypeArray = therapyTypeArray.filter(obj => obj !== isOptionAlreadyInState[0])
        // }
        if (therapyTypeArray.indexOf(option) >= 0) {
            therapyTypeArray = therapyTypeArray.filter(str => str !== option)
        } else {
            therapyTypeArray.push(option)
        }
        props.updateAnswerOnPage(pageStateName, stateName, statePath, therapyTypeArray)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Which type of therapy are you looking for?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={34}
            />

            <View style={[styles.paddingH10]}>
                {therapyOptions.map((option, index) => {
                    // let isActive = Boolean(props.pageQuestions.therapyTypes.filter(obj => obj.name === option).length === 1)
                    let isActive = Boolean(props.pageQuestions.therapyTypes.indexOf(option) >= 0)
                    return (
                        <Button
                            key={index}
                            text={option}
                            onPress={() => updateAnswerOnPage('therapyTypes', null, option)}
                            backgroundColor={isActive ? styles.backgroundColorRed1.backgroundColor : styles.backgroundColorRed0.backgroundColor}
                            color={isActive && styles.colorWhite.color}
                            marginBottom={index !== 4 ? 35 : 10}
                        />
                    )
                })}
            </View>
        </View>
    )
}