import React, { useEffect } from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateModalities = (props) => {
    const { userType, preferenceOrProfile, prefAndProfileOptions } = useAppContext()

    useEffect(() => {
        console.log("prefAndProfileOptions.modalityOptions", prefAndProfileOptions.modalityOptions, props.value[preferenceOrProfile].modality);
    });

    const updateCallback = (...args) => {
        console.log(...args);
        props.updateAnswerOnPage(...args);
    }

    return (
        <View>
            <EditPreferenceSelection
                arrayOfObjects
                otherHasTwoInputs
                value={props.value[preferenceOrProfile].modality}
                stateName='modality'
                statePath={preferenceOrProfile}
                firstPropName='value'
                secondPropName='description'
                removePreference={props.removePreference}
                updateAnswerOnPage={updateCallback}
                maxNumOfPrefs={userType === '0' ? 41 : 3}
                options={prefAndProfileOptions.modalityOptions}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='modality'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.modality}
                        onChangeFunc={updateCallback}
                    />
                </View>
            }
        </View>
    )
}