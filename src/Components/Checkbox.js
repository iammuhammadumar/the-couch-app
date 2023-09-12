import React from 'react'
import { View } from 'react-native'
import { Checkbox as RNCheckbox } from 'react-native-paper'
import styles from '../Styles';

export const Checkbox = (props) => {
    return (
        <View>
            <RNCheckbox.Item
                label={props.label}
                status={props.checked}
                onPress={props.onPress}
                mode="android"
                color={styles.colorOrange2.color}
            />
        </View>
    )
}