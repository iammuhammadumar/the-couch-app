import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Lib/UserContext';
import styles from '../../Styles';
import { Text } from '../../Components/Text'
import { Loading } from '../../Components/Loading'
import Cards from '../../Components/Card';


import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';

function Info({ route, navigation }, props) {
  const { cfClient } = useAppContext();
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPostsByTopic = (topic) => {
    return posts
      .filter((item) => {
        const postTopic = item.topic?.sys?.id;
        return postTopic === topic;
      })
      .sort(((a, b) => a.sortOrder - b.sortOrder));
  };

  useEffect(() => {
    const getPosts = async () => {
      const postEntries = await cfClient.getEntries({ content_type: "blogPosts" });
      const items = postEntries.items.map(({ fields, sys }) => {
        fields.id = sys.id
        return fields;
      });
      setPosts(items);
    };

    const getTopics = async () => {
      try {
        const topicEntries = await cfClient.getEntries({
          content_type: "blogPostTopic"
        });
        const topics = topicEntries.items
          .map(({ fields, sys }) => {
            fields.id = sys.id
            return fields
          })
          .sort(((a, b) => a.sortOrder - b.sortOrder));
        setTopics(topics);
      } catch (error) {
        console.error("Info.contentful.getEntries.error", error);
      }
    };

    getTopics();
    getPosts();

    console.log('topics', topics)
  }, []);

  return (
    <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
      {topics.length > 0 ?
        <FlatList
          data={topics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }, props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.url) {
                    Linking.openURL(item.url);
                    return;
                  }
                  const postsByTopic = getPostsByTopic(item.id);
                  if (!postsByTopic.length) {
                    return;
                  }

                  if (postsByTopic.length === 1) {
                    navigation.navigate('SubInfoDetails', { details: postsByTopic[0] });
                    return;
                  }

                  navigation.navigate('SubInfo', { topic: item.id, posts: postsByTopic });
                }}>
                <Cards
                  style={[
                    styles.infoCardContainer,
                    {
                      paddingTop: 11,
                      paddingBottom: 8,
                      paddingLeft: 25,
                      paddingRight: 27,
                    },
                  ]}>
                  <Text
                    text={item.title}
                    fontSize={22}
                    lineHeight={26}
                    fontFamily='primary'
                    fontWeight={700}
                    color='#454545'
                    marginBottom={5}
                  />
                  <Text
                    text={item.description}
                    fontSize={14}
                    color='#454545'
                    lineHeight={17}
                    fontFamily='primary'
                    fontWeight={400}
                    textAlign='left'
                    marginBottom={10}
                  />
                  <Text
                    text={`Read More >`}
                    fontSize={18}
                    lineHeight={18}
                    color='#F59798'
                    fontFamily='primary'
                    fontWeight={700}
                    textAlign='right'
                  />
                </Cards>
              </TouchableOpacity>
            );
          }}
          style={[styles.flex1, styles.pagePadding]}
        />
        :
        <Loading />
      }
    </SafeAreaView>
  );
}

export default Info;
