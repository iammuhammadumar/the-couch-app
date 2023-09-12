import React, { useState, useEffect } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'

import { UpdateName } from './UpdateName'
import { UpdateLicense } from './UpdateLicense'


import {
    View,
} from 'react-native'



const EditAccountSettings = ({ route, navigation }, props) => {
    const { userData, setUserData } = useAppContext()
    const data = route.params

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        setUserData({ ...userData, [stateName]: newValue })
    }

    return (
        <PageScroll>
            <View style={[styles.pageAboveBottomTab, styles.paddingT90]}>
                {data.hideLabel ?
                    null :
                    <Text
                        text={data.label}
                        fontSize={28}
                        lineHeight={34}
                        fontFamily='primary'
                        fontWeight={700}
                        color={styles.colorGrey2}
                        textAlign='center'
                        marginBottom={80}
                    />
                }

                {data.label === 'Name' &&
                    <UpdateName updateAnswerOnPage={updateAnswerOnPage} />
                }

                {/* Per So-Youngs doc, These properties are immutable once set:  */}
                {/* {data.label === 'License type and number:' &&
                    <UpdateLicense updateAnswerOnPage={updateAnswerOnPage} />
                } */}
            </View>
        </PageScroll>
    )
}

export default EditAccountSettings