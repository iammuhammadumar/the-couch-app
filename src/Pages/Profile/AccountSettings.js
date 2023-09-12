import React, { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { Auth } from 'aws-amplify'
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'
import { DisplaySettingsPillsComp } from './DisplaySettingsPillsComp'
import { Button } from '../../Components/Button';

import {
    View,
    Modal
} from 'react-native'

import constants from '../../helpers/constants'
const { USER_ROLE } = constants;

const AccountSettings = ({ route, navigation }, props) => {
    const { userType, subscriptionMap, products, userData, firstSignOut, setFirstSignOut, currentSubscription, raClient } = useAppContext();
    const [signOutModalOpen, setSignOutModalOpen] = useState(false)
    const [logOutLoading, setLogOutLoading] = useState(false)
    const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
    const [deleteAccountLoading, setDeleteAccountLoading] = useState(false)
    // const updateSettings = (stateName, statePath, newValue) => {
    //     setUserData({ ...userData, [stateName]: newValue })
    // }

    const deleteAccount = async () => {
        try {
            console.log("delete account");
            setDeleteAccountModalOpen(false);
            setDeleteAccountLoading(true);

            raClient.deleteAccount();
            await Auth.signOut();
        } catch (error) {
            console.log({
                evt: 'thecouch.app.accountSettings.deleteAccount',
                message: error.message || `${error}`
            });
        }
    }

    const signOut = async () => {
        try {
            console.log('sign out')
            setSignOutModalOpen(false)
            setLogOutLoading(true);
            setFirstSignOut(false);

            await Auth.signOut();
        } catch (error) {
            console.log({
                evt: 'thecouch.app.accountSettings.signOut',
                message: error.message || `${error}`
            });
        }
    }


    return (
        <PageScroll>
            <View style={[styles.pageAboveBottomTab, styles.paddingT90, styles.justifySpaceBetween]}>
                {userData &&
                    <View style={[styles.flex1]}>
                        <Text
                            text='Account Settings'
                            fontSize={20}
                            lineHeight={24}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#6D6A69'
                            marginBottom={32}
                        />

                        <DisplaySettingsPillsComp
                            label='Name:'
                            value={[`${userData.given_name} ${userData.family_name}`]}
                            editFunc={() => (
                                navigation.navigate('EditAccountSettings',
                                    {
                                        hideLabel: true,
                                        label: 'Name',
                                    })
                            )}
                            marginBottom={40}
                        />
                        {/* Per So-Youngs doc, These properties are immutable once set:  */}
                        {/* {userType === '1' &&
                            <DisplaySettingsPillsComp
                                label='License type and number:'
                                value={[`${userData.license_type[0]}`, `${userData.license_number}`, `${userData.state.abbreviation}`]}
                                editFunc={() => (
                                    navigation.navigate('EditAccountSettings',
                                        {
                                            hideLabel: true,
                                            label: 'License type and number:',
                                        })
                                )}
                                marginBottom={40}
                            />
                        } */}
                        {
                            userType === USER_ROLE.THERAPIST &&
                            <DisplaySettingsPillsComp
                                label='Subscription status:'
                                placeholder="No subscriptions"
                                value={subscriptionMap[currentSubscription] ? [subscriptionMap[currentSubscription].product?.title] : []}
                                editFunc={() => {
                                    if (userType === USER_ROLE.CLIENT) {
                                        return;
                                    }
                                    navigation.navigate('Subscription')
                                }}
                            />
                        }
                    </View>
                }
                <View style={[styles.flex1]}>
                    <Button
                        text={logOutLoading ? 'setLoading' : `Sign out`}
                        onPress={() => {
                            if (firstSignOut) {
                                setSignOutModalOpen(true)
                            } else {
                                signOut()
                            }
                        }}
                        fontFamily='primary'
                        fontWeight={700}
                    />
                </View>
                <View style={[styles.flex1]}>
                    <Button
                        text={deleteAccountLoading ? 'setLoading' : `Delete Account`}
                        onPress={() => {
                            setDeleteAccountModalOpen(true)
                        }}
                        fontFamily='primary'
                        fontWeight={700}
                        color={styles.colorWhite.color}
                        backgroundColor={styles.colorRed1.color}
                    />
                </View>
                <Modal
                    visible={deleteAccountModalOpen}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={[styles.flex1, styles.flexCenterCenter, styles.paddingH10, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                        <View style={[styles.width100, styles.paddingV50, styles.paddingH10]}>
                            <Text
                                text='Are you sure you want to delete your account?'
                                fontSize={25}
                                lineHeight={25}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#fff'
                                textAlign='center'
                                marginBottom={32}
                            />

                            <Text
                                text='All your info and preferences will be deleted'
                                fontSize={17}
                                lineHeight={25}
                                fontFamily='primary'
                                fontWeight={400}
                                color='#fff'
                                textAlign='center'
                                marginBottom={32}
                            />

                            <View style={[styles.flexRow, styles.justifySpaceBetween]}>
                                <Button
                                    width={'46%'}
                                    text={`No,\n go back`}
                                    onPress={() => setDeleteAccountModalOpen(false)}
                                    fontFamily='primary'
                                    fontWeight={700}
                                />

                                <Button
                                    width={'46%'}
                                    text={deleteAccountLoading ? 'setLoading' : `Yes,\n delete`}
                                    onPress={deleteAccount}
                                    fontFamily='primary'
                                    fontWeight={700}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={signOutModalOpen}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={[styles.flex1, styles.flexCenterCenter, styles.paddingH10, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                        <View style={[styles.width100, styles.paddingV50, styles.paddingH10]}>
                            <Text
                                text='Are you sure you want to log out of your account?'
                                fontSize={25}
                                lineHeight={25}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#fff'
                                textAlign='center'
                                marginBottom={32}
                            />

                            <Text
                                text='All your info is saved and you can always log back in.'
                                fontSize={17}
                                lineHeight={25}
                                fontFamily='primary'
                                fontWeight={400}
                                color='#fff'
                                textAlign='center'
                                marginBottom={32}
                            />

                            <View style={[styles.flexRow, styles.justifySpaceBetween]}>
                                <Button
                                    width={'46%'}
                                    text={`No,\n go back`}
                                    onPress={() => setSignOutModalOpen(false)}
                                    fontFamily='primary'
                                    fontWeight={700}
                                />

                                <Button
                                    width={'46%'}
                                    text={logOutLoading ? 'setLoading' : `Yes,\n log out`}
                                    onPress={signOut}
                                    fontFamily='primary'
                                    fontWeight={700}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </PageScroll>
    )
}

export default AccountSettings