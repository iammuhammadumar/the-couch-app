import React from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button';

import {
    View,
} from 'react-native'

const InnerTabPageExample = ({ route, navigation }, props) => {

    return (
        <PageScroll>
            <View style={[styles.pagePadding, styles.flexCenterCenter]}>
                <Text
                    text='Inner Tab Page Example'
                    fontFamily='primary'
                    fontWeight={700}
                />
            </View>
        </PageScroll>
    )
}

export default InnerTabPageExample