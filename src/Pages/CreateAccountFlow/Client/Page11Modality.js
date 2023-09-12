import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { AddAnotherDropdown } from '../../../Components/AddAnotherDropdown'
import { YesNoSwitch } from '../../../Components/YesNoSwitch'
import { MainCouchLogo } from '../../../Components/MainCouchLogo'
import { Button } from '../../../Components/Button'

import {
    Platform,
    Animated,
    ScrollView,
    View,
    Modal,
} from 'react-native'


export const Page11Modality = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page11Modality'

    const [tellMeMoreVisible, setTellMeMoreVisible] = useState(false)

    useEffect(() => {
        props.setNextPageNumber(12)
    }, [])

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }


    return (
        <View style={[styles.flexGrow1, styles.width100, styles.justifyEvenly]}>
            <Text
                text='Which treatment modality are you looking for?'
                fontSize={23}
                lineHeight={29}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={Platform.OS === 'ios' ? 4 : 15}
            />

            <Text
                text='Select all that apply'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={300}
                color={styles.colorBlack0}
                textAlign='center'
                marginBottom={Platform.OS === 'ios' ? 0 : 14}
            />

            <Button
                text='Tell me more…'
                onPress={() => setTellMeMoreVisible(true)}
                fontSize={19}
                lineHeight={20}
                fontFamily='primary'
                fontWeight={400}
                color={styles.colorPink1}
                textAlign='center'
                backgroundColor='transparent'
                textStyle={{ textDecorationLine: 'underline' }}
                marginBottom={Platform.OS === 'ios' ? 20 : 29}
            />

            <View style={[styles.paddingH10]}>
                <View style={[styles.flexGrow1]}>
                    <AddAnotherDropdown
                        arrayOfObjects
                        // otherHasTwoInputs
                        stateName='modality'
                        statePath={null}
                        firstPropName='value'
                        secondPropName='description'
                        value={props.pageQuestions.modality}
                        updateAnswerOnPage={updateAnswerOnPage}
                        maxNumOfDropdowns={18}
                        marginBottom={60}
                        options={prefAndProfileOptions.modalityOptions}
                    />
                </View>

                <YesNoSwitch
                    hasIcon
                    hasInfoModal
                    stateName='modalityDealBreaker'
                    statePath={null}
                    label='Is this a dealbreaker?'
                    value={props.pageQuestions.modalityDealBreaker}
                    onChangeFunc={updateAnswerOnPage}
                    marginBottom={25}
                />
            </View>

            {/* Tell me more modal */}
            <Modal
                visible={tellMeMoreVisible}
                transparent={true}
                animationType='fade'
            >
                <ScrollView
                    style={[styles.flex1]}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onScroll={Animated.event(
                        [],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    <View style={[styles.flex1, styles.backgroundColorYellow0, styles.fullHeaderTopPadding, styles.pagePadding]}>
                        <MainCouchLogo marginBottom={Platform.OS === 'ios' ? 0 : 40} />

                        <View style={[styles.flexGrow1, styles.flexCenterCenter]}>
                            <Text
                                text='There are many types of therapy and you might know what you want already. If you don’t, don’t worry! We have an information page for you in the app!'
                                fontSize={28}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorGrey2}
                                marginBottom={50}
                                textAlign='center'
                            />

                            <Button
                                text='Back'
                                fontSize={18}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={300}
                                backgroundColor='rgba(0,0,0,0)'
                                onPress={() => setTellMeMoreVisible(false)}
                                marginBottom={63}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}