import React from 'react'
import styles from '../../Styles'

import { Button } from '../../Components/Button'
import { Text } from '../../Components/Text'

import {
    Platform,
    Dimensions,
    View,
} from 'react-native'


export const TabsOnboardingModalTextComp = (props) => {

    let getScreenHeight = Dimensions.get('window').height

    let justifyType = 'center'

    if (props.currentPage === 5 || props.currentPage === 6 || props.currentPage === 7 || props.currentPage === 8) {
        justifyType = 'flex-end'
    } else {
        justifyType = 'center'
    }

    return (
        <View style={[styles.width100, styles.flexGrow1, styles.justifyEnd, { paddingTop: getScreenHeight >= 550 ? 0 : 30, marginBottom: 30 }]}>
            <Text
                text={props.text1}
                fontSize={35}
                lineHeight={35}
                fontFamily='primary'
                fontWeight={700}
                color='#fff'
                textAlign='center'
                marginBottom={23}
            />
            <View style={{ height: getScreenHeight > 550 ? 197 : 'auto', paddingBottom: 20 }}>
                <Text
                    text={props.text2}
                    fontSize={17}
                    lineHeight={25}
                    fontFamily='primary'
                    fontWeight={400}
                    color='#fff'
                    textAlign='center'
                />
            </View>
            <Button

                text={props.btnText}
                onPress={props.onPress}
                fontSize={21}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={700}
                width='100%'
                // color='#fff'
                backgroundColor='#FDD6A2'
            // marginBottom={Platform.OS === 'ios' ? 55 : 100}
            />
        </View>
    )
}