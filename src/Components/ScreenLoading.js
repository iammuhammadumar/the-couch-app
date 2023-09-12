import React from 'react';
import styles from '../Styles'

import { Loading } from '../Components/Loading'

import {
    View,
    Modal,
} from 'react-native'

export const ScreenLoading = (props) => {

    return (
        <Modal
            visible={props.visible}
            transparent={true}
        // animationType='fade'
        >
            <View style={[styles.flex1, styles.flexCenterCenter, { backgroundColor: 'rgba(255,255,255,0.4)' }]}>
                <Loading size='large' />

            </View>
        </Modal>
    )
}