import React from 'react'
import styles from '../Styles'

import Checkbox from '@react-native-community/checkbox';
import { Text } from './Text'

import {
    View,
} from 'react-native'

// Can have or have not a label

export const OneOptionCheckBoxes = (props) => {

    return (
        <View style={[styles.width100, { marginBottom: props.marginBottom }]}>
            {props.label &&
                <Text
                    text={props.label}
                    fontSize={22}
                    lineHeight={34}
                    fontFamily='primary'
                    fontWeight={700}
                    textAlign='center'
                    color={styles.colorGrey2}
                    marginBottom={12}
                />
            }

            <View style={[styles.alignCenter]}>
                <View>
                    {props.options.map((option, i) => {
                        return (
                            <View
                                key={option}
                                style={[styles.flexRowAlignCenter, styles.justifyStart, { marginBottom: 24 }]}
                            >
                                <Checkbox
                                    value={props.value === option}
                                    onValueChange={newValue => {
                                        if (newValue === true) {
                                            props.onChangeFunc(props.stateName, props.statePath, option);
                                        } else {
                                            props.onChangeFunc(props.stateName, props.statePath, '');
                                        }
                                    }}
                                    boxType="square"
                                    tintColors={{ true: '#FFD4A5', false: '#707070' }} // Android
                                    onFillColor={'#FFD4A5'} // On - fill color on ios
                                    onCheckColor={'#6D6A69'} // On  - check mark color on ios
                                    tintColor={'#707070'} // Off - border color on ios
                                    onTintColor={'#707070'} // On - border color on ios
                                    animationDuration={0.2} // ios only
                                    lineWidth={1.5} // border and chackmark width on ios
                                    style={{ width: 20, height: 22, marginRight: 27 }}
                                />

                                <Text
                                    text={option}
                                    fontSize={17}
                                    lineHeight={20}
                                    fontFamily='primary'
                                    fontWeight={700}
                                    color={styles.colorGrey2}
                                />
                            </View>
                        )
                    })
                    }
                </View>
            </View>
        </View>
    )
}