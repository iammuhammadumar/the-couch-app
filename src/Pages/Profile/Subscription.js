import React, { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import styles from '../../Styles'

import { Text } from '../../Components/Text'
import { useAppContext } from '../../Lib/UserContext';
import NoSubscriptionComp from './NoSubscriptionComp';
import SubscriptionButton from '../../Components/SubscriptionButton'

import {
    View,
    Linking,
    Platform
} from 'react-native'

const Subscription = ({ route, navigation }, props) => {
    const { currentSubscription, setCurrentSubscription, products, subscriptionMap } = useAppContext();
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    const subscribe = async (productId) => {
        try {
            const { customerInfo } = await Purchases.purchaseProduct(productId) || {};
            navigation.goBack();
            console.log("customerInfo", customerInfo, customerInfo.activeSubscriptions);
            setCurrentSubscription(customerInfo.activeSubscriptions[0]);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        setCurrentProduct(subscriptionMap[currentSubscription]);
    })

    return (
        <View style={[styles.pageAboveBottomTab, styles.paddingT50, styles.alignCenter]}>
            <Text
                text="Subscriptions"
                fontSize={28}
                lineHeight={28}
                fontFamily='primary'
                fontWeight={700}
                color='#6D6A69'
                textAlign='center'
                marginBottom={30}
            />
            {
                !currentSubscription ?
                    <NoSubscriptionComp
                        subscribe={subscribe}
                        products={products}
                    /> :
                    <View>
                        <Text
                            text={`You currently have a ${currentProduct?.packageType?.toLowerCase()} membership.`}
                            fontSize={17}
                            lineHeight={25}
                            fontFamily='secondary'
                            fontWeight={400}
                            marginBottom={30}
                            textAlign='center'
                        />
                        <SubscriptionButton
                            disabled={true}
                            title={currentProduct?.btnTitle}
                            text={currentProduct?.btnText}
                            isAnnual={currentProduct?.packageType === "ANNUAL"}
                        />
                        <Text
                            text={currentProduct?.packageType !== "ANNUAL" ? 'Switch to Annual membership and save more money!' : 'Switch to Monthly membership'}
                            fontSize={17}
                            lineHeight={25}
                            fontFamily='secondary'
                            fontWeight={400}
                            marginBottom={30}
                            textAlign='center'
                        />
                        {
                            products
                                .filter(
                                    (p) => p?.product?.identifier !== currentProduct?.product?.identifier
                                ).map((p) => {
                                    const identifier = p?.product?.identifier;
                                    const isAnnual = p?.packageType === "ANNUAL";

                                    return (
                                        <SubscriptionButton
                                            key={identifier}
                                            disabled={!!subscribeLoading}
                                            title={p?.btnTitle}
                                            text={subscribeLoading === identifier ? 'setLoading' : p?.btnText}
                                            onPress={async () => {
                                                setSubscribeLoading(identifier)
                                                await subscribe(identifier)
                                                setSubscribeLoading(false)
                                            }}
                                            fadeOut={!!subscribeLoading}
                                            isAnnual={isAnnual}
                                        />
                                    )
                                })
                        }
                        <Text
                            text="Cancel my subscription"
                            onPress={() => {
                                if (Platform.OS === "ios") {
                                    Linking.openURL('https://apps.apple.com/account/subscriptions');
                                } else if (Platform.OS === "android") {
                                    Linking.openURL("https://play.google.com/store/account/subscriptions");
                                }
                            }}
                            fontSize={17}
                            lineHeight={25}
                            fontFamily='primary'
                            fontWeight={400}
                            color={styles.colorRed1}
                            marginTop={30}
                            textAlign="center"
                            textStyle={{ textDecorationLine: 'underline' }}
                        />
                    </View>
            }
        </View>
    )
}

export default Subscription