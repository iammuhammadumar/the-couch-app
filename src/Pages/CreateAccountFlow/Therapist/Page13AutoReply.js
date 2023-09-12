import React, { useState, useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'
import { Button } from '../../../Components/Button'

import {
    View,
} from 'react-native'


export const Page13AutoReply = (props) => {
    const pageStateName = 'page13AutoReply'


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flex1, styles.width100]}>
            <Text
                text='Set up an automatic reply message.'
                fontSize={28}
                lineHeight={28}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={40}
            />


            <View>
                <TextInput
                    height={131}
                    multiline={true}
                    maxLength={400}
                    label='Type message here.'
                    value={props.pageQuestions.autoResponse !== 'Thanks so much for connecting with me. How are you today?' && props.pageQuestions.autoResponse !== 'I offer free 30-minute consultations. Would you like to schedule a time?' ? props.pageQuestions.autoResponse : ''}
                    onChangeFunc={newValue => updateAnswerOnPage('autoResponse', null, newValue)}
                    placeholder='Type here'
                    marginBottom={20}
                    inputStyle={{ paddingBottom: 25 }}
                />
                <Text
                    text={props.pageQuestions.autoResponse !== 'Thanks so much for connecting with me. How are you today?' && props.pageQuestions.autoResponse !== 'I offer free 30-minute consultations. Would you like to schedule a time?' ? props.pageQuestions.autoResponse ? `${props.pageQuestions.autoResponse.length} / 400` : '0/400' : '0/400'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textStyle={{ position: 'absolute', bottom: 25, right: 20, backgroundColor: '#fff' }}
                />
            </View>

            <View style={[styles.paddingH10]}>

                <Text
                    text='You can also choose on of the following automatic responses.'
                    fontSize={18}
                    lineHeight={22}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    marginBottom={15}
                />

                <Button
                    text='Thanks so much for connecting with me. How are you today?'
                    onPress={() => updateAnswerOnPage('autoResponse', null, 'Thanks so much for connecting with me. How are you today?')}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textAlign='left'
                    backgroundColor={props.pageQuestions.autoResponse === 'Thanks so much for connecting with me. How are you today?' ? styles.backgroundColorOrange2 : styles.backgroundColorWhite}
                    btnStyle={styles.border1}
                    marginBottom={20}
                />
                <Button
                    text='I offer free 30-minute consultations. Would you like to schedule a time?'
                    onPress={() => updateAnswerOnPage('autoResponse', null, 'I offer free 30-minute consultations. Would you like to schedule a time?')}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textAlign='left'
                    backgroundColor={props.pageQuestions.autoResponse === 'I offer free 30-minute consultations. Would you like to schedule a time?' ? styles.backgroundColorOrange2 : styles.backgroundColorWhite}
                    btnStyle={styles.border1}
                    marginBottom={15}
                />
            </View>
        </View>
    )
}

