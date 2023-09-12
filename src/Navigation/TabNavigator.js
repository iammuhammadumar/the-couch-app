import React, { useState } from 'react';
import styles from '../Styles';
import { useAppContext } from '../Lib/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import BottomTabBar from './BottomTabBar';

import Profile from '../Pages/Profile/Profile';
import EditProfile from '../Pages/Profile/EditProfile';
import Preferences from '../Pages/Profile/Preferences';
import EditPreferences from '../Pages/Profile/EditPreferences';
import AccountSettings from '../Pages/Profile/AccountSettings';
import EditAccountSettings from '../Pages/Profile/EditAccountSettings';
import Subscription from '../Pages/Profile/Subscription';

import Home from '../Pages/Home/Home';
import LikedPages from '../Pages/Home/LikedPages';
import TherapistProfile from '../Components/TherapistProfile';
import SearchProfilesAndArticles from '../Pages/Home/SearchProfilesAndArticles'

import Info from '../Pages/Info/Info';
import SubInfo from '../Pages/Info/SubInfo';
import SubInfoDetails from '../Pages/Info/SubInfoDetails';

import Messages from '../Pages/Messages/Messages';
import IndividualMessage from '../Pages/Messages/IndividualMessage';
import MessageSettings from '../Pages/Messages/MessageSettings'

import redCouchIcon from '../Assets/Images/bigRedCouch.png';
// import theCouchLogo from '../Assets/Images/theCouchLogo.png';
import backArrowGrey from '../Assets/Images/backArrow-grey.png';

import heartIconGrey from '../Assets/Images/heartIcon-grey.png';
import heartIconPink from '../Assets/Images/heartIcon-pink.png'
import searchIconGrey from '../Assets/Images/searchIcon-grey.png'
import prefIcon from '../Assets/Images/prefIcon.png';

import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />} // Rendering custom bottom tab bar
      initialRouteName="HomeTab">
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{ title: '', headerShown: false }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ title: '', headerShown: false }}
      />
      <Tab.Screen
        name="InfoTab"
        component={InfoTab}
        options={{ title: '', headerShown: false }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={MessagesTab}
        options={{ title: '', headerShown: false, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const tabStyles = StyleSheet.create({
  headerStyle: {
    height: Platform.OS === 'ios' ? 120 : 68,
    backgroundColor: '#FCFAEA',
    elevation: 0, // Removes border on android
    shadowColor: 'transparent', // Removes border on ios
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});

const Stack = createStackNavigator();

const ProfileTab = ({ route, navigation }, props) => {
  return (
    // controls the top header for the tabbed screens
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: [tabStyles.headerStyle],
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        // headerTintColor: '#fff',
        // headerTransparent: true,
        headerBackImage: () => (
          <Image
            source={backArrowGrey}
            style={{ width: 14, height: 15, marginLeft: 26 }}
          />
        ),
        headerBackTitle: ' ',
        headerBackground: () => (
          <View
            style={[
              tabStyles.headerStyle,
              styles.flexCenterCenter,
              { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
            ]}>
            <Image style={{ width: 120, height: 50 }} source={redCouchIcon} />
          </View>
        ),
        // headerRight: () => (
        // ),
        // cardStyle: { backgroundColor: '#fff' },
      }}

    // headerMode='float' // Will keep the header fixed up top on screen change in ios AND android
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />
      {/* Add a Stack.Screen for all screens this tab will need to navigate to */}

      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="EditPreferences"
        component={EditPreferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      {/* ONLY THERAPISTS ACCESS TO THIS PAGE */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="EditAccountSettings"
        component={EditAccountSettings}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />
    </Stack.Navigator>
  );
};

export { ProfileTab };

const HomeTab = ({ route, navigation }, props) => {
  const { raClient, headerPostLike, setHeaderPostLike } = useAppContext();
  // const screenWidth = Dimensions.get('window').width;
  // const screenHeight = Dimensions.get('window').height;

  // let logoToUse = redCouchIcon;
  // let logoStyle = { width: 120, height: 50 };

  // if (userType === '0') {
  //   logoToUse = redCouchIcon;
  //   logoStyle = { width: 120, height: 50 };
  // } else {
  //   logoToUse = theCouchLogo;
  //   logoStyle = {
  //     width: screenWidth >= 340 ? 234 : 170,
  //     height: screenWidth >= 340 ? 50 : 35,
  //     marginRight: 6,
  //   };
  // }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: [tabStyles.headerStyle],
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        // headerTransparent: true,
        headerBackImage: () => (
          <Image
            source={backArrowGrey}
            style={{ width: 14, height: 15, marginLeft: 26 }}
          />
        ),
        headerBackTitle: ' ',

        headerBackground: () => (
          <View
            style={[
              tabStyles.headerStyle,
              styles.flexCenterCenter,
              { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
            ]}>
            <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
          </View>
        ),
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeTab', { screen: 'LikedPages', params: { tabRouteInfo: route } })}>
              <Image
                source={heartIconGrey}
                style={{ width: 32, height: 29, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View
              style={[
                tabStyles.headerStyle,
                styles.flexCenterCenter,
                { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
              ]}>
              <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
            </View>
          ),
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeTab', { screen: 'SearchProfilesAndArticles', params: { tabRouteInfo: route } })}>
                <Image
                  source={searchIconGrey}
                  style={{ width: 30, height: 31, marginRight: 27 }}
                />
              </TouchableOpacity>
            )
          },
        })}
      />
      {/* Add a Stack.Screen for all screens this tab will need to navigate to */}
      <Stack.Screen
        name="LikedPages"
        component={LikedPages}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SearchProfilesAndArticles"
        component={SearchProfilesAndArticles}
        options={{
          title: '',
          headerBackTitle: ' ',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TherapistProfile"
        component={TherapistProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="EditPreferences"
        component={EditPreferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      {/* ONLY THERAPISTS ACCESS TO THIS PAGE */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfo"
        component={SubInfo}
        options={{
          title: ' ',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfoDetails"
        component={SubInfoDetails}
        options={({ route }) => {
          const postId = route?.params?.details?.id;

          const updatePostLike = async () => {
            try {
              const like = await raClient.updatePostLike(postId);
              setHeaderPostLike(like);
            } catch (error) {
              console.log("TabNavigator.likePost", error);
            }
          };

          return {
            title: ' ',
            headerBackTitle: ' ',
            headerBackground: () => (
              <View
                style={[
                  tabStyles.headerStyle,
                  styles.flexCenterCenter,
                  { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
                ]}>
                <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
              </View>
            ),
            headerRight(props) {
              console.log("props", props);
              return (
                <TouchableOpacity
                  onPress={updatePostLike}>
                  <Image
                    source={headerPostLike ? heartIconPink : heartIconGrey}
                    style={{ width: 32, height: 29, marginRight: 27 }}
                  />
                </TouchableOpacity>
              )
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeTab };

const InfoTab = ({ route, navigation }, props) => {
  const { userType, raClient, headerPostLike, setHeaderPostLike } = useAppContext();

  return (
    <Stack.Navigator
      initialRouteName="Info"
      screenOptions={{
        headerStyle: [tabStyles.headerStyle],
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        // headerTintColor: '#fff',
        // headerTransparent: true,
        headerBackImage: () => (
          <Image
            source={backArrowGrey}
            style={{ width: 14, height: 15, marginLeft: 26 }}
          />
        ),
        headerBackTitle: ' ',
        headerBackground: () => (
          <View
            style={[
              tabStyles.headerStyle,
              styles.flexCenterCenter,
              { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
            ]}>
            <Image style={{ width: 120, height: 50 }} source={redCouchIcon} />
          </View>
        ),
        // headerRight: () => (
        //     <HeaderRightIcons />
        // ),
        // cardStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="Info"
        component={Info}
        options={({ route }) => ({
          title: '',
          headerBackTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('InfoTab', { screen: 'LikedPages', params: { tabRouteInfo: route } })}>
              <Image
                source={heartIconGrey}
                style={{ width: 32, height: 29, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          // headerBackground: () => (
          //   <View
          //     style={[
          //       tabStyles.headerStyle,
          //       styles.flexCenterCenter,
          //       { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
          //     ]}>
          //     <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
          //   </View>
          // ),
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('InfoTab', { screen: 'SearchProfilesAndArticles', params: { tabRouteInfo: route } })}>
                <Image
                  source={searchIconGrey}
                  style={{ width: 30, height: 31, marginRight: 27 }}
                />
              </TouchableOpacity>
            )
          },
        })}
      />

      {/* Add a Stack.Screen for all screens this tab will need to navigate to  */}
      <Stack.Screen
        name="LikedPages"
        component={LikedPages}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SearchProfilesAndArticles"
        component={SearchProfilesAndArticles}
        options={{
          title: '',
          headerBackTitle: ' ',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TherapistProfile"
        component={TherapistProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="EditPreferences"
        component={EditPreferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      {/* ONLY THERAPISTS ACCESS TO THIS PAGE */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfo"
        component={SubInfo}
        options={{
          title: ' ',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfoDetails"
        component={SubInfoDetails}
        options={({ route }) => {
          const postId = route?.params?.details?.id;

          const updatePostLike = async () => {
            try {
              const like = await raClient.updatePostLike(postId);
              setHeaderPostLike(like);
            } catch (error) {
              console.log("TabNavigator.likePost", error);
            }
          };

          return {
            title: ' ',
            headerBackTitle: ' ',
            headerBackground: () => (
              <View
                style={[
                  tabStyles.headerStyle,
                  styles.flexCenterCenter,
                  { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
                ]}>
                <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
              </View>
            ),
            headerRight(props) {
              console.log("props", props);
              return (
                <TouchableOpacity
                  onPress={updatePostLike}>
                  <Image
                    source={headerPostLike ? heartIconPink : heartIconGrey}
                    style={{ width: 32, height: 29, marginRight: 27 }}
                  />
                </TouchableOpacity>
              )
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

export { InfoTab };

const MessagesTab = ({ route, navigation }, props) => {
  const { userType, raClient, headerPostLike, setHeaderPostLike } = useAppContext();

  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerStyle: [tabStyles.headerStyle],
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        // headerTintColor: '#fff',
        // headerTransparent: true,
        headerBackImage: () => (
          <Image
            source={backArrowGrey}
            style={{ width: 14, height: 15, marginLeft: 26 }}
          />
        ),
        headerBackTitle: ' ',
        headerBackground: () => (
          <View
            style={[
              tabStyles.headerStyle,
              styles.flexCenterCenter,
              { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
            ]}>
            <Image style={{ width: 120, height: 50 }} source={redCouchIcon} />
          </View>
        ),
        // headerRight: () => (
        // ),
        // cardStyle: { backgroundColor: '#fff' },
      }}>
      {/* Add a Stack.Screen for all screens this tab will need to navigate to  */}
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({
          // headerTransparent: Platform.OS === 'ios' ? true : false,
          // headerStyle: [tabStyles.headerStyle, { backgroundColor: '#F0EADF' }],
          title: '',
          headerBackTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MessagesTab', { screen: 'LikedPages', params: { tabRouteInfo: route } })}>
              <Image
                source={heartIconGrey}
                style={{ width: 32, height: 29, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          // headerBackground: () => (
          //   <View
          //     style={[
          //       tabStyles.headerStyle,
          //       styles.flexCenterCenter,
          //       { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
          //     ]}>
          //     <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
          //   </View>
          // ),
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('MessagesTab', { screen: 'SearchProfilesAndArticles', params: { tabRouteInfo: route } })}>
                <Image
                  source={searchIconGrey}
                  style={{ width: 30, height: 31, marginRight: 27 }}
                />
              </TouchableOpacity>
            )
          },
        })}
      />

      <Stack.Screen
        name="LikedPages"
        component={LikedPages}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SearchProfilesAndArticles"
        component={SearchProfilesAndArticles}
        options={{
          title: '',
          headerBackTitle: ' ',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="EditPreferences"
        component={EditPreferences}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      {/* ONLY THERAPISTS ACCESS TO THIS PAGE */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="IndividualMessage"
        component={IndividualMessage}
        // options={({route}) => ({
        //   title: route.params.name,
        //   headerBackTitleVisible: false,
        // })}
        options={{
          title: ' ',
          headerBackTitle: ' ',
          headerBackground: null,
        }}
      />

      <Stack.Screen
        name="MessageSettings"
        component={MessageSettings}
        options={{
          title: ' ',
          headerBackTitle: ' ',
          headerBackground: null,
        }}
      />

      <Stack.Screen
        name="TherapistProfile"
        component={TherapistProfile}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfo"
        component={SubInfo}
        options={{
          title: ' ',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="SubInfoDetails"
        component={SubInfoDetails}
        options={({ route }) => {
          const postId = route?.params?.details?.id;
          const updatePostLike = async () => {
            try {
              const like = await raClient.updatePostLike(postId);
              setHeaderPostLike(like)
            } catch (error) {
              console.log("TabNavigator.likePost", error);
            }
          };

          return {
            title: ' ',
            headerBackTitle: ' ',
            headerBackground: () => (
              <View
                style={[
                  tabStyles.headerStyle,
                  styles.flexCenterCenter,
                  { paddingTop: Platform.OS === 'ios' ? 38 : 0 },
                ]}>
                <Image source={redCouchIcon} style={{ width: 120, height: 50 }} />
              </View>
            ),
            headerRight(props) {
              console.log("props", props);
              return (
                <TouchableOpacity
                  onPress={updatePostLike}>
                  <Image
                    source={headerPostLike ? heartIconPink : heartIconGrey}
                    style={{ width: 32, height: 29, marginRight: 27 }}
                  />
                </TouchableOpacity>
              )
            }
          };
        }}
      />

      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />

      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          title: '',
          headerBackTitle: ' ',
        }}
      />
    </Stack.Navigator>
  );
};

export { MessagesTab };
