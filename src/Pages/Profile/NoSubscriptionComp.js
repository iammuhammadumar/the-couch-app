

import React, { useState } from 'react';
import { Text } from '../../Components/Text'
import SubscriptionButton from '../../Components/SubscriptionButton'

import {
    View
} from 'react-native'

const NoSubscriptionComp = (props) => {
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const products = props.products;

    return (
        <View>
            <Text
                text="Upgrade to build your custom profile!"
                fontSize={17}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={400}
                color='#6D6A69'
                marginBottom={30}
                textAlign='center'
            />
            <Text
                text="This will add the ability to attract the perfect clientelle and network with therapists in your area!"
                fontSize={17}
                lineHeight={25}
                fontFamily='primary'
                fontWeight={400}
                color='#6D6A69'
                textAlign='center'
                marginBottom={50}
            />
            {products.map((p) => {
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
                            await props.subscribe(identifier)
                            setSubscribeLoading(false)
                        }}
                        fadeOut={!!subscribeLoading}
                        isAnnual={isAnnual}
                    />
                )
            })}
            <Text
                text='Cancel anytime. Subscription auto-renews.'
                color='#6D6A69'
                fontSize={15}
                lineHeight={23}
                fontFamily='primary'
                fontWeight={400}
            />
        </View>
    )
}

export default NoSubscriptionComp