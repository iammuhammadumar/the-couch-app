import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateEthnicity = (props) => {
    const { userType, preferenceOrProfile } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].race}
                stateName='race'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={userType === '0' ? 12 : 3}
                options={[
                    'White',
                    'Black',
                    'Asian',
                    'Latin',
                    'Hispanic',
                    'Indigenous American',
                    'Indigenous non-American',
                    'Bi/multiracial',
                    'Pacific Islander',
                    'POC',
                    'Prefer not to say',
                    'Other',
                ]}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='race'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.race}
                        onChangeFunc={props.updateAnswerOnPage}
                    />
                </View>
            }
        </View>
    )
}