import React, { useEffect, useState } from 'react';

import styles from '../../Styles';

import { useAppContext } from '../../Lib/UserContext';

import Share from 'react-native-share';

import { Text } from '../../Components/Text';
import { Button } from '../../Components/Button';

import noProfileImg from '../../Assets/Images/noProfileImg.png'
import shareIcon from '../../Assets/Images/shareIcon.png'
import appIconBase64 from '../../Components/AppIconBase64'
import heartIconWhite from '../../Assets/Images/heartIcon-white.png'
import heartIconPink from '../../Assets/Images/heartIcon-pink.png'
import gradutateCapIcon from '../../Assets/Images/gradutateCapIcon.png'

import {
    Dimensions,
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import constants from "../../helpers/constants";
const { DEEP_LINK_DOMAIN } = constants;

export const SwipeTherapistCard = (props) => {
    const { screenWidth, screenHeight, userType, userData, raClient } = useAppContext()

    const [isUserLiked, setIsUserLiked] = useState(!!props.data?.liked);
    const [specialtiesToShow, setSpecialtiesToShow] = useState([])

    let data = props.data

    // Only show therapist specialties that match what the current client wants help with
    useEffect(() => {
        if (userType === '0' && userData?.preference?.specialty) {
            let matchedSpecialties = userData.preference.specialty.map((cSpecialty) => {
                return data.profile?.specialty?.filter((tSpecialty) => tSpecialty === cSpecialty)
            })
            setSpecialtiesToShow(matchedSpecialties.flat())
        } else if (data?.profile?.specialty) {
            setSpecialtiesToShow(data.profile?.specialty)
        }
    }, [data, userData])

    const buildLink = (therapistId) => {
        const deepLink = `https://${DEEP_LINK_DOMAIN}?tid=${therapistId}`;
        return deepLink;
    }

    const shareTherapist = () => {
        // if user has the app installed it opens the app to that therapists' profile else if they don't have the app installed it goes to the app store
        const deepLink = buildLink(data.id);
        console.log("deepLink", deepLink);
        Share.open({
            // type: 'text/plain',
            // type: 'image/png',
            subject: 'The Couch app', // When shared through email
            message: `I found this therapist on The Couch app, check them out! ${deepLink}`,
            activityItemSources: [{
                thumbnailImage: { default: appIconBase64.appIcon },
            }],
        })
            .catch((err) => {
                err && console.log(err);
            });
    };

    const updateUserLike = async () => {
        try {
            const userLike = await raClient.updateUserLike(data.id);
            setIsUserLiked(!!userLike);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <View style={[styles.swipeTherapistCards, { maxHeight: props.maxHeight ? props.maxHeight : '100%' }]}>
            <View style={[styles.width100, { height: screenWidth * 0.87 }, styles.backgroundColorGrey4]}>
                <Image source={data.profile_photo_url ? { uri: data.profile_photo_url } : noProfileImg} style={[styles.borderTopRadius10, { width: '100%', height: '100%' }]} />

                <View style={[styles.swipeBtns, { paddingHorizontal: 12, bottom: 15 }]}>
                    <TouchableOpacity onPress={() => shareTherapist()}>
                        <Image source={shareIcon} style={{ width: 37, height: 43 }} />
                    </TouchableOpacity>

                    {isUserLiked ?
                        <TouchableOpacity onPress={updateUserLike}>
                            <Image source={heartIconPink} style={{ width: 39, height: 35 }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={updateUserLike}>
                            <Image source={heartIconWhite} style={{ width: 39, height: 35 }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <ScrollView>
                <View style={{ paddingTop: 20, paddingLeft: 15, paddingRight: 3 }}>
                    <View style={[styles.flexRow, styles.justifySpaceBetween, styles.alignCenter, { marginBottom: 5 }]}>
                        <Text
                            text={`Dr. ${data.family_name}`}
                            fontSize={30}
                            lineHeight={36}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#6D6A69'
                        />

                        {
                            data.education &&
                            data.education[0] &&
                            <View style={[styles.flexRow, styles.alignCenter]}>
                                <Image source={gradutateCapIcon} style={{ width: 32, height: 32, marginRight: 1 }} />

                                <Text
                                    text={data.education && data.education[0]}
                                    fontSize={15}
                                    lineHeight={18}
                                    fontFamily='primary'
                                    fontWeight={700}
                                    color='#6D6A69'
                                />
                            </View>
                        }

                        <Text
                            text={`${data.distance_from_user} mi away`}
                            fontSize={15}
                            lineHeight={18}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#6D6A69'
                        />
                    </View>

                    <View style={[styles.flexRow, { marginBottom: 5 }]}>
                        <Text
                            text={`License ${data?.state} #${data?.license_number}`}
                            fontSize={13}
                            lineHeight={16}
                            fontFamily='secondary'
                            fontWeight={400}
                            color='#6D6A69'
                        />
                    </View>

                    {data?.supervisor?.given_name &&
                        <View style={{ marginBottom: 5 }}>
                            <Text
                                text='Supervisor Informtation:'
                                fontSize={15}
                                lineHeight={18}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#6D6A69'
                            />

                            <View style={[styles.flexRow]}>
                                <Text
                                    text={`${data.supervisor.given_name} ${data.supervisor.last_name} License ${data.supervisor.state} #${data.supervisor.license_number}`}
                                    fontSize={13}
                                    lineHeight={16}
                                    fontFamily='secondary'
                                    fontWeight={400}
                                    color='#6D6A69'
                                />

                            </View>
                        </View>
                    }

                    <View style={[styles.flexRow, styles.flexWrap, { paddingTop: 20 }]}>
                        {specialtiesToShow && specialtiesToShow.map((s, index) => (
                            <View key={index} style={[styles.stcSpecialtyViews]}>
                                <Text
                                    text={s}
                                    fontSize={19}
                                    fontFamily='secondary'
                                    fontWeight={400}
                                    color='#6D6A69'
                                    textAlign='center'
                                />
                            </View>
                        ))}
                    </View>

                    <View style={[styles.backgroundColorGrey0, { height: 1, marginHorizontal: 9.5 }]} />

                    <View style={{ paddingVertical: 14, paddingHorizontal: 9 }}>
                        <Text
                            text={data.biography && data.biography}
                            fontSize={16}
                            fontFamily='secondary'
                            fontWeight={400}
                            color='#6D6A69'
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}