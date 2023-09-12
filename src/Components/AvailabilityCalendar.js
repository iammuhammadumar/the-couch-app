import React, { useState, useEffect } from 'react'
import styles from '../Styles'

import { Text } from './Text'
import { Button } from './Button'
import { OneCheckBox } from './OneCheckBox'

import {
    View,
} from 'react-native'

export const AvailabilityCalendar = (props) => {
    const [currentTab, setCurrentTab] = useState('Su')

    const daysObj = { 'Su': 7, 'M': 1, 'Tu': 2, 'W': 3, 'Th': 4, 'F': 5, 'Sa': 6 }
    const timeObj = { 'Morning': 1, 'Mid-day': 2, 'Afternoon': 3, 'Evening': 4, 'Night': 5 }

    // schedule_begin: 5
    // schedule_end: 5
    // schedule_days: 7

    const sameTimeEntireWeekFunc = (stateName, statePath, newCheckBoxValue, availArray) => {
        props.updateAnswerOnPage(stateName, statePath, newCheckBoxValue)

        if (newCheckBoxValue === true) {
            if (props.pageQuestions.sameMonFriTime === true) {
                props.updateAnswerOnPage('sameMonFriTime', null, false)
            }
            if (props.pageQuestions.alwaysAvailable === true) {
                props.updateAnswerOnPage('alwaysAvailable', null, false)
            }

            let availabilityArray = []

            if (availArray) {
                availabilityArray = [...availArray]
            } else {
                availabilityArray = [...props.value]
            }
            let newAvailArray = []
            // remove all objects that are not the current day(currentTab)
            let currentDayObjs = availabilityArray.filter(obj => obj.schedule_days === daysObj[currentTab])
            // map through current day objects and add objects for all OTHER days to match current day objects
            currentDayObjs.forEach(currentDayObj => {
                newAvailArray.push(currentDayObj)
                Object.keys(daysObj).forEach(daysKey => {
                    if (daysObj[daysKey] !== currentDayObj.schedule_days) {
                        newAvailArray.push({
                            schedule_begin: currentDayObj.schedule_begin,
                            schedule_end: currentDayObj.schedule_end,
                            schedule_days: daysObj[daysKey],
                        })
                    }
                })
            })
            props.updateAnswerOnPage(props.stateName, props.statePath, newAvailArray)
        }
    }


    const sameMonFriTimeFunc = (stateName, statePath, newCheckBoxValue, availArray) => {
        props.updateAnswerOnPage(stateName, statePath, newCheckBoxValue)

        if (newCheckBoxValue === true) {
            if (props.pageQuestions.sameTimeForEntireWeek === true) {
                props.updateAnswerOnPage('sameTimeForEntireWeek', null, false)
            }
            if (props.pageQuestions.alwaysAvailable === true) {
                props.updateAnswerOnPage('alwaysAvailable', null, false)
            }

            let availabilityArray = {}
            let monFriOptions = ['M', 'Tu', 'W', 'Th', 'F']

            if (availArray) {
                availabilityArray = [...availArray]
            } else {
                availabilityArray = [...props.value]
            }
            if (monFriOptions.indexOf(currentTab) >= 0) {
                monFriOptions = monFriOptions.filter(item => item !== currentTab)
                // remove all mon-fri objects that are not the current day(currentTab) obj
                monFriOptions.forEach(weekDay => (
                    availabilityArray = availabilityArray.filter(obj => obj.schedule_days !== daysObj[weekDay])
                ))
                // map through current day objects and add objects for all OTHER week days to match current day objects
                let currentDayObjs = availabilityArray.filter(obj => obj.schedule_days === daysObj[currentTab])
                currentDayObjs.forEach(currentDayObj => {
                    monFriOptions.forEach(monFriDay => (
                        availabilityArray.push({
                            schedule_begin: currentDayObj.schedule_begin,
                            schedule_end: currentDayObj.schedule_end,
                            schedule_days: daysObj[monFriDay],
                        })
                    ))
                })
                props.updateAnswerOnPage(props.stateName, props.statePath, availabilityArray)
            }
        }
    }

    const allTimesFunc = (stateName, statePath, newCheckBoxValue, availArray) => {
        props.updateAnswerOnPage(stateName, statePath, newCheckBoxValue)

        if (newCheckBoxValue === true) {
            if (props.pageQuestions.sameTimeForEntireWeek === true) {
                props.updateAnswerOnPage('sameTimeForEntireWeek', null, false)
            }
            if (props.pageQuestions.sameMonFriTime === true) {
                props.updateAnswerOnPage('sameMonFriTime', null, false)
            }

            let availabilityArray = []

            Object.keys(daysObj).forEach(daysKey => {
                Object.keys(timeObj).forEach(timeKey => (
                    availabilityArray.push({
                        schedule_begin: timeObj[timeKey],
                        schedule_end: timeObj[timeKey],
                        schedule_days: daysObj[daysKey],
                    })
                ))
            })
            props.updateAnswerOnPage(props.stateName, props.statePath, availabilityArray)
        }
    }


    const getAvailability = async (daysKey, timeKey) => {
        let availabilityArray = [...props.value]
        let activeObj = availabilityArray.filter(obj => obj.schedule_days === daysObj[daysKey] && obj.schedule_begin === timeObj[timeKey])

        if (activeObj.length > 0) {
            availabilityArray = availabilityArray.filter(objs => objs !== activeObj[0])
        } else {
            availabilityArray.push(
                {
                    schedule_begin: timeObj[timeKey],
                    schedule_end: timeObj[timeKey],
                    schedule_days: daysObj[daysKey]
                }
            )
        }
        props.updateAnswerOnPage(props.stateName, props.statePath, availabilityArray)

        if (props.pageQuestions.sameTimeForEntireWeek === true) {
            sameTimeEntireWeekFunc('sameTimeForEntireWeek', null, props.pageQuestions.sameTimeForEntireWeek, availabilityArray)
        }

        if (props.pageQuestions.sameMonFriTime === true) {
            sameMonFriTimeFunc('sameMonFriTime', null, props.pageQuestions.sameMonFriTime, availabilityArray)
        }
    }



    return (
        <View style={{ marginBottom: props.marginBottom }}>
            <View style={[styles.flexRow]}>
                {Object.keys(daysObj).map((daysKey, index) => (
                    <Button
                        key={index}
                        text={daysKey}
                        onPress={() => setCurrentTab(daysKey)}
                        fontSize={20}
                        lineHeight={24}
                        width={40}
                        backgroundColor={currentTab === daysKey ? styles.backgroundColorYellow01 : styles.backgroundColorGrey1}
                        btnStyle={[styles.borderTopRadius6, { paddingTop: 5, paddingHorizontal: 0, paddingBottom: 5, marginRight: 4 }]}
                    />
                ))}
            </View>

            {Object.keys(daysObj).map((daysKey, daysIndex) => {
                if (daysKey === currentTab) {
                    return (
                        <View
                            key={daysIndex}
                            style={[styles.backgroundColorYellow01, styles.alignCenter, styles.paddingT46B16, { borderRadius: 6, borderTopLeftRadius: 0 }]}
                        >
                            {Object.keys(timeObj).map((timeKey, timeIndex) => {
                                let isActive = Boolean(props?.value?.filter(obj => obj.schedule_days === daysObj[daysKey] && obj.schedule_begin === timeObj[timeKey]).length > 0)
                                return (
                                    <Button
                                        key={timeIndex}
                                        text={timeKey}
                                        onPress={() => getAvailability(daysKey, timeKey)}
                                        fontSize={20}
                                        lineHeight={24}
                                        fontFamily='primary'
                                        fontWeight={500}
                                        width={165}
                                        backgroundColor={isActive ? styles.backgroundColorRed1 : styles.backgroundColorWhite}
                                        color={isActive ? styles.colorWhite : styles.colorBlack1}
                                        marginBottom={20}
                                        btnStyle={[styles.borderRadius3]}
                                    />
                                )
                            })}

                        </View>
                    )
                }
            })}

            <View style={{ marginTop: 35 }}>
                <OneCheckBox
                    small
                    stateName='sameTimeForEntireWeek'
                    statePath={null}
                    label='Select the same time slots for the entire week.'
                    value={props.pageQuestions.sameTimeForEntireWeek}
                    onChangeFunc={sameTimeEntireWeekFunc}
                    marginBottom={10}
                />
                <OneCheckBox
                    small
                    stateName='sameMonFriTime'
                    statePath={null}
                    label='Select the same Mon. - Fri. time slots.'
                    value={props.pageQuestions.sameMonFriTime}
                    onChangeFunc={sameMonFriTimeFunc}
                    marginBottom={10}
                />
                <OneCheckBox
                    small
                    stateName='alwaysAvailable'
                    statePath={null}
                    label='Select all times. I am always available.'
                    value={props.pageQuestions.alwaysAvailable}
                    onChangeFunc={allTimesFunc}
                    marginBottom={5}
                />
            </View>
        </View>
    )
}