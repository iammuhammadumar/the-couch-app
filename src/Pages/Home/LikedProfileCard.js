import React from 'react'
import styles from '../../Styles'

import noProfileImg from '../../Assets/Images/noProfileImg.png'
import { useAppContext } from '../../Lib/UserContext'
import { Text } from '../../Components/Text'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'



export const LikedProfileCard = (props) => {
    let subText = ''
    if (props.data?.profile?.specialty?.length) {
        subText += `${props.data?.profile?.specialty[0]}.`
    }
    if (props.data?.education?.length) {
        subText += ` ${props.data.education[0]}.`
    }

    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[styles.flexRow, { paddingVertical: 4, marginVertical: 10 }]}
        >
            <Image source={props.data.profile_photo_url ? { uri: props.data.profile_photo_url } : noProfileImg} style={[styles.borderRadius100, { width: 84, height: 84, marginRight: 11 }]} />
            <View>
                <Text
                    text={`Dr. ${props.data.family_name}`}
                    fontSize={22}
                    lineHeight={26}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#504E4E'
                    marginBottom={7}
                />
                <Text
                    text={subText}
                    fontSize={14}
                    lineHeight={17}
                    fontFamily='primary'
                    fontWeight={400}
                    color='#504E4E'
                />
            </View>
        </TouchableOpacity>
    )
}