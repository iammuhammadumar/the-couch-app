import React, { useState } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';
import { uploadProfileImage } from "../../helpers/utils";

import { PageScroll } from '../../Components/PageScroll'
import { UploadAnImage } from '../../Components/UploadAnImage'
import Preferences from '../Profile/Preferences'
import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput'
import { AddAnotherTextInput } from '../../Components/AddAnotherTextInput'
import { ScreenLoading } from '../../Components/ScreenLoading'

import noProfileImg from '../../Assets/Images/noProfileImg.png'
import noCouchImg from '../../Assets/Images/blankCircle-grey.png'

import {
    View,
} from 'react-native'
import PaywallModal from '../../Components/PaywallModal';
import constants from '../../helpers/constants'
const { USER_ROLE } = constants;

// ONLY THERAPISTS HAVE ACCESS TO THIS PAGE

const EditProfile = ({ route, navigation }, props) => {
    const { raClient, userData, setUserData, userType, currentSubscription } = useAppContext();
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [newUserData, setNewUserData] = useState({
        profile_photo_url: userData.profile_photo_url,
        website_url: userData.website_url,
        relevant_links: userData.relevant_links,
        instagram_url: userData.instagram_url,
        facebook_url: userData.facebook_url,
        education: userData.education,
        biography: userData.biography,
        couch_photo_url: userData.couch_photo_url,
        auto_reply: userData.auto_reply,
    })


    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        if (statePath) {
            setNewUserData({
                ...newUserData,
                [statePath]: {
                    ...newUserData[statePath],
                    [stateName]: newValue
                }
            })
        } else {
            setNewUserData({ ...newUserData, [stateName]: newValue });
        }

        if (stateName === 'profile_photo_url' || stateName === 'couch_photo_url') {
            setConfirmLoading(true)
            setConfirmLoading(false)
        }
    }

    const confirmChanges = async (stateName, statePath, newValue) => {
        try {
            setConfirmLoading(true)
            const couchPhotoKey = await uploadProfileImage("couch_photo_url", newUserData.couch_photo_url);
            const profilePhotoKey = await uploadProfileImage("profile_photo_url", newUserData.profile_photo_url);
            const res = await raClient.updateUser({
                ...newUserData,
                couch_photo_url: couchPhotoKey || newUserData.couch_photo_url,
                profile_photo_url: profilePhotoKey || newUserData.profile_photo_url
            });
            console.log(res)
            setUserData(res)
            setConfirmLoading(false)
        } catch (err) {
            console.log(err)
            setConfirmLoading(false)
            alert('Unable to save changes at this time. Please try again later.')
        }

        navigation.goBack();

        // onEndEditing
        // if (statePath) {
        //     setUserData({
        //         ...userData,
        //         [statePath]: {
        //             ...userData[statePath],
        //             [stateName]: newValue
        //         }
        //     })
        // } else {
        //     setUserData({ ...userData, [stateName]: newValue })
        // }
    }

    return (
        <PageScroll>
            <View style={[styles.pageAboveBottomTab]}>
                <UploadAnImage
                    stateName='profile_photo_url'
                    statePath={null}
                    value={newUserData.profile_photo_url}
                    backgroundImage={noProfileImg}
                    onChangefunc={updateAnswerOnPage}
                    marginBottom={15}
                />


                <View style={{ paddingHorizontal: 8, marginBottom: 30 }} >
                    <Preferences route={route} navigation={navigation} />
                </View>

                <TextInput
                    label='Website'
                    value={newUserData.website_url}
                    onChangeFunc={newValue => updateAnswerOnPage('website_url', null, newValue)}
                    // onEndEditing={() => confirmChanges('website_url', null, newUserData.website_url)}
                    placeholder='Type here'
                    marginBottom={15}
                />

                <AddAnotherTextInput
                    heightAuto
                    stateName='relevant_links'
                    statePath={null}
                    value={newUserData.relevant_links}
                    updateAnswerOnPage={updateAnswerOnPage}
                    // onEndEditing={confirmChanges}
                    maxNumOfDropdowns={4}
                    marginBottom={15}
                />

                <TextInput
                    label='Instagram'
                    value={newUserData.instagram_url}
                    onChangeFunc={newValue => updateAnswerOnPage('instagram_url', null, newValue)}
                    // onEndEditing={() => confirmChanges('instagram_url', null, newUserData.instagram_url)}
                    placeholder='Type here'
                    marginBottom={15}
                />

                <TextInput
                    label='Facebook'
                    value={newUserData.facebook_url}
                    onChangeFunc={newValue => updateAnswerOnPage('facebook_url', null, newValue)}
                    // onEndEditing={() => confirmChanges('facebook_url', null, newUserData.facebook_url)}
                    placeholder='Type here'
                    marginBottom={15}
                />

                <Text
                    text='Education'
                    fontSize={19}
                    lineHeight={23}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    marginBottom={15}
                    textStyle={{ paddingLeft: 9 }}
                />
                <AddAnotherTextInput
                    stateName='education'
                    statePath={null}
                    value={newUserData.education}
                    updateAnswerOnPage={updateAnswerOnPage}
                    // onEndEditing={confirmChanges}
                    maxNumOfDropdowns={3}
                    marginBottom={23}
                />

                <View>
                    <TextInput
                        height={147}
                        multiline={true}
                        maxLength={400}
                        label='Biography'
                        value={newUserData.biography}
                        onChangeFunc={newValue => updateAnswerOnPage('biography', null, newValue)}
                        // onEndEditing={() => confirmChanges('biography', null, newUserData.biography)}
                        placeholder='Type here'
                        marginBottom={30}
                        inputStyle={{ paddingBottom: 25 }}
                    />
                    <Text
                        text={newUserData.biography ? `${newUserData.biography.length}/400` : '0/400'}
                        fontSize={15}
                        lineHeight={18}
                        fontFamily='primary'
                        fontWeight={300}
                        color={styles.colorBlack0}
                        textStyle={{ position: 'absolute', bottom: 35, right: 20, backgroundColor: '#fff' }}
                    />
                </View>

                <UploadAnImage
                    forCouches
                    stateName='couch_photo_url'
                    statePath={null}
                    value={newUserData.couch_photo_url}
                    backgroundImage={noCouchImg}
                    onChangefunc={updateAnswerOnPage}
                    marginBottom={30}
                />

                <View style={{ marginBottom: 38 }}>
                    <TextInput
                        height={60}
                        multiline={true}
                        maxLength={400}
                        label='Automatic reply'
                        value={newUserData.auto_reply}
                        onChangeFunc={newValue => updateAnswerOnPage('auto_reply', null, newValue)}
                        // onEndEditing={() => confirmChanges('auto_reply', null, newUserData.auto_reply)}
                        placeholder='Type here'
                        marginBottom={0}
                        inputStyle={{ paddingBottom: 25 }}
                    />
                    <Text
                        text={newUserData.auto_reply ? `${newUserData.auto_reply.length}/400` : '0/400'}
                        fontSize={15}
                        lineHeight={18}
                        fontFamily='primary'
                        fontWeight={300}
                        color={styles.colorBlack0}
                        textStyle={{ position: 'absolute', bottom: 30, right: 20, backgroundColor: '#fff' }}
                    />
                </View>

                <Button
                    text={confirmLoading ? 'setLoading' : 'Confirm'}
                    onPress={confirmChanges}
                    btnStyle={[styles.alignCenter]}
                />
            </View>
            <ScreenLoading visible={confirmLoading} />
            {
                userType !== USER_ROLE.CLIENT && !currentSubscription &&
                <PaywallModal feature="profile_access" unlockFeatures={() => navigation.navigate('Subscription')} />
            }
        </PageScroll>
    )
};

export default EditProfile;
