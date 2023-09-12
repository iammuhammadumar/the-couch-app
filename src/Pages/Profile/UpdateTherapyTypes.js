import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
// import { YesNoSwitch } from '../../Components/YesNoSwitch'

import {
    View,
} from 'react-native'


export const UpdateTherapyTypes = (props) => {
    const { preferenceOrProfile } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].therapy_type}
                stateName='therapy_type'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={5}
                options={['Individual', 'Couples', 'Family', 'Teen', 'Child']}
                marginBottom={30}
            />
        </View>
    )
}