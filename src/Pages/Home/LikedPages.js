import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Lib/UserContext'

import styles from '../../Styles'

import { InfoCards } from '../../Components/InfoCards'
import { LikedProfileCard } from '../Home/LikedProfileCard'

import { Text } from '../../Components/Text'
import { Loading } from '../../Components/Loading'

import {
    SafeAreaView,
    FlatList,
} from 'react-native'

const LikedPages = ({ route, navigation }, props) => {
    const { likedPagesData, setLikedPagesData, raClient, cfClient } = useAppContext()
    const postCreatedAtMap = {};
    const [pageLoading, setPageLoading] = useState(false)

    const getPosts = async (postLikes) => {
        try {
            const postIds = postLikes.map(({ post_id, created_at }) => {
                postCreatedAtMap[post_id] = created_at || -1;
                return post_id;
            });

            const postEntries = await cfClient.getEntries({
                content_type: "blogPosts",
                "sys.id": postIds
            });

            const likedPosts = postEntries.items
                .map(({ fields, sys }) => {
                    fields.id = sys.id;
                    fields.created_at = postCreatedAtMap[fields.id];
                    fields.dataType = "post";
                    return fields;
                })
                .filter((item) => !!item.created_at);

            return likedPosts;
        } catch (error) {
            console.log("likedPages.getPosts", error);
        }
    };

    const getLikedPages = async () => {
        setPageLoading(true)
        try {
            const likes = await raClient.getUserLikes();
            const [postLikes, therapistLikes] = [
                likes.post_likes,
                likes.therapist_likes
            ];

            if (!postLikes.length) {
                setUserLikes(postLikes, therapistLikes);
                setPageLoading(false)
                return;
            }

            const posts = await getPosts(postLikes);
            setUserLikes(posts, therapistLikes);
            setPageLoading(false)
        } catch (error) {
            console.log("likedPages.getLikedPages", error);
        }
        setPageLoading(false)
    }

    const setUserLikes = (posts, therapists) => {
        let userLikes = [...posts, ...therapists]
        userLikes.sort((a, b) => {
            return a.created_at > b.created_at ? -1 : 1
        })

        userLikes = userLikes.map((item) => item.user ? item.user : item);

        console.log("userLikes", userLikes);
        setLikedPagesData(userLikes);
    };

    useEffect(() => {
        getLikedPages();
    }, [])

    return (
        <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
            <Text
                text='Liked pages'
                fontSize={18}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={700}
                color='#504E4E'
                textAlign='center'
                marginBottom={27}
            />
            <FlatList
                data={likedPagesData}
                renderItem={({ item, index }) => {
                    if (item.dataType === "post") {
                        return (
                            <InfoCards
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate(
                                        `${route.params.tabRouteInfo.name}Tab`,
                                        {
                                            screen: 'SubInfoDetails',
                                            params: {
                                                details: item
                                            }
                                        }
                                    );
                                }}
                                title={item.title}
                                subText={item.content}
                            />
                        )
                    }

                    return (
                        <LikedProfileCard
                            key={index}
                            data={item}
                            onPress={() => navigation.navigate(`${route.params.tabRouteInfo.name}Tab`, { screen: 'TherapistProfile', params: { data: item } })}
                        />
                    )
                }}
                style={{ flex: 1, paddingHorizontal: 26 }}
            // keyExtractor={item => item.id}
            />

            {pageLoading &&
                <Loading />
            }
        </SafeAreaView>
    )
}

export default LikedPages;