import React, { useState, useRef, useEffect } from 'react'
import { debounce } from 'lodash'
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SearchBarInHeader } from '../../Components/SearchBarInHeader'

import { InfoCards } from '../../Components/InfoCards'
import { LikedProfileCard } from './LikedProfileCard'

import { Text } from '../../Components/Text'
import { Loading } from '../../Components/Loading'
import { Linking } from 'react-native'
import {
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native'

const DEBOUNCE_TIMEOUT = 1000;

// We'd like it to search therapists profiles and articles and bring up whatever is relevant.
const SearchProfilesAndArticles = ({ route, navigation }, props) => {
    const { likedPagesData, raClient, cfClient } = useAppContext() // mock data to change to real data for this page
    const [pageLoading, setPageLoading] = useState(false)
    const [clientRecentSearches, setClientRecentSearches] = useState([])

    const searchBarInputRef = useRef(null)
    const [textToSearch, setTextToSearch] = useState('')
    const [recentSearchesOpen, setRecentSearchesOpen] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [dataToShow, setDataToShow] = useState(likedPagesData)

    useEffect(() => {
        const getClientRecentSearches = async () => {
            try {
                const clientRecentSearchesJson = await AsyncStorage.getItem('@clientRecentSearches')
                return clientRecentSearchesJson != null ? setClientRecentSearches(JSON.parse(clientRecentSearchesJson)) : null;
            } catch (e) {
                console.log('error with getClientRecentSearches:, ', e)
            }

        }
        getClientRecentSearches()
    }, [filteredData])

    // When the state from the search bar text input changes, we also run this function here
    const onSearchChangeText = async (searchValue) => {
        setTextToSearch(searchValue)
    }

    const debounceSearch = debounce(() => newSearch(textToSearch), DEBOUNCE_TIMEOUT);

    const newSearch = async (searchText) => {
        setPageLoading(true)
        console.log("searchText", searchText);
        searchBarInputRef.current.blur();
        // if searchbar has a value from the user, filter the data
        const lowerCaseSearchText = searchText.trim().toLowerCase();
        if (lowerCaseSearchText) {
            let newFilteredArray = []
            try {
                const filteredUsers = await raClient.searchUsers(searchText)
                const postEntries = await cfClient.getEntries({
                    content_type: "blogPosts",
                    "query": lowerCaseSearchText
                });

                const topicEntries = await cfClient.getEntries({
                    content_type: "blogPostTopic",
                    "query": lowerCaseSearchText
                });

                const filteredTopics = topicEntries.items.map(({ fields, sys }) => {
                    fields.id = sys.id;
                    fields.dataType = "topic";
                    return fields;
                });

                const filteredPosts = postEntries.items.map(({ fields, sys }) => {
                    fields.id = sys.id;
                    fields.dataType = "post";
                    return fields;
                });

                newFilteredArray = [...filteredUsers, ...filteredPosts, ...filteredTopics];
            } catch (error) {
                console.log('searchProfilesAndArticles.search', error)
            }

            setFilteredData(newFilteredArray)
            setDataToShow(newFilteredArray)
            console.log('newFilteredArray', newFilteredArray)
            setRecentSearchesOpen(false)

            // Add searchText to async storage for recent search
            let recentSearches = [...clientRecentSearches]
            recentSearches.push(searchText.trim())
            setClientRecentSearches([...new Set(recentSearches)])
            try {
                // Storing array value needs to be stringified
                const clientRecentSearchesJson = JSON.stringify([...new Set(recentSearches)])
                await AsyncStorage.setItem('@clientRecentSearches', clientRecentSearchesJson)
            } catch (e) {
                console.log('saving clientRecentSearches error: ', e)
            }
        } else {
            // if search bar value is emptied, return all original data
            console.log("likedPagesData", likedPagesData);
            setFilteredData([])
            setDataToShow(likedPagesData)
            setRecentSearchesOpen(false)
        }
        setPageLoading(false)
    }


    const deleteRecentSearchItem = async (itemToDelete) => {
        let recentSearches = [...clientRecentSearches]
        recentSearches = recentSearches.filter((item, index) => item !== itemToDelete)
        setClientRecentSearches([...new Set(recentSearches)])
        try {
            // Storing array value needs to be stringified
            const clientRecentSearchesJson = JSON.stringify([...new Set(recentSearches)])
            await AsyncStorage.setItem('@clientRecentSearches', clientRecentSearchesJson)
        } catch (e) {
            console.log('saving clientRecentSearches error: ', e)
        }
    }

    return (
        <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
            <View style={[styles.width100, styles.flexRowAlignCenter, { paddingLeft: 26, paddingRight: 37 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../Assets/Images/backArrow-grey.png')} style={{ width: 14, height: 15 }} />
                </TouchableOpacity>
                <SearchBarInHeader
                    inputRef={searchBarInputRef}
                    onFocus={() => setRecentSearchesOpen(true)}
                    onChangeText={onSearchChangeText}
                    onSubmitEditing={function () {
                        debounceSearch();
                    }}
                    textToSearch={textToSearch}
                />
            </View>

            {pageLoading &&
                <Loading style={[styles.alignSelfCenter, { marginTop: 15 }]} />
            }

            {/* Recent searches drop down */}
            {clientRecentSearches.length > 0 && recentSearchesOpen &&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[styles.recentSearchesContainer]}
                >
                    <ScrollView>
                        {clientRecentSearches && clientRecentSearches.map((item, index) => (
                            <View
                                key={index}
                                style={[styles.flexRowAlignCenter, styles.justifySpaceBetween, styles.borderBottomGrey0, { height: 61, paddingLeft: 13 }]}
                            >
                                <TouchableOpacity
                                    onPress={() => { setTextToSearch(item), debounceSearch() }}
                                    style={[styles.flex1]}
                                >
                                    <Text
                                        text={item}
                                        fontFamily='primary'
                                        fontWeight={400}
                                        fontSize={20}
                                        lineHeight={24}
                                        color='#6D6A69'
                                        style={{ flex: 1 }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => deleteRecentSearchItem(item)}
                                    style={[styles.padding8]}>
                                    <Text
                                        text='x'
                                        fontFamily='primary'
                                        fontWeight={400}
                                        fontSize={20}
                                        lineHeight={24}
                                        color='#6D6A69'
                                    />
                                </TouchableOpacity>

                            </View>
                        ))}
                    </ScrollView>
                </KeyboardAvoidingView>
            }

            {dataToShow.length === 0 ?
                <View style={[styles.pagePadding, styles.paddingT32]}>
                    <Text
                        text={`We did not find any results for "${textToSearch}".`}
                        fontFamily='primary'
                        fontWeight={400}
                        fontSize={20}
                        lineHeight={24}
                        color='#6D6A69'
                    />
                </View>
                // <TouchableOpacity onPress={() => newSearch(null)}>
                //     < Text
                //         text=' reset search'
                //         fontFamily='primary'
                //         fontWeight={400}
                //         fontSize={20}
                //         lineHeight={24}
                //         color='#6D6A69'
                //         textStyle={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: '#6D6A69' }}
                //     />
                // </TouchableOpacity>

                :
                <FlatList
                    data={dataToShow}
                    renderItem={({ item }) => {
                        if (item.dataType === "post") {
                            return (
                                <InfoCards
                                    key={item.id}
                                    onPress={() => navigation.navigate(`${route.params.tabRouteInfo.name}Tab`, { screen: 'SubInfoDetails', params: { details: item } })}
                                    title={item.title}
                                    subText={item.content}
                                />
                            )
                        }

                        if (item.dataType === "topic") {
                            return (
                                <InfoCards
                                    key={item.id}
                                    onPress={() => {
                                        if (item.url) {
                                            Linking.openURL(item.url);
                                            return;
                                        }

                                        navigation.navigate(`${route.params.tabRouteInfo.name}Tab`, { screen: 'SubInfo', params: { topic: item.id } })
                                    }}
                                    title={item.title}
                                    subText={item.description}
                                />
                            )
                        }

                        return (
                            <LikedProfileCard
                                key={item.id}
                                data={item}
                                onPress={() => navigation.navigate(`${route.params.tabRouteInfo.name}Tab`, { screen: 'TherapistProfile', params: { data: item } })}
                            />
                        )
                    }}
                    style={{ flex: 1, paddingTop: 32, paddingHorizontal: 26 }}
                    keyExtractor={item => item.id}
                />
            }
        </SafeAreaView>

    )
}

export default SearchProfilesAndArticles;