import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'
import { OneDropdown } from '../../../Components/OneDropdown'
import { InfoModal } from '../../../Components/InfoModal'

import {
    View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export const Page1Supervisor = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page1Supervisor'
    const [modalOpen, setModalOpen] = useState(false)

    const usStateNameToAbbrevMap = {};
    const usStateAbbrevToNameMap = {};

    prefAndProfileOptions?.usStateOptions?.map((o) => {
        usStateNameToAbbrevMap[o.name] = o.abbreviation;
        usStateAbbrevToNameMap[o.abbreviation] = o.name;
    });

    useEffect(() => {
        props.setNextPageNumber(1)
    }, [])

    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        await props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)
    }

    useEffect(() => {
        const checkIfPageDone = () => {
            let questionProps = ['firstName', 'lastName', 'licenseType', 'state', 'licenseNumber']
            let boolObj = {};

            questionProps.map(qProps => {
                if (props.pageQuestions[qProps].length > 0) {
                    boolObj[qProps] = true
                } else {
                    boolObj[qProps] = false;
                }
            });

            if (Object.values(boolObj).every(Boolean)) {
                if (!props.pageDone['1.1']) {
                    props.updatePageDone(1.1, true);
                }
            } else {
                if (props.pageDone['1.1']) {
                    props.updatePageDone(1.1, false);
                }
            }
        }
        checkIfPageDone()
    }, [props.pageQuestions])

    return (
        <View style={[styles.flex1, styles.width100, styles.paddingH10]}>
            <Text
                text='Supervisor’s Information'
                fontFamily='primary'
                fontWeight={700}
                fontSize={23}
                lineHeight={34}
                color='#6D6A69'
                textAlign='center'
            />
            <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Text
                    text='Why do we need this?'
                    fontFamily='primary'
                    fontWeight={300}
                    fontStyle='italic'
                    fontSize={15}
                    lineHeight={20}
                    color='#F6A3A2'
                    textAlign='center'
                    textStyle={{ textDecorationLine: 'underline' }}
                    marginBottom={14}
                />
            </TouchableOpacity>
            <TextInput
                label='First Name'
                value={props.pageQuestions.firstName}
                onChangeFunc={newValue => updateAnswerOnPage('firstName', null, newValue)}
                placeholder='Type here'
                marginBottom={17}
            />

            <TextInput
                label='Last Name'
                value={props.pageQuestions.lastName}
                onChangeFunc={newValue => updateAnswerOnPage('lastName', null, newValue)}
                placeholder='Type here'
                marginBottom={17}
            />

            <OneDropdown
                stateName='licenseType'
                statePath={null}
                value={props.pageQuestions.licenseType}
                updateAnswerOnPage={updateAnswerOnPage}
                label='Type of License'
                marginBottom={17}
                options={prefAndProfileOptions.supervisorLicenseOptions}
            />

            <OneDropdown
                stateName='state'
                statePath={null}
                value={usStateAbbrevToNameMap[props.pageQuestions.state] || ""}
                updateAnswerOnPage={(name, path, value) => {
                    updateAnswerOnPage(name, path, usStateNameToAbbrevMap[value])
                }}
                label='State'
                marginBottom={35}
                options={prefAndProfileOptions?.usStateOptions?.map((o) => o.name)}
            />

            <TextInput
                label='License Number'
                value={props.pageQuestions.licenseNumber}
                onChangeFunc={newValue => updateAnswerOnPage('licenseNumber', null, newValue)}
                placeholder='Type here'
                marginBottom={17}
            />

            <InfoModal
                visible={modalOpen}
                closeModalFunc={() => setModalOpen(false)}
                modalText='Since you are not licensed yet, we need to collect your supervisor’s information.'
            />
        </View>
    )
}

