import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../Lib/UserContext';
import styles from '../../Styles'

import SelectDropdown from 'react-native-select-dropdown';
import { Text } from '../../Components/Text'
import { SpecifyOtherModal } from '../../Components/SpecifyOtherModal'
import { SuicidalModal } from '../../Components/SuicidalModal'

import plusIcon from '../../Assets/Images/plusIcon-orange.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'



export const PrefAddAnother = (props) => {
    const { userType } = useAppContext()
    const [addingAnother, setAddingAnother] = useState(false)
    const [specifyOtherModalOpen, setSpecifyOtherModalOpen] = useState(false)
    const [suicidalModalVisible, setSuicidalModalVisible] = useState(false)


    const addDropDownFunc = () => {
        setAddingAnother(true)
    }

    const onSelectFunc = async (selectedItem) => {
        let stateArray = [...props.value]
        if (selectedItem.includes('Other')) {
            setSpecifyOtherModalOpen(true)
            return;
        }

        const values = props.arrayOfObjects ? stateArray.map((s) => s?.value) : stateArray;
        if (values.includes(selectedItem)) {
            return;
        }

        const newItem = props.arrayOfObjects ? {
            value: selectedItem
        } : selectedItem;
        stateArray.push(newItem);
        await props.updateAnswerOnPage(props.stateName, props.statePath, stateArray)
        if (userType === '0' && selectedItem.includes('Suicidal Ideation')) {
            setSuicidalModalVisible(true)
        }
        setAddingAnother(false)
    }

    const specifyOtherFunc = (otherValue, otherDescription) => {
        let stateArray = [...props.value]
        const values = props.arrayOfObjects ? stateArray.map((s) => s?.value) : stateArray;
        if (values.includes(otherValue)) {
            setSpecifyOtherModalOpen(false)
            setAddingAnother(false)
            return;
        }

        if (props.arrayOfObjects) {
            const newItem = props.otherHasTwoInputs ? {
                [props.firstPropName]: otherValue,
                [props.secondPropName]: otherDescription
            } : {
                value: otherValue
            };
            stateArray.push(newItem);
        } else {
            stateArray.push(otherValue);
        }
        props.updateAnswerOnPage(props.stateName, props.statePath, stateArray);
        setSpecifyOtherModalOpen(false)
        setAddingAnother(false)
    }


    return (
        <View style={[styles.flexGrow1, styles.justifySpaceBetween, { marginBottom: props.marginBottom }]}>
            {props.options && addingAnother &&
                <View style={[styles.inputShadow]}>
                    <SelectDropdown
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
                            onSelectFunc(selectedItem, selectedIndex)
                        }}
                        defaultButtonText={'Select one'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return 'Select one'
                            // if (props.value[mapAIndex] !== selectedItem) {
                            //     return props.value[mapAIndex]
                            // } else {
                            //     return selectedItem
                            // }
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        renderDropdownIcon={() => (
                            <Image
                                source={require('../../Assets/Images/downArrow-grey.png')}
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
                    />
                </View>
            }

            <View style={{ marginBottom: 25 }}></View>

            {props.value?.length !== props.maxNumOfPrefs &&
                <TouchableOpacity
                    onPress={addDropDownFunc}
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