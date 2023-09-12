import React from 'react'
import styles from '../Styles'

import { Text } from './Text'
import { Button } from './Button'

import {
    Dimensions,
    Modal,
    View,
    Linking,
} from 'react-native'


export const SuicidalModal = (props) => {
    let screenHeight = Dimensions.get('window').height

    return (
        <Modal
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            transparent={true}
            animationType='fade'
        >
            <View style={[styles.flex1, styles.alignCenter, styles.paddingH20, { paddingTop: screenHeight >= 550 ? 210 : 50, backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                <View style={[styles.paddingH10]}>
                    <Text
                        text='Are you currently having thoughts of suicide?'
                        fontSize={25}
                        lineHeight={25}
                        fontFamily='primary'
                        fontWeight={700}
                        color='#fff'
                        textAlign='center'
                        marginBottom={10}
                    />

                    <Text
                        text='If you are contemplating suicide or may harm yourself then we recommend calling the suicide hotline for immediate help.'
                        fontSize={17}
                        lineHeight={25}
                        fontFamily='primary'
                        fontWeight={400}
                        color='#fff'
                        textAlign='center'
                        marginBottom={50}
                    />
                </View>

                <View style={[styles.width100, styles.flexRow, styles.justifySpaceBetween]}>
                    <Button
                        width='46%'
                        text='Call suicide hotline now'
                        onPress={() => Linking.openURL('tel:800-273-8255')}
                        backgroundColor='#FDD6A2'
                    />

                    <Button
                        width='46%'
                        text='Continue logging in'
                        onPress={props.onRequestClose}
                        backgroundColor='#FDD6A2'
                    />
                </View>
            </View>
        </Modal>
    )
}