import React from 'react';
import styles from '../Styles'

import { Text } from './Text'

import {
    TouchableOpacity,
} from 'react-native';


export const InfoCards = (props) => {

    let readMore = 'Read More >'

    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={[styles.width100, styles.backgroundColorOrange1, styles.borderRadius10, { padding: 23, marginVertical: 10 }]}
        >
            <Text
                text={props.title}
                fontSize={22}
                lineHeight={26}
                fontFamily='primary'
                fontWeight={700}
                color='#454545'
                marginBottom={10}
            />
            <Text
                text={props.subText}
                fontSize={14}
                lineHeight={17}
                fontFamily='secondary'
                fontWeight={400}
                color='#454545'
                numberOfLines={2}
                ellipsizeMode="tail"
                marginBottom={4}
            />
            <Text
                text={readMore}
                fontSize={17}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={700}
                color='#F59798'
                textAlign='right'
            />
        </TouchableOpacity>
    )
}