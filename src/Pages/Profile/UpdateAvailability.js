import React, { useState, useEffect } from 'react'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext'

import { AvailabilityCalendar } from '../../Components/AvailabilityCalendar'
import { AvailabilityCalendarConfirm } from '../../Components/AvailabilityCalendarConfirm'
import { YesNoSwitch } from '../../Components/YesNoSwitch'
import { Button } from '../../Components/Button'

import {
    View,
} from 'react-native'



export const UpdateAvailability = (props) => {
    const { raClient, userType, setUserData, preferenceOrProfile } = useAppContext()
    const [editing, setEditing] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [newUserData, setNewUserData] = useState({
        preference: {
            availability: props.value?.preference?.availability,
        },
        dealbreaker: {
            availability: userType === '0' ? props.value.dealbreaker.availability : false,
        },
        sameTimeForEntireWeek: false,
        sameMonFriTime: false,
        alwaysAvailable: false,
    })

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        if (statePath) {
            setNewUserData({
                ...newUserData,
                [statePath]: {
                    ...newUserData[statePath],
                    [stateName]: newValue
                }
            })
        } else {
            setNewUserData({ ...newUserData, [stateName]: newValue })
        }
        // console.log('newUserData', newUserData)
    }

    const confirmChanges = async () => {
        try {
            setConfirmLoading(true)
            let res = await raClient.updateUser({
                preference: {
                    availability: newUserData?.preference?.availability
                },
                dealbreaker: {
                    availability: newUserData.dealbreaker.availability || false
                }
            })
            if (res) {
                console.log(res)
                setUserData(res)
                setConfirmLoading(false)
                setEditing(false)
            }
        } catch (err) {
            console.log(err)
            setConfirmLoading(false)
            setEditing(false)
            alert('Unable to save changes at this time. Please try again later.')
        }
    }

    return (
        <View style={[styles.paddingB20]}>
            {!editing ?
                <View style={{ paddingLeft: 12 }}>
                    <AvailabilityCalendarConfirm
                        data={newUserData?.preference?.availability}
                        marginBottom={25}
                    />
                    <View style={[styles.paddingH24]}>
                        <Button
                            text='Change'
                            onPress={() => setEditing(true)}
                        />
                    </View>
                </View>
                :
                <View style={[styles.paddingH32]}>
                    <AvailabilityCalendar
                        stateName='availability'
                        statePath="preference"
                        value={newUserData?.preference?.availability || []}
                        pageQuestions={{ ...newUserData }}
                        updateAnswerOnPage={updateAnswerOnPage}
                        marginBottom={38}
                    />

                    {userType === '0' &&
                        <YesNoSwitch
                            stateName='availability'
                            statePath='dealbreaker'
                            label='Is this a dealbreaker?'
                            value={newUserData.dealbreaker.availability}
                            onChangeFunc={updateAnswerOnPage}
                            marginBottom={38}
                        />
                    }

                    <Button
                        text={confirmLoading ? 'setLoading' : 'Confirm'}
                        onPress={confirmChanges}
                    />
                </View>
            }
        </View>
    )
}