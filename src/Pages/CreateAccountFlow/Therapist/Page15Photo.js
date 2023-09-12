import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { uploadProfileImage } from "../../../helpers/utils";

import { Text } from '../../../Components/Text'
import { UploadAnImage } from '../../../Components/UploadAnImage'
import noProfileImg from '../../../Assets/Images/noProfileImg.png'


import {
    View,
} from 'react-native'


export const Page15Photo = (props) => {
    const pageStateName = 'page15Photo'


    // useEffect(() => {
    //     props.setNextPageNumber(12)
    // }, [])


    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        await uploadProfileImage("profile_photo_url", newValue);
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Select your profile picture.'
                fontSize={26}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={25}
            />

            <View style={[styles.paddingH10]}>
                <UploadAnImage
                    stateName='profilePhoto'
                    statePath={null}
                    value={props.pageQuestions.profilePhoto}
                    backgroundImage={noProfileImg}
                    onChangefunc={updateAnswerOnPage}
                    marginBottom={36}
                />

                <Text
                    text='This photo is private and will only be shown to potential clients.'
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorGrey2}
                    textAlign='center'
                    marginBottom={0}
                />
            </View>
        </View>
    )
}