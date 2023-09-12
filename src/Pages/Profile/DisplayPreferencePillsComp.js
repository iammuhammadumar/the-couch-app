import React from 'react'
import styles from '../../Styles'

import { Text } from '../../Components/Text'

import {
    View,
    TouchableOpacity,
} from 'react-native'

export const DisplayPreferencePillsComp = (props) => {

    return (
        <View style={[styles.width100, styles.height80, styles.justifyEvenly, styles.paddingR20, styles.borderBottomGrey0]}>
            <View style={[styles.flexRowAlignCenter, styles.justifySpaceBetween]}>
                <Text
                    text={props.data.componentLabel}
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
                {props.value && props.data.stateName !== 'availability' && props.value.map((item, index) => {
                    let itemToShow = null

                    if (item && item.value) {
                        itemToShow = item.value
                    } else if (item && typeof item === 'string') {
                        itemToShow = item
                    }

                    if (itemToShow) {
                        return (
                            <View key={index} style={[styles.displayPrefPills]}>
                                <Text
                                    text={itemToShow}
                                    fontSize={12}
                                    lineHeight={14.4}
                                    fontFamily='primary'
                                    fontWeight={700}
                                    color='#6D6A69'
                                />
                            </View>
                        )
                    }
                }
                )}
            </View>
        </View>
    )
}