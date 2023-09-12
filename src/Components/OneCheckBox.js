import React from 'react'
import styles from '../Styles'

import Checkbox from '@react-native-community/checkbox';
import { Text } from './Text'

import {
    View,
} from 'react-native'


export const OneCheckBox = (props) => {

    return (
        <View style={[styles.flexRowAlignCenter, { marginBottom: props.marginBottom }]}>
            <View style={{ width: props.small ? 19 : 21, height: props.small ? 18 : 22, backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent', borderRadius: 2, marginRight: props.marginRight ? props.marginRight : props.small ? 13 : 27 }}>
                <Checkbox
                    value={props.value}
                    onValueChange={newValue => {
                        if (props.stateName || props.statePath) {
                            props.onChangeFunc(props.stateName, props.statePath, newValue)
                        } else {
                            props.onChangeFunc(newValue)
                        }
                    }}
                    boxType="square"
                    tintColors={{ true: '#FFD4A5', false: '#707070' }} // Android
                    onFillColor={'#FFD4A5'} // On - fill color on ios
                    onCheckColor={'#6D6A69'} // On  - check mark color on ios
                    onTintColor={'#707070'} // On - border color on ios
                    tintColor={'#707070'} // Off - border color on ios
                    animationDuration={0.2} // ios only
                    lineWidth={1.5} // border and chackmark width on ios
                    style={{ width: props.small ? 18 : 20, height: props.small ? 18 : 22 }}
                />
            </View>

            <Text
                text={props.label}
                fontSize={props.small ? 13 : 17}
                lineHeight={props.small ? 16 : 20}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
            />
        </View>
    )
}