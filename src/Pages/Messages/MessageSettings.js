import React, { useEffect, useState } from 'react'
import styles from '../../Styles'

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'
import noProfileImg from '../../Assets/Images/noProfileImg.png'
import { Loading } from '../../Components/Loading'
import { YesNoSwitch } from '../../Components/YesNoSwitch'
import { useAppContext } from '../../Lib/UserContext';

import {
    View,
    ImageBackground,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MessageSettings = ({ route, navigation }, props) => {
    const { raClient } = useAppContext();
    const chatRoom = route.params.info;
    const [profile, setProfile] = useState({});
    const [isBlocked, setIsBlocked] = useState(false);
    const [isSnoozed, setIsSnoozed] = useState(chatRoom.snoozed);
    chatRoom.name = `${chatRoom.given_name} ${chatRoom.family_name}`;

    useEffect(() => {
        getProfile();
    }, [profile.id]);

    const getProfile = async () => {
        try {
            const userProfile = await raClient.getUser(chatRoom.user_id);
            console.log('userProfile', userProfile);
            setProfile(userProfile);
            setIsBlocked(userProfile.blocked);
        } catch (error) {
            console.log("error", error);
        }
    };

    const snoozeChat = async () => {
        try {
            const snooze = await raClient.snoozeChat(chatRoom.id);
            setIsSnoozed(!!snooze?.snooze);
        } catch (error) {
            console.log("error", error);
        }
    };

    const blockUser = async () => {
        try {
            const block = await raClient.blockUser({
                block: !isBlocked
            }, profile.id);
            console.log("block", block);
            setIsBlocked(block?.block);
        } catch (error) {
            console.log("error", error);
        }
    };

    const reportUser = () => {
        // TODO: not sure what to do here
    };

    const deleteChat = async () => {
        try {
            await raClient.deleteChatRoom(chatRoom.id);
            navigation.navigate('MessagesTab', {
                screen: 'Messages'
            })
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <PageScroll>
            {profile.id ?
                <View style={[styles.flexGrow1]}>
                    <View style={[styles.borderBottomGrey1, styles.alignCenter, styles.justifyEnd, { paddingTop: 60, paddingBottom: 15 }]}>
                        <ImageBackground
                            source={chatRoom.profile_photo_url ? { uri: chatRoom.profile_photo_url } : noProfileImg}
                            resizeMode='cover'
                            style={[styles.borderTopRadius10, { width: 162, height: 162, marginBottom: 25, overflow: 'hidden' }]} />
                        <Text
                            text={chatRoom.name}
                            fontSize={22}
                            lineHeight={26}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#6D6A69'
                        />
                    </View>

                    <View style={[styles.flex1, styles.alignCenter, { paddingTop: 32 }]}>
                        <YesNoSwitch
                            // hasIcon
                            // hasInfoModal
                            // stateName=''
                            // statePath={}
                            label='Snooze notifications'
                            value={isSnoozed}
                            onChangeFunc={snoozeChat}
                            marginBottom={64}
                        // modalText=''
                        />

                        <TouchableOpacity onPress={blockUser}>
                            <Text
                                text={`${isBlocked ? 'Unblock' : 'Block'} ${chatRoom.name}`}
                                fontSize={17}
                                lineHeight={20}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#F4A568'
                                marginBottom={20}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text
                                text={`Report ${chatRoom.name}`}
                                fontSize={17}
                                lineHeight={20}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#F4A568'
                                marginBottom={20}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={deleteChat}>
                            <Text
                                text='Delete Conversation'
                                fontSize={17}
                                lineHeight={20}
                                fontFamily='primary'
                                fontWeight={700}
                                color='#EC2F3B'
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                :
                <Loading />
            }
        </PageScroll>
    )
}

export default MessageSettings