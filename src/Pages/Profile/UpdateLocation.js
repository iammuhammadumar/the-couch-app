import React, { useState, useEffect } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { Button } from '../../Components/Button'
import { OneOptionCheckBoxes } from '../../Components/OneOptionCheckBoxes'
import { YesNoSwitch } from '../../Components/YesNoSwitch'
// import { InfoModal } from '../../Components/InfoModal'
import { OneCheckBox } from '../../Components/OneCheckBox'
import { TextInput } from '../../Components/TextInput'
import { MileRangeSlider } from '../../Components/MileRangeSlider'

import xIconGrey from '../../Assets/Images/xIcon-grey.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'


export const UpdateLocation = (props) => {
    const { userType, preferenceOrProfile } = useAppContext()
    // const [infoModalVisible, setInfoModalVisible] = useState(false)
    const getMeetingNum = { 'In-person': '0', 'Virtually': '1', 'Open to both': '2' }
    const getMeetingName = { '0': 'In-person', '1': 'Virtually', '2': 'Open to both' }

    const updateMeetingPref = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(stateName, statePath, getMeetingNum[newValue]);
    }

    return (
        <View style={[styles.alignCenter]}>
            <OneOptionCheckBoxes
                stateName='meeting'
                statePath={preferenceOrProfile}
                value={getMeetingName[props.value[preferenceOrProfile].meeting]}
                options={['Virtually', 'In-person', 'Open to both']}
                onChangeFunc={updateMeetingPref}
                marginBottom={44}
            />

            {userType === '0' &&
                <YesNoSwitch
                    hasIcon
                    hasInfoModal
                    stateName='meeting'
                    statePath='dealbreaker'
                    label='Is this a dealbreaker?'
                    value={props.value.dealbreaker.meeting}
                    onChangeFunc={props.updateAnswerOnPage}
                    marginBottom={41}
                />
            }


            {props.value[preferenceOrProfile].meeting === '0' || props.value[preferenceOrProfile].meeting === '2' ?
                // Wheel chair check box
                <OneCheckBox
                    stateName='wheelchair'
                    statePath={preferenceOrProfile}
                    label={userType === '0' ? 'I prefer wheelchair accessibility' : 'I provide wheelchair accessibility'}
                    value={props.value[preferenceOrProfile].wheelchair}
                    onChangeFunc={props.updateAnswerOnPage}
                    marginBottom={50}
                />
                : null}

            <View style={[styles.width100, { marginBottom: 50 }]}>
                {props.value.zip_code && props.value.zip_code.length === 5 ?
                    <View style={[styles.flexRowAlignCenter]}>
                        <Button
                            text={props.value.zip_code}
                            btnStyle={{ flex: 1, marginRight: 15 }}
                        />

                        <TouchableOpacity onPress={() => props.updateAnswerOnPage('zip_code', null, '')}>
                            <Image source={xIconGrey} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <TextInput
                        label='Zip Code'
                        value={props.value.zip_code}
                        onChangeFunc={newValue => props.updateAnswerOnPage('zip_code', null, newValue)}
                        placeholder='Type here'
                        keyboardType='number-pad'
                    />
                }
            </View>

            {userType === '0' &&
                <View style={[styles.width100, styles.height80, styles.justifyEvenly, styles.paddingH20]}>
                    <View style={[styles.alignCenter]}>
                        <MileRangeSlider
                            stateName='distance'
                            statePath="preference"
                            label='Search up to 20 miles away'
                            smallLabel
                            labelColor='#707070'
                            value={[props.value?.preference?.distance]}
                            min={1}
                            max={20}
                            onChangeFunc={props.updateAnswerOnPage}
                        />
                    </View>
                </View>
            }
        </View>
    )
}