import React from 'react'
import styles from '../Styles'

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { MileRangeCustomLabel } from './MileRangeCustomLabel'

import { Text } from './Text'

import {
    View,
} from 'react-native'


export const MileRangeSlider = (props) => {

    return (
        <View style={{ marginBottom: props.marginBottom }}>

            {props.label &&
                <Text
                    text={props.label}
                    fontSize={props.smallLabel ? 14 : 17}
                    lineHeight={31}
                    fontFamily='primary'
                    fontWeight={700}
                    color={props.labelColor ? props.labelColor : styles.colorBlack0}
                    marginBottom={16}
                />
            }

            <MultiSlider
                values={props.value} // An array of either 1 number for 1 thumb or an array of 2 numbers for 2 thumbs
                min={props.min}
                max={props.max}
                onValuesChangeFinish={(newValues) => props.onChangeFunc(props.stateName, props.statePath, newValues[0])}
                showSteps={true}
                showStepMarkers={true}
                showStepLabels={true}
                enableLabel={true}
                customLabel={MileRangeCustomLabel}
                // {container / track / selected / unselected / markerContainer / marker / pressedMarker / step / stepLabel / StepMarker} Style
                containerStyle={{ height: 15 }}
                trackStyle={{ height: 1, backgroundColor: styles.backgroundColorGrey0.backgroundColor }}
                selectedStyle={{ height: 2, backgroundColor: styles.backgroundColorOrange2.backgroundColor }}
                markerStyle={{ width: 15, height: 15, backgroundColor: styles.backgroundColorOrange2.backgroundColor, shadowOffset: { 'width': 0, 'height': 0 }, shadowRadius: 0, borderWidth: 0 }}
            />
        </View>
    )
}