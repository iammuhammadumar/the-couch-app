import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../../Lib/UserContext'
import styles from '../../../Styles'

import { OneDropdown } from '../../../Components/OneDropdown'
import { Text } from '../../../Components/Text'
import { TextInput } from '../../../Components/TextInput'
import { convertStateToAbbr, convertStateToFullName } from '../../../Functions/convertStateName'
import { TermsAndPolicyCheckbox } from '../../../Components/TermsAndPolicyCheckbox'

import {
    View,
} from 'react-native'


export const Page1Info = (props) => {
    const pageStateName = 'page1Info'
    const { prefAndProfileOptions } = useAppContext();
    let usStateNameToAbbrevMap = {};
    let usStateAbbrevToNameMap = {};
    console.log('prefAndProfileOptions', prefAndProfileOptions)

    prefAndProfileOptions?.usStateOptions?.map((o) => {
        usStateNameToAbbrevMap[o.name] = o.abbreviation;
        usStateAbbrevToNameMap[o.abbreviation] = o.name;
    });

    useEffect(() => {
        props.setNextPageNumber(1.1)
    }, [])

    const updateAnswerOnPage = async (stateName, statePath, newValue) => {
        props.updateAnswerOnPage(pageStateName, stateName, statePath, newValue)

        let newNameState = null
        let newAbbrState = null

        if (stateName === 'state') {
            newNameState = convertStateToFullName(newValue)
            await props.updateAnswerOnPage(pageStateName, 'nameState', statePath, newNameState)
            // console.log('newNameState', newNameState)
            newAbbrState = convertStateToAbbr(newValue)
            await props.updateAnswerOnPage(pageStateName, 'abbrState', statePath, newAbbrState)
            // console.log('newAbbrState', newAbbrState)
        }
    }

    useEffect(() => {
        const checkIfPageDone = () => {
            let questionProps = ['firstName', 'lastName', 'state', 'agreeToTerms']
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

            console.log(Object.values(boolObj).every(Boolean));
            if (Object.values(boolObj).every(Boolean)) {
                if (!props.pageDone['1']) {
                    props.updatePageDone(1, true);
                }
            } else {
                if (props.pageDone['1']) {
                    props.updatePageDone(1, false);
                }
            }
        };
        checkIfPageDone()
    }, [props.pageQuestions])

    return (
        <View style={[styles.flex1, styles.width100, styles.paddingH10]}>
            <Text
                text='Your Info'
                fontSize={28}
                lineHeight={34}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
                textAlign='center'
                marginBottom={20}
            />

            <TextInput
                label='First Name'
                value={props.pageQuestions.firstName}
                onChangeFunc={newValue => updateAnswerOnPage('firstName', null, newValue)}
                placeholder='Type here'
                marginBottom={28}
            />

            <TextInput
                label='Last Name'
                value={props.pageQuestions.lastName}
                onChangeFunc={newValue => updateAnswerOnPage('lastName', null, newValue)}
                placeholder='Type here'
                marginBottom={28}
            />

            <View>
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
            </View>
            <TermsAndPolicyCheckbox
                stateName='agreeToTerms'
                statePath={null}
                value={props.pageQuestions.agreeToTerms}
                onChangeFunc={updateAnswerOnPage}
            />
        </View>
    )
}

