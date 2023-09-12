import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { uploadProfileImage } from "../../../helpers/utils";
import { Text } from '../../../Components/Text'
import { UploadAnImage } from '../../../Components/UploadAnImage'
import noCouchImg from '../../../Assets/Images/blankCircle-grey.png'


import {
    View,
} from 'react-native'


export const Page16Couch = (props) => {
    const pageStateName = 'page16Couch'



    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        await uploadProfileImage("couch_photo_url", newValue);
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Upload a photo of your couch.'
                fontSize={24}
                lineHeight={29}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={13}
            />

            <Text
                text='Show us where your client will sit or what your office looks like.'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={20}
            />

            <View style={[styles.paddingH10]}>
                <UploadAnImage
                    forCouches
                    stateName='couchPhoto'
                    statePath={null}
                    value={props.pageQuestions.couchPhoto}
                    backgroundImage={noCouchImg}
                    onChangefunc={updateAnswerOnPage}
                    marginBottom={36}
                />
            </View>
        </View>
    )
}