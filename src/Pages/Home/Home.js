import React, { useEffect, useState } from 'react';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

// import { PageScroll } from '../../Components/PageScroll';
import { SwipeThroughTherapists } from './SwipeThroughTherapists'
import { TabsOnboardingModal } from './TabsOnboardingModal'
import { Loading } from '../../Components/Loading'

// import { Text } from '../../Components/Text';
// import { Button } from '../../Components/Button';

import {
  View,
} from 'react-native';

const Home = ({ route, navigation }, props) => {
  const { userType, setUserType, userData, isNewUser, setIsNewUser, raClient, therapistProfiles, setTherapistProfiles } = useAppContext();
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false)
  const [isRecsEmpty, setIsRecsEmpty] = useState(null);
  useEffect(() => {
    if (userType === '0' && isNewUser) {
      setOnboardingModalOpen(true)
    }
  }, [])

  useEffect(() => {
    const getTherapistProfiles = async () => {
      const {
        recommendations,
        isEmpty
      } = await raClient.getRecommendations() || {};
      setTherapistProfiles(recommendations);
      setIsRecsEmpty(isEmpty);
    }

    getTherapistProfiles();
  }, [userData, therapistProfiles && therapistProfiles[0] && therapistProfiles[0].id]);

  // console.log('From home tab (userData): ', userData, 'isNewUser: ', isNewUser)

  return (
    <View style={[styles.pageAboveBottomTab, styles.alignCenter, { paddingHorizontal: 0 }]}>
      {therapistProfiles && isRecsEmpty !== null ?
        <SwipeThroughTherapists
          data={therapistProfiles}
          isRecsEmpty={isRecsEmpty}
          route={route}
        />
        :
        <Loading />
      }

      <TabsOnboardingModal
        visible={onboardingModalOpen}
        closeModalFunc={() => setOnboardingModalOpen(false)}
      />
    </View>
  );
};

export default Home;
