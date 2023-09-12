import React from 'react'
import styles from '../Styles'

import { Text } from '../Components/Text'
import { Button } from '../Components/Button'

import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    ImageBackground,
} from 'react-native'

import infoIconRed from '../Assets/Images/infoIcon-red.png'

import modalBlurredBackground from '../Assets/Images/modalBlurredBackground.png'


export const InfoModal = (props) => {

    return (
        <View>
            {props.hasIcon &&
                <TouchableOpacity onPress={props.openModalFunc} style={{ marginTop: 10, marginLeft: 9 }}>
                    <Image source={infoIconRed} style={{ width: 22, height: 22 }} />
                </TouchableOpacity>
            }

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
                                text={props.modalText}
                                fontSize={28}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorGrey2}
                                marginBottom={50}
                                textAlign='center'
                            />

                            {props.btnText &&
                                <Button
                                    text={props.btnText}
                                    onPress={props.btnFunc}
                                    width='50%'
                                />
                            }
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
        </View>
    )
}