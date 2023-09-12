import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'
import { Button } from '../../../Components/Button'
import { AddAnotherTextInput } from '../../../Components/AddAnotherTextInput'

import {
    View,
} from 'react-native'


export const Page14Education = (props) => {
    const pageStateName = 'page14Education'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flex1, styles.width100]}>
            <View style={[styles.paddingH10]}>
                <Text
                    text='Education'
                    fontSize={19}
                    lineHeight={23}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    marginBottom={15}
                />
            </View>
            <View>
                <AddAnotherTextInput
                    stateName='education'
                    statePath={null}
                    value={props.pageQuestions.education}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={3}
                    marginBottom={33}
                />
            </View>

            <View>
                <TextInput
                    height={244}
                    multiline={true}
                    maxLength={400}
                    label='Please write a short biography.'
                    value={props.pageQuestions.bio}
                    onChangeFunc={newValue => updateAnswerOnPage('bio', null, newValue)}
                    placeholder='Type here'
                    marginBottom={20}
                    inputStyle={{ paddingBottom: 25 }}
                />
                <Text
                    text={props.pageQuestions.bio ? `${props.pageQuestions.bio.length}/400` : '0/400'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textStyle={{ position: 'absolute', bottom: 25, right: 20, backgroundColor: '#fff' }}
                />
            </View>

        </View>
    )
}

