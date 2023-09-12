import React, { useState } from 'react'
import styles from '../Styles'

import SelectDropdown from 'react-native-select-dropdown';
import { Text } from './Text'
import { SpecifyOtherModal } from './SpecifyOtherModal'

// import infoIcon from '../Assets/Images/infoIcon-grey.png'

import {
    View,
    Image,
} from 'react-native'

// props.value is one object

export const OneDropdown = (props) => {
    const [specifyOtherModalOpen, setSpecifyOtherModalOpen] = useState(false)

    const specifyOtherFunc = (otherValue) => {
        // let stateObj = { ...props.value }
        // stateObj.name = otherValue
        props.updateAnswerOnPage(props.stateName, props.statePath, otherValue)
        setSpecifyOtherModalOpen(false)
    }


    return (
        <View style={[
            styles.width100,
            styles.paddingH9,
            { marginBottom: props.marginBottom }
        ]}>
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
                        if (selectedItem.includes('Other')) {
                            setSpecifyOtherModalOpen(true)
                        } else {
                            props.updateAnswerOnPage(props.stateName, props.statePath, selectedItem)
                        }
                    }}
                    defaultButtonText={props.value ? props.value : 'Select one'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        if (props.value !== selectedItem) {
                            return props.value
                        } else {
                            return selectedItem
                        }
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

            {props.subText &&
                <Text
                    text={props.subText}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily='primary'
                    fontWeight={300}
                    color={styles.colorBlack0}
                    textAlign='center'
                    textStyle={[styles.paddingH20]}
                />
            }

            <SpecifyOtherModal
                visible={specifyOtherModalOpen}
                closeModalFunc={() => setSpecifyOtherModalOpen(false)}
                specifyOtherFunc={specifyOtherFunc}
            />
        </View>
    )
}