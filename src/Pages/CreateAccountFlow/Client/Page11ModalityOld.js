import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'
import { MainCouchLogo } from '../../../Components/MainCouchLogo'

import {
    Platform,
    Animated,
    ScrollView,
    View,
    Modal,
} from 'react-native'


export const Page11ModalityOld = (props) => {
    const pageStateName = 'page11ModalityOld'

    const [infoModalVisible, setInfoModalVisible] = useState(false)

    const updateAnswerOnPage = (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    useEffect(() => {
        if (props.pageQuestions.modalityKnown === 'Yes') {
            props.setNextPageNumber(11.1)
            props.updatePageDone(11, true);
        } else if (props.pageQuestions.modalityKnown === 'No') {
            props.setNextPageNumber(12)
            props.updatePageDone(11, true);
        } else {
            props.updatePageDone(11, false);
        }
    }, [props.pageQuestions.modalityKnown])

    return (
        <View style={[styles.flexGrow1, styles.width100]}>
            <Text
                text='Do you know what modality you would like?'
                fontSize={27}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={500}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={30}
            />



            <View style={[styles.flexGrow1, styles.justifyEvenly, styles.paddingH10]}>
                <Button
                    onPress={() => updateAnswerOnPage('modalityKnown', null, 'Yes')}
                    text='Yes'
                    width={'100%'}
                    color={props.pageQuestions.modalityKnown === 'Yes' && '#fff'}
                    backgroundColor={props.pageQuestions.modalityKnown === 'Yes' ? styles.backgroundColorRed1 : styles.backgroundColorRed0}
                    marginBottom={Platform.OS === 'ios' ? 0 : 40}
                />

                <Button
                    onPress={() => updateAnswerOnPage('modalityKnown', null, 'No')}
                    text='No'
                    width={'100%'}
                    color={props.pageQuestions.modalityKnown === 'No' && '#fff'}
                    backgroundColor={props.pageQuestions.modalityKnown === 'No' ? styles.backgroundColorRed1 : styles.backgroundColorRed0}
                    marginBottom={Platform.OS === 'ios' ? 0 : 40}
                />
            </View>

            <Modal
                visible={infoModalVisible}
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
                                onPress={() => setInfoModalVisible(false)}
                                marginBottom={63}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}