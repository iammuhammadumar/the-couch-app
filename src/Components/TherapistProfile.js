import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Lib/UserContext'

import styles from '../Styles'

import { PageScroll } from './PageScroll'
import { SwipeTherapistCard } from '../Pages/Home/SwipeTherapistCard'
import noCouchImg from '../Assets/Images/blankCircle-grey.png';

import {
    View,
    ImageBackground,
} from 'react-native'



const TherapistProfile = ({ route, navigation }, props) => {
    const { screenWidth } = useAppContext()
    let data = route.params.data
    const [couchPhotoResizeMode, setCouchPhotoResizeMode] = useState('contain')
    const [couchPhotoHeight, setCouchPhotoHeight] = useState('auto')

    // If the users couch image is not a preset couch image, change resize mode to be cover
    useEffect(() => {
        if (data && data.couch_photo_url) {
            if (!data.couch_photo_url.includes("public")) {
                setCouchPhotoResizeMode('cover')
                setCouchPhotoHeight(screenWidth * 0.87)
            } else {
                setCouchPhotoResizeMode('contain')
                setCouchPhotoHeight(screenWidth / 2.5)
            }
        }
    }, [data])


    return (
        <PageScroll>
            {data &&
                <View style={[styles.pageAboveBottomTab, styles.alignCenter, styles.androidPaddingBottom, { paddingHorizontal: 26 }]}>
                    <SwipeTherapistCard data={data} />

                    <View style={{ marginBottom: 15 }} />

                    <ImageBackground
                        source={data.couch_photo_url ? { uri: data.couch_photo_url } : noCouchImg}
                        resizeMode={couchPhotoResizeMode}
                        style={[styles.borderRadius10, styles.overflowHidden, { width: '100%', height: couchPhotoHeight }]}
                        imageStyle={[styles.alignSelfStart]}
                    />
                </View>
            }
        </PageScroll>
    )
}

export default TherapistProfile