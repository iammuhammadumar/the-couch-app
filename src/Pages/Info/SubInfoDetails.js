import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-native-markdown-display';

import { Text } from '../../Components/Text'

import {
  View,
  Image
} from 'react-native';
import Cards from '../../Components/Card';
import styles from '../../Styles';

import { PageScroll } from '../../Components/PageScroll';
import { useAppContext } from '../../Lib/UserContext';

const SubInfoDetails = ({ navigation, route }) => {
  const scrollViewRef = useRef(null);
  const { raClient, setHeaderPostLike } = useAppContext();
  const { details } = route.params;

  useEffect(() => {
    const getPostLike = async () => {
      try {
        const postLike = await raClient.getPostLike(details.id);
        setHeaderPostLike(postLike);
      } catch (error) {
        console.log("subInfoDetails.error", error);
      }
    }

    getPostLike();
  }, []);

  return (
    <PageScroll>
      <>
        <View style={[styles.pageAboveBottomTab, { marginTop: 72 }]}>
          <Text
            text={details.title}
            fontSize={18}
            lineHeight={18}
            fontFamily='primary'
            fontWeight={700}
            color='#766E6E'
            textAlign='center'
            marginBottom={20}
          />
          <Markdown
            rules={{
              text: (node) => <Text
                key={node.key}
                text={node.content}
                fontSize={18}
                lineHeight={20}
                color='#766E6E'
                fontFamily='secondary'
                textAlign='center'
              />,
              strong: (node) => <Text
                key={node.children[0].key}
                fontSize={18}
                fontWeight={600}
                lineHeight={20}
                color='#766E6E'
                fontFamily='secondary'
                textAlign='center'
                text={node.children[0].content}
              />,
              image: (
                node,
                children,
                parent,
                styles,
                allowedImageHandlers,
                defaultImageHandler,
              ) => {
                const { src, alt } = node.attributes;

                // we check that the source starts with at least one of the elements in allowedImageHandlers
                const show =
                  allowedImageHandlers.filter((value) => {
                    return src.toLowerCase().startsWith(value.toLowerCase());
                  }).length > 0;

                if (show === false && defaultImageHandler === null) {
                  return null;
                }

                const imageProps = {
                  indicator: true,
                  key: node.key,
                  style: {
                    display: "flex",
                    minWidth: 200,
                    minHeight: 200,
                    marginLeft: "auto",
                    marginRight: "auto"
                  },
                  source: {
                    uri: show === true ? src : `${defaultImageHandler}${src}`,
                  },
                };

                if (alt) {
                  imageProps.accessible = true;
                  imageProps.accessibilityLabel = alt;
                }

                return <Image {...imageProps} />;
              }
            }}
          >
            {details.content}
          </Markdown>
        </View>
      </>
    </PageScroll>
  );
};

export default SubInfoDetails;
