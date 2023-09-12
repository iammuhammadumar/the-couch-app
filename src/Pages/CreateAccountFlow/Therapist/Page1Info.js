import React, { useEffect, useState } from 'react'
import styles from '../../../Styles'
import { useAppContext } from '../../../Lib/UserContext'

import { TextInput } from '../../../Components/TextInput'
import { OneDropdown } from '../../../Components/OneDropdown'
import { convertStateToAbbr, convertStateToFullName } from '../../../Functions/convertStateName'
import { TermsAndPolicyCheckbox } from '../../../Components/TermsAndPolicyCheckbox'

import {
    View,
} from 'react-native'


export const Page1Info = (props) => {
    const { prefAndProfileOptions } = useAppContext()
    const pageStateName = 'page1Info'
    const usStateNameToAbbrevMap = {};
    const usStateAbbrevToNameMap = {};

    prefAndProfileOptions?.usStateOptions?.map((o) => {
        usStateNameToAbbrevMap[o.name] = o.abbreviation;
        usStateAbbrevToNameMap[o.abbreviation] = o.name;
    });

    useEffect(() => {
        props.setNextPageNumber(1.2)
    }, [])

    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        await props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)

        if (stateName === 'licenseType' && newValue.includes('Associate')) {
            props.addSupervisorInfo()
        }

        if (stateName === 'state') {
            let newNameState = convertStateToFullName(newValue)
            props.updateAnswerOnPage(pageStateName, 'nameState', statePath, newNameState)
            // console.log('newNameState', newNameState)
            let newAbbrState = convertStateToAbbr(newValue)
            props.updateAnswerOnPage(pageStateName, 'abbrState', statePath, newAbbrState)
            // console.log('newAbbrState', newAbbrState)
        }
    }

    useEffect(() => {
        const checkIfPageDone = () => {
            let questionProps = ['firstName', 'lastName', 'licenseType', 'state', 'licenseNumber', 'agreeToTerms']
            let boolObj = {};

            questionProps.map(qProps => {
                if (qProps === 'agreeToTerms') {
                    if (props.pageQuestions[qProps]) {
                        boolObj[qProps] = true
                    } else {
                        boolObj[qProps] = false;
                    }
                } else {
                    if (props.pageQuestions[qProps].length > 0) {
                        boolObj[qProps] = true
                    } else {
                        boolObj[qProps] = false;
                    }
                }
            });

            if (Object.values(boolObj).every(Boolean)) {
                if (!props.pageDone['1']) {
                    props.updatePageDone(1, true);
                }
            } else {
                if (props.pageDone['1']) {
                    props.updatePageDone(1, false);
                }
            }
        }
        checkIfPageDone()
    }, [props.pageQuestions])

    return (
        <View style={[styles.flex1, styles.width100, styles.paddingH10]}>
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
                options={prefAndProfileOptions?.licenseOptions}
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
                label={props.pageQuestions.licenseType.includes('Associate') ? 'Pre-License Number' : 'License Number'}
                value={props.pageQuestions.licenseNumber}
                onChangeFunc={newValue => updateAnswerOnPage('licenseNumber', null, newValue)}
                placeholder='Type here'
                marginBottom={17}
            />

            <TermsAndPolicyCheckbox
                stateName='agreeToTerms'
                statePath={null}
                value={props.pageQuestions.agreeToTerms}
                onChangeFunc={updateAnswerOnPage}
            />
        </View>
    )
}

