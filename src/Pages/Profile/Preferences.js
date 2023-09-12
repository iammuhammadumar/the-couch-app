import React, { useState, useEffect } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';
import { useNavigation } from '@react-navigation/native'

import { PageScroll } from '../../Components/PageScroll'
import { DisplayPreferencePillsComp } from './DisplayPreferencePillsComp';
import { Text } from '../../Components/Text'
// import { MileRangeSlider } from '../../Components/MileRangeSlider'
import { MoneyRangeSlider } from '../../Components/MoneyRangeSlider'
import { ScreenLoading } from '../../Components/ScreenLoading'

import prefIcon from '../../Assets/Images/prefIcon.png'

import {
    View,
    Image,
} from 'react-native'



const Preferences = ({ route, navigation }, props) => {
    const { raClient, userType, preferenceOrProfile, userData, setUserData } = useAppContext();
    // console.log(preferenceOrProfile)
    const tNavigation = useNavigation()
    const [newUserData, setNewUserData] = useState({
        [preferenceOrProfile]: {
            min_cost: userData[preferenceOrProfile]?.min_cost ? userData[preferenceOrProfile].min_cost : 0,
            max_cost: userData[preferenceOrProfile]?.max_cost ? userData[preferenceOrProfile].max_cost : 0
        }
    })
    const [costLoading, setCostLoading] = useState(false)
    const preferencesToEdit = [
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateGender',
            stateName: 'gender',
            statePath: preferenceOrProfile,

            value: userData[preferenceOrProfile]?.gender,
            componentLabel: userType === '0' ? 'Gender Identity of therapist' : 'Gender Identity',
            pageLabel: 'Gender Identity',
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateLocation',
            stateName: 'zip_code',
            statePath: null,

            value: [userData.zip_code],
            componentLabel: 'Location'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateLanguages',
            stateName: 'language',
            statePath: preferenceOrProfile,

            value: userData[preferenceOrProfile]?.language,
            componentLabel: 'Preferred Language'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateEthnicity',
            stateName: 'race',
            statePath: preferenceOrProfile,

            value: userData[preferenceOrProfile]?.race,
            componentLabel: 'Race/Ethnicity'
        },
        {
            prefComponent: 'MoneyRangeSlider',
            editPrefComponent: null,
            // stateName: 'cost',
            statePath: preferenceOrProfile,
            // value: [userData[preferenceOrProfile]?.min_cost ? userData[preferenceOrProfile].min_cost : 0, userData[preferenceOrProfile]?.max_cost ? userData[preferenceOrProfile].max_cost : 0],
            componentLabel: 'Cost'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateProvider',
            stateName: 'insurance',
            statePath: preferenceOrProfile,
            value: userData[preferenceOrProfile]?.insurance,
            componentLabel: 'Insurance Provider'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateSpecialties',
            stateName: 'specialty',
            statePath: preferenceOrProfile,
            value: userData[preferenceOrProfile]?.specialty,
            componentLabel: 'Specialties'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateModalities',
            stateName: 'modality',
            statePath: preferenceOrProfile,
            value: userData[preferenceOrProfile]?.modality,
            componentLabel: 'Modalities'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateTherapyTypes',
            stateName: 'therapy_type',
            statePath: preferenceOrProfile,
            value: userData[preferenceOrProfile]?.therapy_type,
            componentLabel: 'Type'
        },
        {
            prefComponent: 'DisplayPreferencePillsComp',
            editPrefComponent: 'UpdateAvailability',
            stateName: 'availability',
            statePath: preferenceOrProfile,
            value: userData[preferenceOrProfile]?.availability,
            componentLabel: 'Schedule'
        },
    ]

    const updateMinMaxCost = async (stateName, statePath, newValue) => {
        setNewUserData({
            ...setNewUserData,
            [statePath]: {
                ...setNewUserData[statePath],
                min_cost: newValue[0],
                max_cost: newValue[1]
            }
        })
        try {
            setCostLoading(true)
            let res = await raClient.updateUser({
                [preferenceOrProfile]: {
                    min_cost: newValue[0],
                    max_cost: newValue[1]
                }
            })
            if (res) {
                console.log(res)
                setUserData(res)
                setCostLoading(false)
            }
        } catch (err) {
            console.log(err)
            setCostLoading(false)
            alert('Unable to save changes at this time. Please try again later.')
        }
    }

    return (
        <PageScroll
            scrollEnabled={userType === '0' ? true : false}
        >
            <View style={userType === '0' && [styles.pageAboveBottomTab, styles.paddingT90]}>
                {userType === '0' &&
                    <View style={[styles.width100, styles.height55, styles.flexRow, styles.justifySpaceBetween, styles.paddingL5R20, styles.borderBottomGrey0]}>
                        <Text
                            text='Preferences'
                            fontSize={20}
                            lineHeight={24}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#6D6A69'
                        />
                        <Image source={prefIcon} style={{ width: 33, height: 23 }} />
                    </View>
                }

                {userData && preferencesToEdit.map((pref, index) => {
                    if (pref.prefComponent === 'DisplayPreferencePillsComp') {
                        return (
                            <DisplayPreferencePillsComp
                                key={index}
                                data={pref}
                                value={pref.value}
                                editFunc={() => (
                                    navigation.navigate('EditPreferences',
                                        {
                                            data: pref,
                                            label: pref.pageLabel ? pref.pageLabel : pref.componentLabel
                                        })
                                )}
                            />
                        )
                    } else {
                        return (
                            <View
                                key={index}
                                style={[styles.width100, styles.height80, styles.justifyCenter, styles.paddingR20, styles.borderBottomGrey0]}>
                                {/* <View style={[styles.flexRowAlignCenter]}> */}
                                <Text
                                    text={pref.componentLabel}
                                    fontSize={12}
                                    lineHeight={12}
                                    fontFamily='primary'
                                    fontWeight={700}
                                    color='#6D6A69'
                                />
                                <View style={[styles.alignCenter]}>
                                    <MoneyRangeSlider
                                        small
                                        stateName={pref.stateName}
                                        statePath={pref.statePath}
                                        label=""
                                        value={[newUserData[pref.statePath].min_cost, newUserData[pref.statePath].max_cost]}
                                        min={0}
                                        max={500}
                                        step={5}
                                        onChangeFunc={updateMinMaxCost}
                                        selectedColor={styles.backgroundColorOrange2.backgroundColor}
                                        markerColor={styles.backgroundColorOrange2.backgroundColor}
                                        textColor={styles.colorGrey4.color}
                                    />
                                </View>
                            </View>
                        )
                    }
                })
                }
            </View>
            <ScreenLoading visible={costLoading} />
        </PageScroll>
    )
};

export default Preferences;
