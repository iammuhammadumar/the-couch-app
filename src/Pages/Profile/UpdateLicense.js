import React, { useState } from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'
import { convertStateToAbbr, convertStateToFullName } from '../../Functions/convertStateName'
import { useNavigation } from '@react-navigation/native'

import { OneDropdown } from '../../Components/OneDropdown'
import { TextInput } from '../../Components/TextInput'
import { Button } from '../../Components/Button'

import {
    View,
} from 'react-native'



export const UpdateLicense = (props) => {
    const { userData, setUserData, prefAndProfileOptions } = useAppContext()
    const navigation = useNavigation()
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [licenseInfo, setLicenseInfo] = useState(
        {
            license_type: userData.license_type,
            state: userData.state,
            license_number: userData.license_number
        }
    )

    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        setLicenseInfo({ ...licenseInfo, [stateName]: newValue })
    }

    // const confirmChanges = () => {
    //     setConfirmLoading(true)

    //     setUserData({
    //         ...userData,
    //         license_type: [licenseInfo.license_type],
    //         license_number: licenseInfo.license_number,
    //         state: licenseInfo.state,
    //     })
    //     setConfirmLoading(false)
    //     navigation.goBack()
    // }

    return (
        <View>
            <OneDropdown
                small
                stateName='license_type'
                statePath={null}
                value={licenseInfo.license_type[0]}
                updateAnswerOnPage={updateAnswerOnPage}
                label='Type of License'
                marginBottom={28}
                options={prefAndProfileOptions.licenseOptions}
            />

            <TextInput
                label='State'
                value={licenseInfo.state}
                onChangeFunc={newValue => updateAnswerOnPage('state', null, newValue)}
                placeholder='Type here'
            />

            <TextInput
                label={licenseInfo.license_type[0].includes('Associate') ? 'Pre-License Number' : 'License Number'}
                value={licenseInfo.license_number}
                onChangeFunc={newValue => updateAnswerOnPage('license_number', null, newValue)}
                placeholder='Type here'
                marginBottom={28}
            />

            <Button
                text={confirmLoading ? 'setLoading' : 'Confirm'}
                onPress={confirmChanges}
                btnStyle={[styles.alignCenter]}
            />
        </View>
    )
}