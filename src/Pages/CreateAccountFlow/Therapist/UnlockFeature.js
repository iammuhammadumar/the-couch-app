import React, { useEffect, useState } from 'react'
import Purchases from 'react-native-purchases';
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'
import SubscriptionButton from "../../../Components/SubscriptionButton"
import { useAppContext } from '../../../Lib/UserContext';

import {
    View,
} from 'react-native'

export const UnlockFeature = (props) => {
    const { setCurrentSubscription, products } = useAppContext();
    const [subscribeLoading, setSubscribeLoading] = useState(false);

    const subscribe = async (productId) => {
        try {
            setSubscribeLoading(productId)
            const { customerInfo } = await Purchases.purchaseProduct(productId);
            setCurrentSubscription(customerInfo.activeSubscriptions[0]);
            props.nextBtnFunc();
        } catch (error) {
            console.log("error", error);
            setSubscribeLoading(false);
        }
    };

    useEffect(() => {
        props.setNextPageNumber(1.3);
    }, [])

    const featureCopies = [
        "Customizable profile with filters to attract your ideal clientele",
        "See therapists in your area that you can connect with",
        "Message potential clients and therapists"
    ];

    const renderRow = (data, id) => {
        return (
            <View key={id} style={{ flexDirection: 'row' }}>
                <Text
                    text={'\u2022 '}
                    fontSize={17}
                    lineHeight={17}
                    fontFamily='primary'
                    fontWeight={400}
                    color='#6D6A69'
                    marginBottom={10}
                    textAlign='left'
                />
                <Text
                    text={data}
                    style={{ flex: 1, paddingLeft: 5 }}
                    fontSize={17}
                    lineHeight={17}
                    fontFamily='primary'
                    fontWeight={400}
                    color='#6D6A69'
                    marginBottom={10}
                    textAlign='left'
                />
            </View>
        )
    }

    return (
        <View style={[styles.flexGrow1, styles.justifyEvenly]}>
            {/* <View> */}
            <Text
                text='Unlock All Features!'
                fontSize={25}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={20}
            />
            <Text
                text='Upgrade to the premium version and get all these extras:'
                fontSize={17}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={400}
                color='#6D6A69'
                marginBottom={10}
                textAlign='center'
            />
            {
                featureCopies.map((f, id) => renderRow(f, id))
            }
            <View style={{ marginTop: 20 }}>
                {
                    products.map((p) => {
                        const identifier = p?.product?.identifier;
                        const isAnnual = p?.packageType === "ANNUAL";

                        return (
                            <SubscriptionButton
                                key={identifier}
                                disabled={!!subscribeLoading}
                                title={p?.btnTitle}
                                text={subscribeLoading === identifier ? 'setLoading' : p?.btnText}
                                onPress={() => {
                                    subscribe(identifier)
                                }}
                                fadeOut={!!subscribeLoading}
                                isAnnual={isAnnual}
                            />
                        )
                    })
                }
            </View>
            <Button
                title='Skip for now'
                text='Go to app'
                onPress={props.skipAllFilters}
            />
            {/* </View> */}
        </View>
    )
}
