import React, { useEffect, useState } from 'react';
import { Text } from '../../Components/Text'

import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Cards from '../../Components/Card';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

const SubInfo = ({ navigation, route }, props) => {
  const bgColor = '#FCFAEA';
  const bottom27 = 7;

  const topic = route.params.topic;
  const { cfClient } = useAppContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params.posts) {
      setPosts(route.params.posts);
      return;
    }

    const getPosts = async () => {
      const postEntries = await cfClient.getEntries({
        content_type: "blogPosts"
      });
      const items = postEntries.items
        .map(({ fields, sys }) => {
          fields.id = sys.id
          return fields;
        })
        .filter((item) => {
          const postTopic = item.topic?.sys?.id;
          return postTopic === topic;
        });

      console.log("items", items);
      setPosts(items);

      if (!items.length) {
        navigation.goBack();
        return;
      }
    };

    getPosts();
  }, [route.params.posts])

  return (
    posts.length ?
      <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
        <>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubInfoDetails', { details: item })
                  }>
                  <Cards
                    style={[
                      styles.infoCardContainer,
                      styles.infoCardShadow,
                      { backgroundColor: bgColor },
                      { marginBottom: bottom27 },

                      {
                        paddingTop: 22,
                        paddingBottom: 11,
                        paddingHorizontal: 21,
                        marginHorizontal: 9,
                      },
                    ]}>
                    <View>
                      <Text
                        text={item.title}
                        fontSize={18}
                        lineHeight={18}
                        fontFamily='primary'
                        fontWeight={700}
                        color='#766E6E'
                        textAlign='center'
                        marginBottom={20}
                      />
                      <Text
                        text={item.content}
                        fontSize={14}
                        lineHeight={17}
                        fontFamily='secondary'
                        fontWeight={400}
                        color='#454545'
                        textAlign='center'
                        marginBottom={20}
                        numberOfLines={8}
                        ellipsizeMode="tail"
                      />

                      <Text
                        text={`Read More >`}
                        fontSize={18}
                        lineHeight={18}
                        color='#DB9821'
                        fontFamily='primary'
                        fontWeight={700}
                        textAlign='center'
                      />
                    </View>
                  </Cards>
                </TouchableOpacity>
              );
            }}
            style={[styles.flex1, styles.pagePadding]}
          />
        </>
      </SafeAreaView> :
      <></>
  );
};

export default SubInfo;
