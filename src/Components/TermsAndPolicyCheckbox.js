import React, { useState } from 'react'
import styles from '../Styles'

import { OneCheckBox } from './OneCheckBox'
import { Text } from './Text'
import closeIconGrey from '../Assets/Images/closeIcon-grey.png'
import { termsOfService } from './TermsOfServiceText.js'
import { privacyPolicy } from './PrivacyPolicyText'

import {
    Dimensions,
    View,
    Modal,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'

export const TermsAndPolicyCheckbox = (props) => {
    const screenHeight = Dimensions.get('window').height;
    const [showTerms, setShowTerms] = useState(null)
    const [termsAndPolicyModalOpen, setTermsAndPolicyModalOpen] = useState(false)

    return (
        <>
            <View style={[styles.flexRowAlignCenter, styles.paddingH24]}>
                <OneCheckBox
                    // small
                    stateName={props.stateName}
                    statePath={props.statePath}
                    // label=''
                    value={props.value}
                    onChangeFunc={props.onChangeFunc}
                    marginRight={11}
                />
                <Text
                    textAlign='center'
                    text={
                        // <View style={[styles.flexRowAlignCenter]}>
                        <>
                            <Text
                                text='I agree to '
                                fontSize={17}
                                lineHeight={27}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorBlack0}
                            />
                            <Text
                                onPress={() => (setShowTerms(true), setTermsAndPolicyModalOpen(true))}
                                text='terms of service '
                                fontSize={19}
                                lineHeight={27}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorOrange3}
                            // textStyle={[styles.underline]}
                            />
                            <Text
                                text='and the '
                                fontSize={17}
                                lineHeight={27}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorBlack0}
                            />
                            <Text
                                onPress={() => (setShowTerms(false), setTermsAndPolicyModalOpen(true))}
                                text='privacy policy'
                                fontSize={19}
                                lineHeight={27}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorOrange3}
                            // textStyle={[styles.underline]}
                            />
                        </>
                        // </View>
                    }
                    textStyle={[styles.flex1, styles.flexRow]}
                />
            </View>

            <Modal
                visible={termsAndPolicyModalOpen}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setTermsAndPolicyModalOpen(false)}
            >
                <View style={[styles.flex1, styles.flexCenterCenter, styles.paddingH20, { paddingVertical: 50, backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                    <View style={[{ height: screenHeight >= 550 ? '62%' : '90%' }, styles.width100, styles.pagePadding, styles.backgroundColorWhite, styles.borderRadius27, styles.paddingT15, styles.paddingB7]}>

                        <View style={[styles.width100, styles.flexRowAlignCenter, styles.justifySpaceBetween, { marginBottom: 20 }]}>
                            <Text
                                text={showTerms ? 'Terms of Service' : 'Privacy Policy'}
                                fontSize={28}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorGrey2}
                            />
                            <TouchableOpacity onPress={() => setTermsAndPolicyModalOpen(false)}>
                                <Image source={closeIconGrey} style={{ width: 17, height: 17 }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <Text
                                fontSize={12}
                                lineHeight={12}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorBlack2}
                                marginBottom={20}
                                text={showTerms ? termsOfService : privacyPolicy}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}