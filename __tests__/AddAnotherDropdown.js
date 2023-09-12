import React, { useState } from 'react'
import styles from '../Styles'

import SelectDropdown from 'react-native-select-dropdown';
import { Text } from './Text'

import plusIcon from '../Assets/Images/plusIcon-orange.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'


export const AddAnotherDropdown = (props) => {
    const [indexForDropDowns, setIndexForDropDowns] = useState([0])

    const addAnotherDropDownFunc = () => {
        let arrayForDropDowns = [...indexForDropDowns]
        arrayForDropDowns.push(arrayForDropDowns.length)
        setIndexForDropDowns(arrayForDropDowns)
    }

    return (
        <View style={[styles.flexGrow1, styles.justifySpaceBetween, { marginBottom: props.marginBottom }]}>
            <View>
                {indexForDropDowns.map((stateIndex, mapAIndex) => (

                    <View key={mapAIndex}>
                        <SelectDropdown
                            data={props.options}
                            onSelect={(selectedItem, selectedIndex) => {
                                // console.log(selectedItem, selectedIndex)
                                let stateArray = [...props.value]
                                stateArray[mapAIndex] = selectedItem
                                props.updateAnswerOnPage(props.stateName, stateArray)
                            }}
                            defaultButtonText='Select one'
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            renderDropdownIcon={() => (
                                <Image
                                    source={require('../Assets/Images/downArrow-grey.png')}
                                    style={{ width: 22, height: 13 }}
                                />
                            )}
                            buttonStyle={styles.textInput}
                            buttonTextStyle={{
                                fontSize: 15,
                                lineHeight: 18,
                                fontFamily: 'opensans-light',
                                textAlign: 'left',
                                color: styles.colorBlack0.color,
                            }}
                            rowStyle={styles.backgroundColorWhite}
                            rowTextStyle={{
                                fontSize: 15,
                                lineHeight: 18,
                                fontFamily: 'opensans-light',
                                color: styles.colorBlack0.color,
                            }}
                        />

                        <View style={{ marginBottom: 25 }}></View>
                    </View>
                ))}

                <Text
                    text={props.subText}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textAlign='center'
                    marginBottom={34}
                    textStyle={[styles.paddingH20]}
                />
            </View>

            {indexForDropDowns.length !== props.maxNumOfDropdowns &&
                <TouchableOpacity
                    onPress={addAnotherDropDownFunc}
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