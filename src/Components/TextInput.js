import React from 'react'
import styles from '../Styles'

import { Text } from './Text'

import {
    View,
    TextInput as RNTextInput,
    Keyboard,
} from 'react-native'

// Can have or have not a label

export const TextInput = (props) => {

    return (
        <View style={[
            styles.width100,
            styles.paddingH9,
            { marginBottom: props.marginBottom ? props.marginBottom : 24 }
        ]}
        >
            {props.label &&
                <Text
                    text={props.label}
                    fontSize={19}
                    lineHeight={23}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    marginBottom={12}
                />
            }

            <RNTextInput
                secureTextEntry={props.secureTextEntry}
                style={[styles.textInput, { height: props.height ? props.height : 45, paddingTop: props.multiline && 15, paddingBottom: props.multiline && 15 }, props.inputStyle]}
                onChangeText={newValue => props.onChangeFunc(newValue)}
                value={props.value}
                multiline={props.multiline}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : styles.colorBlack0.color}
                textAlignVertical={'top'}
                onFocus={props?.onFocus}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                returnKeyType={props.returnKeyType ? props.returnKeyType : 'done'}
                onEndEditing={props.onEndEditing ?
                    () => (Keyboard.dismiss, props.onEndEditing())
                    :
                    () => Keyboard.dismiss
                }
                onSubmitEditing={() => Keyboard.dismiss}
            />
        </View>
    )
}