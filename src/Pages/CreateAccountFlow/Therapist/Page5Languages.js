import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'
import { InfoModal } from '../../../Components/InfoModal'


import {
    View,
} from 'react-native'


export const Page5Languages = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page5Languages'

    // const [infoModalVisible, setInfoModalVisible] = useState(false)


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    return (
        <View style={[styles.flexGrow1, styles.width100, styles.paddingH10]}>
            <Text
                text='What languages do you speak?'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={37}
            />

            <View>
                <AddAnotherDropdown
                    stateName='languages'
                    statePath={null}
                    value={props.pageQuestions.languages}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={36}
                    marginBottom={65}
                    forTherapist
                    options={prefAndProfileOptions.languageOptions}
                />
            </View>
        </View>
    )
}