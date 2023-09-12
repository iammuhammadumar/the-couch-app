import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { useAppContext } from '../../Lib/UserContext';
import styles from '../../Styles';

import { GiftedChat } from 'react-native-gifted-chat'

import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button'
import Cards from '../../Components/Card';
import { Loading } from '../../Components/Loading'

import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';

const IndividualMessage = ({ navigation, route }, props) => {
  const { userType, raClient, socket, userData } = useAppContext()
  const [pageLoading, setPageLoading] = useState(false)
  const { chatRoom, returnToMsgList } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity onPress={() => {
          if (!returnToMsgList) {
            navigation.goBack()
            return;
          }

          navigation.navigate('MessagesTab', {
            screen: 'Messages'
          });
        }} style={[styles.flexRowAlignCenter]}>
          <Image
            source={require('../../Assets/Images/backArrow-grey.png')}
            style={{ width: 14, height: 15, marginLeft: 26, marginRight: 7 }}
          />
          <Text
            text={`${chatRoom.given_name} ${chatRoom.family_name}`}
            fontSize={22}
            lineHeight={22}
            fontFamily='primary'
            fontWeight={700}
            color='#6D6A69'
          />
        </TouchableOpacity>
      ),
      headerRight: (props) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MessageSettings', { info: chatRoom })}
          style={[styles.flexRowAlignCenter]}
        >
          <Image
            source={require('../../Assets/Images/infoIcon-grey.png')}
            style={{ width: 28, height: 28, marginRight: 37 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getChatMessages = async () => {
    if (!pageLoading && !isAllLoaded) {
      setPageLoading(true);
      const response = await raClient.getChatMessages(chatRoom.id, nextCursor);
      setMessages((newerMessages) => [...newerMessages, ...response.messages]);
      if (response.nextCursor) {
        setNextCursor(response.nextCursor);
      } else {
        setIsAllLoaded(true);
      }
      setPageLoading(false)
    }
  }

  const navigateToTherapistProfile = async () => {
    try {
      const therapist = await raClient.getUser(chatRoom.user_id);
      console.log("therapist", therapist);
      navigation.navigate("TherapistProfile", { data: therapist });
    } catch (error) {
      console.log("couch.app.individualMessage.chatRoom", error);
    }
  }

  const throttleGetChatMessages = throttle(getChatMessages, 5000);

  useEffect(() => {
    throttleGetChatMessages();
  }, [chatRoom?.id]);

  const sendMessage = () => {
    if (!socket.OPEN) {
      alert("Something went wrong. Please try again.");
      return;
    }

    socket.sendMessage(messageToSend, chatRoom.id);
    setMessageToSend("");
  };

  useEffect(() => {
    socket.onmessage = (e) => {
      const msg = e.data ? JSON.parse(e.data) : null;
      if (!msg || !msg.id) {
        return;
      }
      setMessages((oldMessages) => [msg, ...oldMessages]);
    };
  }, []);

  const isMessageFromMe = (item) => {
    return userData.id === item.user_id;
  }

  return (
    <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ height: '100%' }}
        keyboardVerticalOffset={130}
      >
        <View style={[styles.flexGrow1, { paddingTop: 20 }]}>
          {userType === '0' &&
            <View style={[styles.flexRowAlignCenter, styles.borderBottomGrey1, styles.alignSelfCenter, { marginHorizontal: 7.5 }]}>
              <TouchableOpacity style={[styles.flex1, { marginBottom: 11 }]}>
                <Text
                  text='Chat'
                  fontSize={15}
                  lineHeight={18}
                  fontFamily='primary'
                  fontWeight={400}
                  color='#6D6A69'
                  textAlign='center'
                />
              </TouchableOpacity>
              <View style={[styles.height100, { width: 1, marginBottom: 5, backgroundColor: '#D8D4D4' }]} />

              <TouchableOpacity
                onPress={navigateToTherapistProfile}
                style={[styles.flex1, { marginBottom: 11 }]}>
                <Text
                  text='Profile'
                  fontSize={15}
                  lineHeight={18}
                  fontFamily='primary'
                  fontWeight={400}
                  color='#6D6A69'
                  textAlign='center'
                />
              </TouchableOpacity>
            </View>
          }

          {chatRoom.id && (
            <>
              <FlatList
                ref={ref => this.flatList = ref}
                data={messages}
                inverted
                onEndReached={getChatMessages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <Cards
                        style={[
                          {
                            backgroundColor:
                              isMessageFromMe(item) ? '#FFE6C7' : '#F6E5D4',
                            marginLeft: isMessageFromMe(item) ? 180 : 0,
                            marginRight: isMessageFromMe(item) ? 0 : 180,
                            marginBottom: 37,
                            paddingHorizontal: 7,
                            paddingBottom: 10,
                            paddingTop: 5,
                          },
                        ]}>
                        <View>
                          <Text
                            text={item.message}
                            textAlign={isMessageFromMe(item) ? 'right' : 'left'}
                            fontSize={14}
                            color='#454545'
                            lineHeight={17}
                            fontFamily='primary'
                            fontWeight={400}
                          />
                        </View>
                      </Cards>
                    </View>
                  );
                }}
                style={[styles.flex1, styles.pagePadding]}
              />
            </>
          )}
        </View>

        {pageLoading &&
          <Loading />
        }

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.chatContainer]}>
            <TextInput
              autoFocus={true}
              onSubmitEditing={sendMessage}
              style={[styles.chatTextInput]}
              value={messageToSend}
              onChangeText={setMessageToSend}
              placeholder="Write a message..."
              placeholderTextColor='#A5A0A0'
              marginBottom={10}
            />
            <Button
              style={[styles.chatButton]}
              text="Send"
              color="#383636"
              fontFamily='primary'
              fontWeight={400}
              fontSize={15}
              backgroundColor="transparent"
              onPress={sendMessage}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default IndividualMessage;

// import React, {useState, useEffect, useCallback} from 'react';
// import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
// import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';

// const IndividualMessage = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hello world',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   const renderSend = props => {
//     return <Send {...props}></Send>;
//   };

//   const renderBubble = props => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//         styles={{marginBottom: 100}}
//       />
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="angle-double-down" size={22} color="#333" />;
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//     />
//   );
// };

// export default IndividualMessage;
