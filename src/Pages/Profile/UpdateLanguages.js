import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateLanguages = (props) => {
    const { userType, preferenceOrProfile, prefAndProfileOptions } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].language}
                stateName='language'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={36}
                options={prefAndProfileOptions.languageOptions}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='language'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.language}
                        onChangeFunc={props.updateAnswerOnPage}
                    />
                </View>
            }
        </View>
    )
}