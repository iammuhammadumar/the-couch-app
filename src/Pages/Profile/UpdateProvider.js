import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateProvider = (props) => {
    const { userType, preferenceOrProfile, prefAndProfileOptions } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].insurance}
                stateName='insurance'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={userType === '0' ? 2 : 46}
                options={prefAndProfileOptions.insuranceOptions}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='insurance'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.insurance}
                        onChangeFunc={props.updateAnswerOnPage}
                    />
                </View>
            }
        </View>
    )
}