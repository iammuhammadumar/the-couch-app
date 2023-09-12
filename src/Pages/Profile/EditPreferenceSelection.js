import React, { useState, useEffect } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button'
import { PrefAddAnother } from './PrefAddAnother'

import xIconGrey from '../../Assets/Images/xIcon-grey.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'



export const EditPreferenceSelection = (props) => {
    return (
        <View style={{ marginBottom: props.marginBottom }}>
            {props.options && props.value && props.value.map((item, i) => (
                <View key={i} style={[styles.flexRowAlignCenter, { marginBottom: 25 }]}>
                    <Button
                        text={item.value ? item.value : item}
                        btnStyle={{ flex: 1, marginRight: 15 }}
                    />

                    <TouchableOpacity onPress={() => props.removePreference(props.stateName, props.statePath, item)}>
                        <Image source={xIconGrey} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
            ))}

            {!props.value || props.value.length < props.maxNumOfPrefs ?
                <PrefAddAnother
                    value={props.value || []}
                    options={props.options}
                    stateName={props.stateName}
                    statePath={props.statePath}
                    arrayOfObjects={props.arrayOfObjects}
                    otherHasTwoInputs={props.otherHasTwoInputs}
                    firstPropName={props.firstPropName}
                    secondPropName={props.secondPropName}
                    // insurance={props.insurance}
                    updateAnswerOnPage={props.updateAnswerOnPage}
                />
                : null}
        </View>
    )
}