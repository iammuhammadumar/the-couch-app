import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { useAppContext } from '../../../Lib/UserContext';

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'
import SubscriptionButton from '../../../Components/SubscriptionButton'

import {
    View,
} from 'react-native'

export const ContinueOrSkipFilters = (props) => {
    const { currentSubscription, subscriptionMap } = useAppContext();
    const [currentProduct, setCurrentProduct] = useState({});
    useEffect(() => {
        props.setNextPageNumber(2)
        console.log("subscription", subscriptionMap[currentSubscription])
        setCurrentProduct(subscriptionMap[currentSubscription])
    }, [])

    return (
        <View style={[styles.flexGrow1, styles.justifyEvenly]}>
            <Text
                text={`You chose a ${currentProduct?.packageType?.toLowerCase()} subscription!`}
                fontSize={25}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={26}
            />
            <SubscriptionButton
                disabled={true}
                title={currentProduct?.btnTitle}
                text={currentProduct?.btnText}
                isAnnual={currentProduct?.packageType === "ANNUAL"}
            />
            <Text
                text='Start setting up your custom profile now so that clients and therapists in your area can discover you!'
                fontSize={17}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={400}
                color='#6D6A69'
                marginBottom={30}
                textAlign='center'
            />
            <Button
                text='Set up profile'
                onPress={props.nextBtnFunc}
                marginBottom={47}
            />
            <Text
                text='You can also choose to set up your profile later.'
                fontSize={17}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={400}
                color='#6D6A69'
                marginBottom={30}
                textAlign='center'
            />
            <Button
                text={props.submitLoading ? 'setLoading' : 'Skip all'}
                onPress={props.skipAllFilters}
            />
            {/* </View> */}
        </View>
    )
}