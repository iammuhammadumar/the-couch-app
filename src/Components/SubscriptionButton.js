

import React from 'react';
import styles from '../Styles'

import { Button } from './Button'
import savingsBadge from '../Assets/Images/savingsBadge.png';

import {
    View,
    Image
} from 'react-native'

const SubscriptionButton = (props) => {
    return (
        <View style={{ position: 'relative', display: 'flex', ...styles.flexCenterCenter }}>
            <Button
                disabled={props.disabled}
                title={props.title}
                text={props.text}
                onPress={props.onPress}
                titleFontSize={16}
                fontSize={22}
                marginBottom={40}
                lineHeight={24}
                btnStyle={{ opacity: props.fadeOut ? 0.5 : 1 }}
                width={300}
                height={80}
            />
            {
                props.isAnnual &&
                <Image
                    source={savingsBadge}
                    style={{ width: 80, height: 80, position: 'absolute', top: -30, right: -20 }}
                />
            }
        </View>
    )
}

export default SubscriptionButton