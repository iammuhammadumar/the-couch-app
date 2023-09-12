import React from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { EditPreferenceSelection } from './EditPreferenceSelection'
import { YesNoSwitch } from '../../Components/YesNoSwitch'
import { OneCheckBox } from '../../Components/OneCheckBox'
import { Text } from '../../Components/Text'

import {
    View,
} from 'react-native'


export const UpdateGender = (props) => {
    const { userType, userData, preferenceOrProfile } = useAppContext()

    return (
        <View>
            <EditPreferenceSelection
                value={props.value[preferenceOrProfile].gender}
                stateName='gender'
                statePath={preferenceOrProfile}
                removePreference={props.removePreference}
                updateAnswerOnPage={props.updateAnswerOnPage}
                maxNumOfPrefs={userType === '0' ? 15 : 1}
                options={[
                    'Agender',
                    'Cisgender Man',
                    'Cisgender Woman',
                    'Genderqueer',
                    'Man',
                    'Non-Binary',
                    'Questioning',
                    'Transgender man',
                    'Transgender woman',
                    'Two-spirit',
                    'Woman',
                    'Gender-fluid',
                    'Not sure',
                    'Prefer not to say',
                    'Other',
                ]}
                marginBottom={30}
            />

            {userType === '0' &&
                <View style={[styles.alignCenter]}>
                    <YesNoSwitch
                        stateName='gender'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.gender}
                        onChangeFunc={props.updateAnswerOnPage}
                        marginBottom={80}
                    />


                    <Text
                        text='LGBTQIA+'
                        fontSize={28}
                        lineHeight={34}
                        fontFamily='primary'
                        fontWeight={700}
                        color={styles.colorGrey2}
                        marginBottom={20}
                    />

                    <View style={{ width: '70%' }}>
                        <OneCheckBox
                            large
                            stateName='lgbtqia'
                            statePath={preferenceOrProfile}
                            label='I prefer a LGBTQIA+ identifying therapist'
                            value={props.value[preferenceOrProfile].lgbtqia}
                            onChangeFunc={(stateName, statePath, newValue) => { props.updateAnswerOnPage(stateName, statePath, newValue ? 1 : 0) }}
                            marginBottom={33}
                        />
                    </View>

                    <YesNoSwitch
                        stateName='lgbtqia'
                        statePath='dealbreaker'
                        label='Is this a dealbreaker?'
                        value={props.value.dealbreaker.lgbtqia}
                        onChangeFunc={props.updateAnswerOnPage}
                    />
                </View>
            }
        </View>
    )
}