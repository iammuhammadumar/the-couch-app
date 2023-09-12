import React, { useState } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'

import { UpdateGender } from './UpdateGender'
import { UpdateLocation } from './UpdateLocation'
import { UpdateLanguages } from './UpdateLanguages'
import { UpdateEthnicity } from './UpdateEthnicity'
import { UpdateProvider } from './UpdateProvider'
import { UpdateSpecialties } from './UpdateSpecialties'
import { UpdateModalities } from './UpdateModalities'
import { UpdateTherapyTypes } from './UpdateTherapyTypes'
import { UpdateAvailability } from './UpdateAvailability'

import { ScreenLoading } from '../../Components/ScreenLoading'

import {
    View,
} from 'react-native'



const EditPreferences = ({ route, navigation }, props) => {
    const { raClient, userData, setUserData, preferenceOrProfile } = useAppContext()
    const data = route.params
    const [updateLoading, setUpdateLoading] = useState(false)

    const payload = {
        zip_code: userData.zip_code,
        preference: {
            availability: userData?.preference?.availability,
            distance: userData?.preference?.distance,
        },
        dealbreaker: {
            lgbtqia: userData.dealbreaker?.lgbtqia,
            gender: userData.dealbreaker?.gender,
            meeting: userData.dealbreaker?.meeting,
            language: userData.dealbreaker?.language,
            race: userData.dealbreaker?.race,
            insurance: userData.dealbreaker?.insurance,
            specialty: userData.dealbreaker?.specialty,
            modality: userData.dealbreaker?.modality,
            availability: userData.dealbreaker?.availability,
        }
    };

    payload[preferenceOrProfile] = Object.assign(payload[preferenceOrProfile] || {}, {
        gender: userData[preferenceOrProfile]?.gender,
        lgbtqia: userData[preferenceOrProfile]?.lgbtqia,
        meeting: userData[preferenceOrProfile]?.meeting,
        wheelchair: userData[preferenceOrProfile]?.wheelchair,
        language: userData[preferenceOrProfile]?.language,
        race: userData[preferenceOrProfile]?.race,
        insurance: userData[preferenceOrProfile]?.insurance,
        specialty: userData[preferenceOrProfile]?.specialty,
        modality: userData[preferenceOrProfile]?.modality,
        therapy_type: userData[preferenceOrProfile]?.therapy_type,
    });

    const [newUserData, setNewUserData] = useState(payload)

    const Components = {
        'UpdateGender': UpdateGender,
        'UpdateLocation': UpdateLocation,
        'UpdateLanguages': UpdateLanguages,
        'UpdateEthnicity': UpdateEthnicity,
        'UpdateProvider': UpdateProvider,
        'UpdateSpecialties': UpdateSpecialties,
        'UpdateModalities': UpdateModalities,
        'UpdateTherapyTypes': UpdateTherapyTypes,
        'UpdateAvailability': UpdateAvailability,
    };

    const removePreference = async (stateName, statePath, prefToRemove) => {
        if (statePath) {
            setNewUserData({
                ...newUserData,
                [statePath]: {
                    ...newUserData[statePath],
                    [stateName]: newUserData[statePath][stateName].filter((d) => d !== prefToRemove)
                }
            })

            // Confirm changes
            try {
                setUpdateLoading(true)
                let res = await raClient.updateUser({
                    [statePath]: {
                        [stateName]: newUserData[statePath][stateName].filter((d) => d !== prefToRemove)
                    }
                })
                if (res) {
                    console.log(res)
                    setUserData(res)
                    setUpdateLoading(false)
                }
            } catch (err) {
                console.log(err)
                setUpdateLoading(false)
                alert('Unable to save changes at this time. Please try again later.')
            }
        } else {
            setNewUserData({ ...newUserData, [stateName]: newUserData[stateName].filter((d) => d !== prefToRemove) })

            // Confirm changes
            try {
                setUpdateLoading(true)
                let res = await raClient.updateUser({
                    [stateName]: newUserData[stateName].filter((d) => d !== prefToRemove)
                })
                if (res) {
                    console.log(res)
                    setUserData(res)
                    setUpdateLoading(false)
                }
            } catch (err) {
                console.log(err)
                setUpdateLoading(false)
                alert('Unable to save changes at this time. Please try again later.')
            }
        }
    }

    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        console.log(stateName, statePath, newValue)
        if (statePath) {
            setNewUserData({
                ...newUserData,
                [statePath]: {
                    ...newUserData[statePath],
                    [stateName]: newValue
                }
            })

            // Confirm changes
            try {
                setUpdateLoading(true)
                let res = await raClient.updateUser({
                    [statePath]: {
                        [stateName]: newValue
                    }
                })
                if (res) {
                    console.log(res)
                    setUserData(res)
                    setUpdateLoading(false)
                }
            } catch (err) {
                console.log(err)
                setUpdateLoading(false)
                alert('Unable to save changes at this time. Please try again later.')
            }

        } else {
            setNewUserData({ ...newUserData, [stateName]: newValue })

            // Confirm changes
            if (stateName === 'zip_code' && newValue.length !== 5) {
                return
            } else {
                try {
                    setUpdateLoading(true)
                    let res = await raClient.updateUser({ [stateName]: newValue })
                    if (res) {
                        console.log(res)
                        setUserData(res)
                        setUpdateLoading(false)
                    }
                } catch (err) {
                    console.log(err)
                    setUpdateLoading(false)
                    alert('Unable to save changes at this time. Please try again later.')
                }
            }
        }
    }

    // const confirmChanges = async (stateName, newValue) => {
    //     if (stateName === 'zip_code' && newValue.length !== 5) {
    //         return
    //     } else {
    //         try {
    //             let res = await raClient.updateUser(newUserData)
    //             if (res) {
    //                 console.log(res)
    //                 setUserData(res)
    //             }
    //         } catch (err) {
    //             console.log(err)
    //             alert('Unable to save changes at this time. Please try again later.')
    //         }
    //     }
    // }

    return (
        <PageScroll>
            <View style={[styles.width100, styles.flex1, data.label !== 'Schedule' && styles.pageAboveBottomTab, styles.paddingV30]}>
                <Text
                    text={data.label}
                    fontSize={28}
                    lineHeight={34}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#6D6A69'
                    textAlign='center'
                    marginBottom={45}
                />
                {data &&
                    <>
                        {typeof Components[data.data.editPrefComponent] !== "undefined" &&
                            (React.createElement(Components[data.data.editPrefComponent], {
                                key: `${data.data.editPrefComponent}0`,
                                value: newUserData,
                                removePreference: removePreference,
                                updateAnswerOnPage: updateAnswerOnPage,
                            })
                            )}
                    </>
                }
            </View>
            <ScreenLoading visible={updateLoading} />
        </PageScroll>
    )
}

export default EditPreferences