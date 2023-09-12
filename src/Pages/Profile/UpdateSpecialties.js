import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateSpecialties = (props) => {
    const { userType, preferenceOrProfile, prefAndProfileOptions } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].specialty}
                stateName='specialty'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={userType === '0' ? 41 : 3}
                options={prefAndProfileOptions.specialtyOptions}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='specialty'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.specialty}
                        onChangeFunc={props.updateAnswerOnPage}
                    />
                </View>
            }
        </View>
    )
}