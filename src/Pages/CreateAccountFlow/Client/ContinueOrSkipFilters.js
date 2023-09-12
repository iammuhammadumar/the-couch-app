import React, { useEffect } from 'react'
import styles from '../../../Styles'

import { Text } from '../../../Components/Text'
import { Button } from '../../../Components/Button'

import {
    View,
} from 'react-native'


// You can set up your filters right now.
// or 
// You can set up your filters here. 


// You can also chose to set up your filters later. Click below to go to the main page. 

export const ContinueOrSkipFilters = (props) => {

    useEffect(() => {
        props.setNextPageNumber(2)
    }, [])


    return (
        <View style={[styles.flexGrow1, styles.justifySpaceBetween]}>
            <View>
                <Text
                    text='You can set up your filters right now.'
                    fontSize={34}
                    lineHeight={54}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    textAlign='center'
                    marginBottom={26}
                />
                <Button
                    text='Set up filters'
                    onPress={props.nextBtnFunc}
                    marginBottom={65}
                />
            </View>

            <View>
                <Text
                    text='You can also chose to set up your filters later.'
                    fontSize={34}
                    lineHeight={54}
                    fontFamily='primary'
                    fontWeight={700}
                    color={styles.colorGrey2}
                    textAlign='center'
                    marginBottom={26}
                />
                <Button
                    text={props.submitLoading ? 'setLoading' : 'Skip all'}
                    onPress={props.skipAllFilters}
                />
            </View>
        </View>
    )
}