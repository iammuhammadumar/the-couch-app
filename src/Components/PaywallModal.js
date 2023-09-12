import React, { useEffect, useState } from 'react';
import styles from '../Styles'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from './Text'
import { Button } from './Button';

import {
    View
} from 'react-native'

const PaywallModal = (props) => {
    const [message, setMessage] = useState("");

    const copyMap = {
        "profile_access": "In order to create a profile so that other therapists and clients can see you, you have to upgrade to the premium plan.",
        "chat_access": "In order to chat with potential clients and network with other therapists, you have to upgrade to the premium plan."
    };

    useEffect(() => {
        setMessage(copyMap[props.feature]);
    }, [])

    return (
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
            style={[{ height: '100%', position: 'absolute', zIndex: 3, left: 0, right: 0 }, styles.flex1, styles.headerBackTopPadding]}>
            <View style={[styles.alignCenter, { paddingTop: 40, paddingRight: 32, paddingLeft: 23, paddingBottom: 40 }]}>
                <Text
                    text='This Feature Is Unavailable'
                    fontSize={35}
                    lineHeight={35}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#fff'
                    textAlign='center'
                    marginBottom={33}
                />
                <Text
                    text={message}
                    fontSize={17}
                    lineHeight={25}
                    fontFamily='primary'
                    fontWeight={300}
                    color='#fff'
                    textAlign='center'
                    marginBottom={60}
                />
                <Button
                    onPress={() => props.unlockFeatures()}
                    text='Unlock All Features!'
                    fontSize={13}
                    lineHeight={16}
                    width='80%'
                    paddingBottom={14}
                />
            </View>
        </LinearGradient>
    )
}

export default PaywallModal