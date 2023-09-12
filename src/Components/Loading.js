import React from 'react';
import styles from '../Styles';
import {
    ActivityIndicator
} from 'react-native';



export const Loading = (props) => {

    return (
        <ActivityIndicator size={props.size ?? 'small'} color={props.color ?? '#6D6A69'} style={[styles.alignSelfCenter, props.style && props.style]} />
    )
}