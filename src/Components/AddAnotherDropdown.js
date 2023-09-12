import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../Lib/UserContext';
import styles from '../Styles'

import SelectDropdown from 'react-native-select-dropdown';
import { Text } from './Text'
import { SpecifyOtherModal } from './SpecifyOtherModal'
import { SuicidalModal } from './SuicidalModal'

import plusIcon from '../Assets/Images/plusIcon-orange.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'



export const AddAnotherDropdown = (props) => {
    const { userType } = useAppContext()
    const [indexForDropDowns, setIndexForDropDowns] = useState([0])
    const [otherDropDownIndex, setOtherDropDownIndex] = useState(null)
    // const [otherAddedValue, setOtherAddedValue] = useState('')
    const [specifyOtherModalOpen, setSpecifyOtherModalOpen] = useState(false)
    const [suicidalModalVisible, setSuicidalModalVisible] = useState(false)
    const dropdownRef = useRef({});

    useEffect(() => {
        if (Array.isArray(props.value) && props.value?.length > 0) {
            let currentDropDownIndexes = props.value.map((v, i) => i)
            setIndexForDropDowns(currentDropDownIndexes)
        }
    }, [])

    const onSelectFunc = (selectedItem, mapAIndex) => {
        let stateArray = [...props.value]

        // check for uniqueness
        const values = props.arrayOfObjects ? stateArray.map((s) => s?.value) : stateArray;
        if (values.includes(selectedItem)) {
            dropdownRef.current.reset();
            return;
        }

        if (props.arrayOfObjects) {
            let objToUse = stateArray[mapAIndex] ? stateArray[mapAIndex] : {}
            objToUse.value = selectedItem
            if (!stateArray[mapAIndex]) {
                stateArray.push(objToUse)
            }
        } else {
            stateArray[mapAIndex] = selectedItem
        }

        if (selectedItem.includes('Other')) {
            setOtherDropDownIndex(mapAIndex)
            setSpecifyOtherModalOpen(true)
        }

        if (userType === '0' && selectedItem.includes('Suicidal Ideation')) {
            setSuicidalModalVisible(true)
        }
        props.updateAnswerOnPage(props.stateName, props.statePath, stateArray)
    }

    const specifyOtherFunc = (otherValue, otherDescription) => {
        let stateArray = [...props.value]
        // check for uniqueness
        const values = props.arrayOfObjects ? stateArray.map((s) => s?.value) : stateArray;
        if (values.includes(otherValue)) {
            setSpecifyOtherModalOpen(false)
            setAddingAnother(false)
            return;
        }

        if (props.arrayOfObjects) {
            if (props.otherHasTwoInputs) {
                stateArray[otherDropDownIndex][props.firstPropName] = otherValue
                stateArray[otherDropDownIndex][props.secondPropName] = otherDescription
            } else {
                stateArray[otherDropDownIndex].value = otherValue
            }
        } else {
            stateArray[otherDropDownIndex] = otherValue
        }

        props.updateAnswerOnPage(props.stateName, props.statePath, stateArray)
        setSpecifyOtherModalOpen(false)
    }


    const addAnotherDropDownFunc = () => {
        let arrayForDropDowns = [...indexForDropDowns]
        arrayForDropDowns.push(arrayForDropDowns.length)
        setIndexForDropDowns(arrayForDropDowns)
    }

    return (
        <View
            style={props.small ?
                [styles.width100, styles.paddingH9, { marginBottom: props.marginBottom }]
                :
                [styles.flexGrow1, styles.justifySpaceBetween, { marginBottom: props.marginBottom }]}
        >
            <View>
                {props.label &&
                    <Text
                        text={props.label}
                        fontSize={19}
                        lineHeight={23}
                        fontFamily='primary'
                        fontWeight={700}
                        color={styles.colorGrey2}
                        marginBottom={12}
                    />
                }

                {indexForDropDowns.map((stateIndex, mapAIndex) => (
                    <View key={mapAIndex}>
                        <View style={[styles.inputShadow]}>
                            <SelectDropdown
                                ref={dropdownRef}
                                data={props.options}
                                search
                                searchPlaceHolder='Search here'
                                searchPlaceHolderColor={styles.colorBlack0.color}
                                searchInputStyle={{
                                    fontSize: 16,
                                    fontFamily: 'opensans-light',
                                    color: styles.colorBlack0.color,
                                    backgroundColor: '#fff',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#6D6A69',
                                }}
                                searchInputTxtColor='#504E4E'
                                onSelect={(selectedItem, selectedIndex) => {
                                    onSelectFunc(selectedItem, mapAIndex)
                                }}
                                defaultButtonText={
                                    !props.value || !props.value[mapAIndex] ?
                                        'Select one' :
                                        (
                                            props.value[mapAIndex].value || props.value[mapAIndex]
                                        )
                                }
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    if (!props.value || !props.value[mapAIndex]) {
                                        return 'Select one';
                                    }

                                    const value = props.value[mapAIndex].value || props.value[mapAIndex];
                                    if (value !== selectedItem) {
                                        return value;
                                    }

                                    return selectedItem;
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
                                    marginHorizontal: 0,
                                }}
                                rowStyle={styles.backgroundColorWhite}
                                rowTextStyle={{
                                    fontSize: 15,
                                    lineHeight: 18,
                                    fontFamily: 'opensans-light',
                                    color: styles.colorBlack0.color,
                                }}
                                selectedRowStyle={{ backgroundColor: '#FFD4A5' }}
                            />
                        </View>

                        {!props.small &&
                            <View style={{ marginBottom: 25 }}></View>
                        }
                    </View>
                ))}

                {props.subText &&
                    <Text
                        text={props.subText}
                        fontSize={15}
                        lineHeight={18}
                        fontFamily='secondary'
                        fontWeight={400}
                        color={styles.colorBlack0}
                        textAlign='center'
                        marginBottom={34}
                        textStyle={[styles.paddingH20]}
                    />
                }
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

            <SpecifyOtherModal
                visible={specifyOtherModalOpen}
                closeModalFunc={() => setSpecifyOtherModalOpen(false)}
                specifyOtherFunc={specifyOtherFunc}
                forTherapist={props.forTherapist}
                therapistSelectsModality={props.therapistSelectsModality}
            />

            <SuicidalModal
                visible={suicidalModalVisible}
                onRequestClose={() => setSuicidalModalVisible(false)}
            />
        </View>
    )
}