import React, { useEffect } from 'react';
import styles from '../../Styles'
import { useAppContext } from '../../Lib/UserContext';
import { uploadProfileImage } from "../../helpers/utils";

import { PageScroll } from '../../Components/PageScroll'
import { UploadAnImage } from '../../Components/UploadAnImage'
import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button';

import noProfileImg from '../../Assets/Images/noProfileImg.png'
import prefIcon from '../../Assets/Images/prefIcon.png'
import questionMarkIcon from '../../Assets/Images/questionMarkIcon.png'

import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'


const Profile = ({ route, navigation }, props) => {
  const { userType, userData, setUserData, raClient } = useAppContext();

  const updateAnswerOnPage = async (stateName, statePath, newValue) => {
    const key = await uploadProfileImage(stateName, newValue);
    const user = await raClient.updateUser({
      [stateName]: key
    });
    setUserData({
      ...userData,
      [stateName]: user[stateName],
      updated_at: user.updated_at
    });
  }


  return (
    <PageScroll>
      <View style={[styles.pageAboveBottomTab, styles.paddingT50]}>
        <View style={[styles.alignCenter, { marginBottom: 45 }]}>
          <UploadAnImage
            key={userData.updated_at}
            disabled={userType === '1'}
            hidePlusSign={userType === '1'}
            stateName='profile_photo_url'
            statePath={null}
            value={userData?.profile_photo_url}
            backgroundImage={noProfileImg}
            onChangefunc={updateAnswerOnPage}
            marginBottom={0}
          />

          {userType === '1' &&
            <Button
              text='Edit Profile'
              onPress={() => navigation.navigate('EditProfile')}
              width='auto'
              color='#fff'
              btnStyle={{ position: 'absolute', bottom: '-7%' }}
            />
          }
        </View>

        <View style={[styles.width100]}>
          {userType === '0' &&
            <TouchableOpacity
              onPress={() => navigation.navigate('Preferences')}
              style={[styles.height55, styles.flexRowAlignCenter, styles.justifySpaceBetween, styles.paddingL5R20, styles.borderBottomGrey0]}
            >
              <Text
                text='Preferences'
                fontSize={15}
                lineHeight={18}
                fontFamily='primary'
                fontWeight={700}
                color='#6D6A69'
              />
              <Image source={prefIcon} style={{ width: 33, height: 23 }} />
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSettings')}
            style={[styles.height55, styles.flexRowAlignCenter, styles.justifySpaceBetween, styles.paddingL5R20, styles.borderBottomGrey0]}
          >
            <Text
              text='Account'
              fontSize={15}
              lineHeight={18}
              fontFamily='primary'
              fontWeight={700}
              color='#6D6A69'
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.width100, styles.height55, styles.flexRowAlignCenter, styles.justifySpaceBetween, styles.paddingL5R20, styles.borderBottomGrey0]}>
            <Text
              text='Help Center'
              fontSize={15}
              lineHeight={18}
              fontFamily='primary'
              fontWeight={700}
              color='#6D6A69'
            />
            <Image source={questionMarkIcon} style={{ width: 12, height: 16.5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </PageScroll>
  )
};

export default Profile;
