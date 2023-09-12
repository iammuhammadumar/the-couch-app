import React, { useState, useEffect } from 'react'
import styles from '../Styles'

import { Text } from './Text'
import ToggleSwitch from 'toggle-switch-react-native'
import { InfoModal } from './InfoModal'

import {
    Platform,
    View,
    Switch,
} from 'react-native'


export const YesNoSwitch = (props) => {
    const [infoModalVisible, setInfoModalVisible] = useState(false)

    return (
        <View style={[styles.flexRow, { marginBottom: props.marginBottom }]}>
            <View style={[styles.flexRowAlignCenter]}>
                <Text
                    text={props.label}
                    fontSize={17}
                    lineHeight={20}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorBlack0}
                    textStyle={{ marginRight: 12 }}
                />

                <View
                    style={[
                        styles.alignCenter,
                        styles.borderRadius100,
                        { backgroundColor: props.value ? styles.colorOrange2.color : styles.backgroundColorGrey3.backgroundColor, width: 76 }
                    ]}
                >
                    <ToggleSwitch
                        isOn={props.value}
                        onColor='rgba(0,0,0,0)'
                        thumbOnStyle={{
                            backgroundColor: styles.backgroundColorGrey3.backgroundColor,
                            margin: 10,
                            // borderColor: styles.colorOrange2.color,
                            // borderWidth: 1,
                            // borderStyle: 'solid',

                            // shadowColor: styles.backgroundColorGrey3.backgroundColor,
                            shadowOffset: { 'width': 0, 'height': 0 },
                            // shadowRadius: 3,
                            // shadowOpacity: 1,
                        }}

                        offColor='rgba(0,0,0,0)'
                        thumbOffStyle={{
                            backgroundColor: styles.colorOrange2.color,
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowOffset: { 'width': 0, 'height': 0 },
                            shadowRadius: 0,
                        }}
                        label={props.value ? 'Yes' : 'No'}
                        labelStyle={{
                            color: '#fff',
                            fontFamily: 'opensans-bold',
                            fontSize: 17,
                            lineHeight: 20,
                            position: 'absolute',
                            top: 50 % - 20,
                            left: props.value ? 7 : null,
                            right: !props.value ? 0 : null,
                            marginLeft: 0,
                        }}
                        size='large'
                        onToggle={(isOn) => {
                            if (isOn) {
                                props.onChangeFunc(props.stateName, props.statePath, true);
                            } else {
                                props.onChangeFunc(props.stateName, props.statePath, false);
                            }
                        }}
                        animationSpeed={200}
                        style={{ width: '100%' }}
                    />
                </View>
            </View>

            {props.hasInfoModal &&
                <InfoModal
                    hasIcon={props.hasIcon}
                    openModalFunc={() => setInfoModalVisible(true)}
                    closeModalFunc={() => setInfoModalVisible(false)}
                    onRequestClose={() => setInfoModalVisible(false)}
                    visible={infoModalVisible}
                    modalText={props.modalText ? props.modalText : 'Dealbreakers make your preferences strict. Turn a dealbreaker on if a particular preference is non-negotiable for you.'}
                />
            }
        </View>
    )
}