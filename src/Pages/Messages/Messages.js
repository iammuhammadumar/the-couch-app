import React, { useState, useEffect } from 'react';

import moment from 'moment';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

import Cards from '../../Components/Card';
import { Text } from '../../Components/Text'
import { Loading } from '../../Components/Loading'

import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import noProfileImg from '../../Assets/Images/noProfileImg.png'
import constants from "../../helpers/constants";
import PaywallModal from '../../Components/PaywallModal';
const { USER_ROLE } = constants;

function Messages({ route, navigation }, props) {
  const color = '#504E4E';
  const NOTIFICATION = "New Match! Click to message.";
  const { userType, raClient, currentSubscription } = useAppContext();
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTypeToShow, setDataTypeToShow] = useState('therapist')
  const [clientChats, setClientChats] = useState([]);
  const [therapistChats, setTherapistChats] = useState([]);

  const calcDateDiffFromNow = (unit, unixTimestamp) => {
    const updatedAt = new Date(unixTimestamp);
    return moment().diff(moment(updatedAt), unit);
  }

  const formatDateTime = (unixTimestamp) => {
    const diff = calcDateDiffFromNow("m", unixTimestamp)
    if (!diff) {
      return `${calcDateDiffFromNow("s", unixTimestamp)}s`;
    }

    if (diff < 60) {
      return `${diff}m`;
    }

    const hours = calcDateDiffFromNow("h", unixTimestamp)
    if (hours < 24) {
      return `${hours}h`;
    }

    // otherwise just return month/day/year
    const eventDate = new Date(unixTimestamp);
    return eventDate.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
    // return moment.unix(unixTimestamp).format("MM/DD/YY");
  };

  const getChatRooms = async () => {
    setPageLoading(true)
    const chatRooms = await raClient.getChatRooms() || [];
    if (userType === USER_ROLE.THERAPIST) {
      const clientChats = chatRooms.filter((chat) => chat.user_role === USER_ROLE.CLIENT);
      setClientChats(clientChats);
    }
    const therapistChats = chatRooms.filter((chat) => chat.user_role === USER_ROLE.THERAPIST);
    therapistChats.sort((a, b) => {
      if (!a.last_message && !b.last_message) {
        return a.updated_at > b.updated_at ? -1 : 1;
      }

      if (!a.last_message) {
        return -1;
      }

      if (!b.last_message) {
        return 1;
      }

      return a.updated_at > b.updated_at ? -1 : 1;
    });

    console.log("therapistChats", therapistChats);
    setTherapistChats(therapistChats);
    setPageLoading(false)
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
      <View>
        <Text
          text='Messages'
          color={color}
          fontSize={18}
          lineHeight={18}
          fontFamily='primary'
          fontWeight={700}
          textAlign='center'
          marginBottom={20}
        />

        {/* Message tabs for therapist only  */}
        {userType === '1' &&
          <View style={[styles.flexRow, { paddingHorizontal: 16 }]}>
            <TouchableOpacity
              onPress={() => setDataTypeToShow('clients')}
              style={[styles.flex1, styles.alignCenter, styles.paddingV10, dataTypeToShow === 'clients' && styles.borderBottomBlack0]}>
              <Text
                text='Clients'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={dataTypeToShow === 'clients' ? 300 : 400}
                color={dataTypeToShow === 'clients' ? '#504E4E' : '#C4C4C4'}
              />
            </TouchableOpacity>

            <View style={{ width: 50 }} />

            <TouchableOpacity
              onPress={() => setDataTypeToShow('therapist')}
              style={[styles.flex1, styles.alignCenter, styles.paddingV10, dataTypeToShow === 'therapist' && styles.borderBottomBlack0]}>
              <Text
                text='Therapists'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={dataTypeToShow === 'therapist' ? 300 : 400}
                color={dataTypeToShow === 'therapist' ? '#504E4E' : '#C4C4C4'}
              />
            </TouchableOpacity>
          </View>
        }

        {pageLoading &&
          <Loading />
        }

        <FlatList
          data={dataTypeToShow === 'clients' ? clientChats : therapistChats}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 126 }}
          renderItem={({ item }, props) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('IndividualMessage', {
                    chatRoom: item,
                  })
                }>
                <Cards
                  style={[!item.last_message ? styles.backgroundColorOrange1 : styles.backgroundColorYellow0, { shadowRadius: 0 }]}>
                  <View style={[styles.flex1, styles.flexRow, { marginLeft: 29, marginVertical: 9, marginRight: 45 }]}>
                    <Image
                      source={item.profile_photo_url ? { uri: item.profile_photo_url } : noProfileImg}
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: 200,
                        marginRight: 11,
                        marginTop: 7,
                        marginBottom: 6,
                      }}
                    />
                    <View
                      style={[styles.flex1, {
                        marginTop: 15,
                        marginBottom: 32,
                      }]}>
                      <View>
                        <Text
                          text={`${item.given_name} ${item.family_name}`}
                          fontSize={22}
                          lineHeight={26}
                          fontFamily='primary'
                          fontWeight={700}
                          color='#454545'
                          marginBottom={10}
                        />
                      </View>
                      <View style={[styles.flex1, styles.flexRowSpaceBetween]}>
                        <Text
                          text={!item.last_message ? NOTIFICATION : item.last_message.message}
                          ellipsizeMode="tail"
                          fontSize={14}
                          color='#454545'
                          lineHeight={17}
                          fontFamily='primary'
                          fontWeight={400}
                          textAlign='left'
                          textStyle={{ marginRight: 20 }}
                        />
                        {item.messages &&
                          <Text
                            text={item.last_message ? formatDateTime(item.last_message.updated_at) : ""}
                            fontSize={14}
                            color='#454545'
                            lineHeight={17}
                            fontFamily='primary'
                            fontWeight={400}
                            textAlign='right'
                          />
                        }
                      </View>
                    </View>
                  </View>
                </Cards>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {
        userType !== USER_ROLE.CLIENT && !currentSubscription &&
        <PaywallModal feature="chat_access" unlockFeatures={() => navigation.navigate('Subscription')} />
      }
    </SafeAreaView >
  );
}

export default Messages;
