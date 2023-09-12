import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'
import { InfoModal } from '../../../Components/InfoModal'


import {
    View,
} from 'react-native'


export const Page9RaceEthnicity = (props) => {
    const pageStateName = 'page9RaceEthnicity'

    const [infoModalVisible, setInfoModalVisible] = useState(false)


    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.paddingH10]}>
            <Text
                text={`What is your ${'\n'} race/ethnicity?`}
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={5}
            />

            <Text
                text='Select up to 3'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={19}
            />

            <View>
                <AddAnotherDropdown
                    stateName='ethnicity'
                    statePath={null}
                    value={props.pageQuestions.ethnicity}
                    updateAnswerOnPage={updateAnswerOnPage}
                    maxNumOfDropdowns={3}
                    // marginBottom={60}
                    forTherapist
                    options={[
                        'White',
                        'Black',
                        'Asian',
                        'Latin',
                        'Hispanic',
                        'Indigenous American',
                        'Indigenous non-American',
                        'Bi/multiracial',
                        'Pacific Islander',
                        'POC',
                        'Prefer not to say',
                        'Other',
                    ]}
                />
            </View>
        </View>
    )
}