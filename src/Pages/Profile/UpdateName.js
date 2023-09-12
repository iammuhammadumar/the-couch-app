import React, { useState } from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'
import { useNavigation } from '@react-navigation/native'

import { TextInput } from '../../Components/TextInput'
import { Button } from '../../Components/Button'

import {
    View,
} from 'react-native'



export const UpdateName = (props) => {
    const { raClient, userData, setUserData } = useAppContext()
    const navigation = useNavigation()
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [newUserData, setNewUserData] = useState(
        {
            given_name: userData.given_name,
            family_name: userData.family_name,
        }
    )

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        setNewUserData({ ...newUserData, [stateName]: newValue })
    }

    const confirmChanges = async () => {
        try {
            setConfirmLoading(true)
            let res = await raClient.updateUser(newUserData)
            if (res) {
                console.log(res)
                setUserData(res)
                setConfirmLoading(false)
                navigation.goBack()
            }
        } catch (err) {
            console.log(err)
            setConfirmLoading(false)
            alert('Unable to save changes at this time. Please try again later.')
        }
    }

    return (
        <View>

            <TextInput
                label='First Name'
                value={newUserData.given_name}
                onChangeFunc={newValue => updateAnswerOnPage('given_name', null, newValue)}
                placeholder='Type here'
            />

            <TextInput
                label='Last Name'
                value={newUserData.family_name}
                onChangeFunc={newValue => updateAnswerOnPage('family_name', null, newValue)}
                placeholder='Type here'
                marginBottom={64}
            />

            <Button
                text={confirmLoading ? 'setLoading' : 'Done'}
                onPress={confirmChanges}
                btnStyle={[styles.alignCenter]}
            />
        </View>
    )
}