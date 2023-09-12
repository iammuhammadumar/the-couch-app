import React, { useEffect, useState, createRef } from 'react';
import { useAppContext } from '../../Lib/UserContext';
import styles from '../../Styles';
import { useNavigation } from '@react-navigation/native'
import { Text } from "../../Components/Text";
import { Button } from "../../Components/Button";

import Swiper from 'react-native-deck-swiper';

import { SwipeTherapistCard } from './SwipeTherapistCard';
import { SwipeTherapistModalFlow } from './SwipeTherapistModalFlow';

// import drSmithPhoto from '../../Assets/Images/drSmithPhoto.png';
// import drJonesPhoto from '../../Assets/Images/drJonesPhoto.png';
import rejectIcon from '../../Assets/Images/rejectIcon.png';
import acceptIcon from '../../Assets/Images/acceptIcon.png';
import constants from '../../helpers/constants.js'
const { SWIPE } = constants;

import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export const SwipeThroughTherapists = (props) => {
  const { raClient, socket, userType, screenWidth, screenHeight } = useAppContext()
  const Navigation = useNavigation()

  const [therapists, setTherapists] = useState([]);
  const [isRecsEmpty, setIsRecsEmpty] = useState(props.isRecsEmpty);
  const swiperRef = createRef();

  const [modalFlowOpen, setModalFlowOpen] = useState(false);
  const [modalToShow, setModalToShow] = useState('');
  const [swiperKey, setSwiperKey] = useState(0);

  const [didUseSwipe, setDidUseSwipe] = useState(false);
  const [shouldShowSecondCard, setShouldShowSecondCard] = useState(true);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentTherapistObj, setCurrentTherapistObj] = useState(null);

  const [messageToTherapist, setMessageToTherapist] = useState('');
  const [dontShowConnectingPage, setDontShowConnectingPage] = useState(false);

  const [dontShowRejectingPage, setDontShowRejectingPage] = useState(false);

  useEffect(() => {
    // props.data.forEach((profile) => {
    //   console.log('profile.profile_photo_url', profile.profile_photo_url)
    //   return profile.profile_photo_url = drSmithPhoto
    // })
    setTherapists(props.data)
  }, [props.data])

  // const onSwiped = () => {
  //   setCurrentCardIndex(currentCardIndex + 1);
  // };

  const rejectTherapistModalFlow = () => {
    if (!dontShowRejectingPage) {
      setModalToShow('rejecting');
      setModalFlowOpen(true);
    } else {
      rejectTherapist();
    }
  };

  const rejectTherapist = async () => {
    setModalFlowOpen(false);
    // remove current/top therapist from the stack to be rejected
    const rejectedTherapist = therapists[currentCardIndex];
    if (rejectedTherapist?.id) {
      const {
        recommendations,
        isEmpty
      } = await raClient.swipeUser({
        swipe: SWIPE.LEFT
      }, rejectedTherapist.id);
      console.log(recommendations[0]?.family_name);
      console.log('recommendations', recommendations);
      setTherapists(recommendations);
      setIsRecsEmpty(isEmpty);
      // To force rerender the swiper
      setSwiperKey(swiperKey + 1);
    }
    // TODO: keep rejected therapist and add to an array in the backend because if user goes through all therapist that meet dealbreakers, bring these ones back up to show the user again (Swiper onSwipedAll function)
  };

  const acceptTherapistModalFlow = () => {
    setModalToShow('messaging');
    setModalFlowOpen(true);
  };

  const acceptTherapist = async () => {
    // remove current/top therapist from the stack to be accepted
    const acceptedTherapist = therapists[currentCardIndex]; // TODO: send accepted therapist to likes
    // TODO: Remove that therapist from the list and send updated list to the backend?
    console.log("acceptedTherapist", acceptedTherapist?.family_name);
    if (acceptedTherapist?.id) {
      const {
        recommendations,
        isEmpty
      } = await raClient.swipeUser({
        swipe: SWIPE.RIGHT
      }, acceptedTherapist.id);
      console.log(recommendations[0]?.family_name);
      setTherapists(recommendations);
      setIsRecsEmpty(isEmpty);
      // To force rerender the swiper
      setSwiperKey(swiperKey + 1);
    }
  };

  const createChat = async () => {
    try {
      const chat = await raClient.addChatRoom({
        recipientId: currentTherapistObj.id
      });
      return chat;
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendMessage = async () => {
    // ... TODO: send message to therapist
    acceptTherapist();
    setModalToShow('message sent');
    console.log('messageToTherapist', messageToTherapist);
    if (!socket.OPEN) {
      alert("Something went wrong. Please try again by reopening the app.");
      return;
    }

    const chatRoom = await createChat();
    socket.sendMessage(messageToTherapist, chatRoom.id, true);
  };

  const addToMessageList = () => {
    // ... TODO: add therapist to message list
    setModalToShow('added to message list');
    createChat();
    acceptTherapist();
  };

  // User decided to undo their selection of either to reject or accept the current therapist
  const undoSelection = () => {
    if (didUseSwipe) {
      // setShouldShowSecondCard(false)
      swiperRef.current.swipeBack();
      // setShouldShowSecondCard(true)
    }
    setModalFlowOpen(false);
  };

  const resetRecommendations = async () => {
    try {
      // this will make the users that are swiped left re-appear in the list
      // users who are already swiped right are not - as users can see them in messages list already
      const {
        recommendations,
        isEmpty
      } = await raClient.resetRecommendations();
      setTherapists(recommendations);
      setIsRecsEmpty(isEmpty);
    } catch (error) {
      console.log("error", error);
    }
  };

  const adjustFilters = () => {
    if (userType === '0') {
      Navigation.navigate('HomeTab', { screen: 'Preferences', params: { tabRouteInfo: props.route } })
    } else {
      Navigation.navigate('HomeTab', { screen: 'EditProfile', params: { tabRouteInfo: props.route } })
    }
  };

  return (
    therapists && therapists.length > 0 ?
      <View style={[styles.width100, styles.flexGrow1]}>
        <Swiper
          key={swiperKey}
          ref={swiperRef}
          cards={therapists}
          renderCard={(cardObj, index) => {
            if (cardObj) {
              return (
                <SwipeTherapistCard
                  key={index}
                  data={cardObj}
                  maxHeight={screenHeight - (screenHeight >= 550 ? 225 : 185)}
                />
              )
            }
          }}
          // onSwiped={onSwiped}
          cardIndex={currentCardIndex}
          swipeBackCard={true}
          onSwipedLeft={(cardIndex) => (
            setDidUseSwipe(true),
            setCurrentTherapistObj(therapists[cardIndex]),
            rejectTherapistModalFlow()
          )}
          onSwipedRight={(cardIndex) => (
            setDidUseSwipe(true),
            setCurrentTherapistObj(therapists[cardIndex]),
            acceptTherapistModalFlow()
          )}
          showSecondCard={true}
          // showSecondCard={shouldShowSecondCard}
          // onSwipedAll={ }
          stackSize={2}
          stackScale={0}
          stackSeparation={screenHeight - (screenHeight >= 550 ? 205 : 165)}
          backgroundColor="transparent"
          containerStyle={{ width: '100%', flex: 1 }}
          cardVerticalMargin={0}
          cardHorizontalMargin={26} // calculates the width of the card
          disableTopSwipe={true}
          disableBottomSwipe={true}
        />
        {/* Bottom buttons */}
        <View
          style={[
            styles.swipeBtns,
            { paddingHorizontal: screenWidth >= 340 ? 60 : 50 },
          ]}>
          <TouchableOpacity
            onPress={() => (
              setDidUseSwipe(false),
              swiperRef.current.swipeLeft(),
              rejectTherapistModalFlow(),
              console.log('swiperRef.current', swiperRef.current)
            )}>
            <Image source={rejectIcon} style={{ width: 54, height: 55 }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (
              setDidUseSwipe(false),
              swiperRef.current.swipeRight(),
              acceptTherapistModalFlow(),
              console.log(
                'swiperRef.current, ',
                swiperRef.current,
                swiperRef.current.props.cardIndex,
              )
            )}>
            <Image source={acceptIcon} style={{ width: 54, height: 55 }} />
          </TouchableOpacity>
        </View>
        <SwipeTherapistModalFlow
          visible={modalFlowOpen}
          setModalFlowOpen={setModalFlowOpen}
          modalToShow={modalToShow}
          currentTherapistObj={currentTherapistObj}
          setModalToShow={setModalToShow}
          rejectTherapist={rejectTherapist}
          messageToTherapist={messageToTherapist}
          setMessageToTherapist={setMessageToTherapist}
          sendMessage={sendMessage}
          addToMessageList={addToMessageList}
          dontShowConnectingPage={dontShowConnectingPage}
          setDontShowConnectingPage={setDontShowConnectingPage}
          undoSelection={undoSelection}
          dontShowRejectingPage={dontShowRejectingPage}
          setDontShowRejectingPage={setDontShowRejectingPage}
        />
      </View>

      :

      <View style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        alignContent: "space-between",
        alignSelf: "stretch",
        padding: 15
      }}>
        <Text
          text="That's all for now!"
          fontSize={28}
          lineHeight={34}
          fontFamily='primary'
          fontWeight={700}
          color={styles.colorGrey2}
          textAlign='center'
          marginTop={30}
        />
        <Text
          text={
            !isRecsEmpty ?
              "That’s all the therapists that currently meet your search criteria. You can start over and see them all again or you can change your filters in order to see new therapists." :
              "That’s all the therapists that currently meet your search criteria. You can change your filters in order to see new therapists."
          }
          fontSize={17}
          lineHeight={30}
          fontFamily='primary'
          fontWeight={300}
          color={styles.colorGrey2}
          textAlign='center'
          marginTop={30}
          marginBottom={50}
        />
        {
          !isRecsEmpty &&
          <Button
            text="See therapists again"
            onPress={resetRecommendations}
            textAlign="center"
            width="80%"
            marginBottom={30}
            paddingLeft={20}
            paddingRight={20}
            paddingTop={20}
            paddingBottom={20}
          />
        }
        <Button
          text="Adjust filters"
          onPress={adjustFilters}
          textAlign="center"
          width="80%"
          marginBottom={30}
          paddingLeft={20}
          paddingRight={20}
          paddingTop={20}
          paddingBottom={20}
        />
      </View>
  );
};
