import React, { useState, useEffect } from 'react'
import styles from '../Styles'

import { Text } from './Text'
import { TextInput } from './TextInput'

import plusIcon from '../Assets/Images/plusIcon-orange.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'


export const AddAnotherTextInput = (props) => {
    const [indexForTextInputs, setIndexForTextInputs] = useState([])

    useEffect(() => {
        if (props.value?.length > 0) {
            let currentTextInputIndexes = props.value.map((v, i) => i)
            setIndexForTextInputs(currentTextInputIndexes)
        }
    }, [])


    const addProfileFunc = async (profileValueIndex, profilePropName, profileValue) => {
        let stateArray = [...props.value]
        if (props.hasTwoInputs) {
            stateArray[profileValueIndex][profilePropName] = profileValue
        } else {
            stateArray[profileValueIndex] = profileValue
        }
        await props.updateAnswerOnPage(props.stateName, props.statePath, stateArray)
    }


    const addAnotherTextInputFunc = () => {
        let arrayForTextInputs = [...indexForTextInputs]
        arrayForTextInputs.push(arrayForTextInputs.length)
        setIndexForTextInputs(arrayForTextInputs)
        if (props.hasTwoInputs) {
            let stateArray = [...props.value]
            stateArray.push(
                {
                    [props.firstPropName]: '',
                    [props.secondPropName]: ''
                })
            props.updateAnswerOnPage(props.stateName, props.statePath, stateArray)
        }
    }


    return (
        <View style={[!props.heightAuto && styles.flexGrow1, styles.justifySpaceBetween, { marginBottom: props.marginBottom }]}>
            {props.hasTwoInputs ?
                <View>
                    {indexForTextInputs.map((stateIndex, mapAIndex) => (
                        <View key={mapAIndex}>
                            <TextInput
                                value={props.value[stateIndex][props.firstPropName]}
                                onChangeFunc={newValue => addProfileFunc(mapAIndex, props.firstPropName, newValue)}
                                onEndEditing={props.onEndEditing ?
                                    () => props.onEndEditing(props.stateName, props.statePath, props.value)
                                    :
                                    console.log()
                                }
                                placeholder={props.value[mapAIndex][props.firstPropName] ? props.value[mapAIndex][props.firstPropName] : props.firstPropName.charAt(0).toUpperCase() + props.firstPropName.slice(1)}
                                marginBottom={15}
                            />
                            <TextInput
                                value={props.value[stateIndex][props.secondPropName]}
                                onChangeFunc={newValue => addProfileFunc(mapAIndex, props.secondPropName, newValue)}
                                onEndEditing={props.onEndEditing ?
                                    () => props.onEndEditing(props.stateName, props.statePath, props.value)
                                    :
                                    console.log()
                                }
                                placeholder={props.value[mapAIndex][props.secondPropName] ? props.value[mapAIndex][props.secondPropName] : props.secondPropName.charAt(0).toUpperCase() + props.secondPropName.slice(1)}
                                marginBottom={35}
                            />
                        </View>
                    ))}

                </View>
                :
                <View>
                    {indexForTextInputs.map((stateIndex, mapAIndex) => (
                        <View key={mapAIndex}>
                            <TextInput
                                value={props.value[stateIndex]}
                                onChangeFunc={newValue => addProfileFunc(mapAIndex, null, newValue)}
                                onEndEditing={props.onEndEditing ?
                                    () => props.onEndEditing(props.stateName, props.statePath, props.value)
                                    : console.log()
                                }
                                placeholder={props.value[mapAIndex] ? props.value[mapAIndex] : 'Type here'}
                                marginBottom={15}
                            />
                        </View>
                    ))}

                </View>
            }

            {indexForTextInputs.length !== props.maxNumOfDropdowns &&
                <TouchableOpacity
                    onPress={addAnotherTextInputFunc}
                    style={[styles.flexRowAlignCenter, styles.justifyCenter]}
                >
                    <Image source={plusIcon} style={{ width: 29, height: 29, marginRight: 19 }} />

                    <Text
                        text='Add another'
                        fontSize={20}
                        lineHeight={24}
                        fontFamily='primary'
                        fontWeight={400}
                        color={styles.colorGrey2}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}