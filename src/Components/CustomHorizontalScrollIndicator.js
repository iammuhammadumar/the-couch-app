import { useLinkProps } from '@react-navigation/native'
import React from 'react'

import {
    View,
    Animated,
} from 'react-native'

export const CustomHorizontalScrollIndicator = (props) => {

    return (
        <View
            style={{
                height: props.height,
                width: '100%',
                backgroundColor: props.trackColor,
                borderRadius: 9
            }}
        >
            <Animated.View
                style={{
                    width: props.scrollIndicatorSize !== 0 ? props.scrollIndicatorSize - 32 : 0,
                    height: props.height,
                    borderRadius: 9,
                    backgroundColor: props.thumbColor,
                    transform: [{ translateX: props.scrollIndicatorPosition ? props.scrollIndicatorPosition : props.scrollIndicatorPosition - 32 }]
                }}
            />
        </View>
    )
}