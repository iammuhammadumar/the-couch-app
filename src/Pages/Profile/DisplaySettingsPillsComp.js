import React from 'react'
import styles from '../../Styles'

import { Text } from '../../Components/Text'

import {
    View,
    TouchableOpacity,
} from 'react-native'

export const DisplaySettingsPillsComp = (props) => {

    return (
        <View style={[styles.width100, styles.height80, styles.justifyEvenly, styles.paddingR20, { marginBottom: props.marginBottom }]}>
            <View style={[styles.flexRowAlignCenter, styles.justifySpaceBetween]}>
                <Text
                    text={props.label}
                    fontSize={12}
                    lineHeight={12}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#6D6A69'
                />
                <TouchableOpacity onPress={props.editFunc}>
                    <Text
                        text='Edit >'
                        fontSize={14}
                        lineHeight={14.4}
                        fontFamily='primary'
                        fontWeight={700}
                        color='#6D6A69'
                    />
                </TouchableOpacity>
            </View>

            <View style={[styles.flexRow, styles.overflowHidden, { height: 32 }]}>
                {props.value.length ?
                    props.value.map((item, index) => {
                        let itemToShow = null

                        if (item.value && item.value.trim().length > 0) {
                            itemToShow = item.value
                        } else if (typeof item === 'string' && item.trim().length > 0) {
                            itemToShow = item
                        }
                        if (itemToShow) {
                            return (
                                <View key={index} style={[styles.displayPrefPills]}>
                                    <Text
                                        text={item}
                                        fontSize={12}
                                        lineHeight={14.4}
                                        fontFamily='primary'
                                        fontWeight={700}
                                        color='#6D6A69'
                                    />
                                </View>
                            )
                        }
                    }) :
                    <Text
                        text={props.placeholder}
                        fontSize={12}
                        lineHeight={14.4}
                        fontFamily='primary'
                        fontWeight={700}
                        color='#6D6A69'
                    />
                }
            </View>
        </View>
    )
}