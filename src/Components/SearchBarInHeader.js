import React, { useEffect, useState } from 'react'
import styles from '../Styles';
import searchIconGrey from '../Assets/Images/searchIcon-grey.png'

import { Text } from '../Components/Text'

import {
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'

export const SearchBarInHeader = (props) => {
    const [textToSearch, setTextToSearch] = useState('')

    useEffect(() => {
        setTextToSearch(props.textToSearch)
    }, [props.textToSearch])

    return (
        <View style={[styles.width100, { height: 48 }]}>
            <View style={[styles.searchBarInHeader]}>
                <Image source={searchIconGrey} style={{ width: 23, height: 24, opacity: 0.56, marginRight: 25 }} />
                <TextInput
                    ref={props.inputRef}
                    placeholder='Search'
                    value={textToSearch}
                    onChangeText={(newValue) => { setTextToSearch(newValue), props.onChangeText(newValue) }}
                    returnKeyType='search'
                    onSubmitEditing={() => props.onSubmitEditing(textToSearch)}
                    onFocus={() => props.onFocus()}
                    // onPressIn={() => setRecentSearchesOpen(false)} // ?? Does this work correctly?
                    style={{
                        width: '100%',
                        height: 48,
                        fontFamily: 'opensans-Bold',
                        fontSize: 22,
                        // lineHeight: 26,
                        color: '#504E4E',
                    }}
                />
            </View>
        </View>
    )
}