import React, { useState } from 'react'
import styles from '../Styles'

import { Text } from './Text'
import { Button } from './Button'
import { TextInput } from './TextInput'


import {
    View,
    Modal,
    ImageBackground,
} from 'react-native'

import modalBlurredBackground from '../Assets/Images/modalBlurredBackground.png'


export const SpecifyOtherModal = (props) => {
    const [otherValue, setOtherValue] = useState('')
    const [otherDescription, setOtherDescription] = useState('')

    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType='fade'
        >
            <ImageBackground source={modalBlurredBackground} style={[styles.flex1]}>
                <View style={[styles.flex1, styles.headerBackTopPadding]}>
                    <Button
                        text='Back'
                        fontSize={18}
                        lineHeight={34}
                        fontFamily='primary'
                        fontWeight={300}
                        backgroundColor='rgba(0,0,0,0)'

                        onPress={props.closeModalFunc}
                        marginBottom={63}
                        btnStyle={{ alignSelf: 'flex-start' }}
                    />
                    <View style={[styles.modalPadding, styles.alignCenter]}>
                        <Text
                            text={props.forTherapist ? 'Please explain:' : 'Please specify.'}
                            fontSize={28}
                            lineHeight={34}
                            fontFamily='primary'
                            fontWeight={700}
                            color={styles.colorGrey2}
                            textAlign='center'
                            marginBottom={45}
                        />

                        <TextInput
                            value={otherValue}
                            onChangeFunc={newValue => setOtherValue(newValue)}
                            placeholder={props.therapistSelectsModality ? 'Modality name' : 'Type here'}
                            marginBottom={props.therapistSelectsModality ? 25 : 33}
                        />

                        {props.therapistSelectsModality &&
                            <TextInput
                                height={131}
                                multiline={true}
                                value={otherDescription}
                                onChangeFunc={newValue => setOtherDescription(newValue)}
                                placeholder='Brief description'
                                marginBottom={57}
                            />
                        }

                        <Button
                            text='Enter'
                            onPress={() => { props.specifyOtherFunc(otherValue, otherDescription), setOtherValue(''), setOtherDescription('') }}
                            width='50%'
                        />
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    )
}