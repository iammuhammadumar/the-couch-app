import React, { useEffect, useState } from 'react';
import branch from 'react-native-branch'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { StorageHelper } from '@aws-amplify/core';

import awsExports from "./src/aws-exports.js";

import styles from './src/Styles';
import { AppContext } from './src/Lib/UserContext';
// App.js
// import AsyncStorage from '@react-native-async-storage/async-storage'; // *** For testing userData
import Purchases from 'react-native-purchases';

import { Auth, Hub } from 'aws-amplify'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as RootNavigation from './src/Navigation/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SelectUserType from './src/Pages/SignInFlow/SelectUserType';
import CreateAccount from './src/Pages/CreateAccountFlow/CreateAccount';
import Login from './src/Pages/SignInFlow/Login';
import NewClientUserFlow from './src/Pages/CreateAccountFlow/Client/NewClientUserFlow';
import NewTherapistUserFlow from './src/Pages/CreateAccountFlow/Therapist/NewTherapistUserFlow';

import TabNavigator from './src/Navigation/TabNavigator.js';
import RestApiClient from './src/Services/RestApi/index.js'
import SocketClient from './src/Services/Websocket/SocketClient';
import appConfig from "./config/index.js";

import backArrowGrey from './src/Assets/Images/backArrow-grey.png';

import userSchema from "./src/Models/user.js";
import constants from './src/helpers/constants';

import {
  Dimensions,
  StyleSheet,
  Image,
  Platform,
} from 'react-native'

const { websocketConfig, revenuecatConfig, contentfulConfig, amplifyConfig } = appConfig;
const { USER_ROLE } = constants;
const contentful = require('contentful/dist/contentful.browser.min.js');
const cfClient = contentful.createClient(contentfulConfig);

const Stack = createNativeStackNavigator();
const raClient = new RestApiClient({
  apiName: amplifyConfig.API.endpoints[0].name
});

const headerStyles = StyleSheet.create({
  container: {
    // height: Platform.OS === 'ios' ? 95 : 50,
    backgroundColor: styles.backgroundColorYellow0.backgroundColor,
    boxShadow: { width: 0, height: 0 },
    shadowColor: 'red', // Removes border on ios
    elevation: 0, // Removes border on android
  },
  headerTitleStyle: {
    fontSize: 18,
  },
});

export default function App() {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [loginLoading, setLoginLoading] = useState(false)
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 2 options: '0' for client or '1' for therapist
  const [userData, setUserData] = useState(userSchema);
  const [preferenceOrProfile, setPreferenceOrProfile] = useState('') // property for edit profile/preference pages
  const [isNewUser, setIsNewUser] = useState(false) // false
  const [firstSignOut, setFirstSignOut] = useState(false) // true

  const [therapistProfiles, setTherapistProfiles] = useState([])
  const [likedPagesData, setLikedPagesData] = useState([])
  const [prefAndProfileOptions, setPrefAndProfileOptions] = useState({})
  const [socket, setSocket] = useState({})
  const [socketInterval, setSocketInterval] = useState(null);
  const [headerPostLike, setHeaderPostLike] = useState(false);
  const [messagingAuthStatus, setMessagingAuthStatus] = useState("");

  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [products, setProducts] = useState([]);
  const [subscriptionMap, setSubscriptionMap] = useState({})

  // initialize puchases for user
  const initializePurchases = (userId) => {
    Purchases.setDebugLogsEnabled(true);
    let apiKey = "";
    switch (Platform.OS) {
      case "ios":
        apiKey = revenuecatConfig.apiKeyiOS;
        break;
      case "android":
        apiKey = revenuecatConfig.apiKeyAndroid;
        break;
    }
    Purchases.configure({
      apiKey,
      appUserID: userId
    });
  }

  const getPropForEditProfile = (userRole) => {
    if (userRole === '0') { // client
      setPreferenceOrProfile('preference')
    } else if (userRole === '1') { // therapist
      setPreferenceOrProfile('profile')
    }
  }

  const setViewForTherapist = () => {
    if (userData.accepted_tos) {
      setPreferenceOrProfile('profile');
      // reset to TabNavigator to prevent going back to login page
      RootNavigation.navigationRef.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      });
      return;
    }

    // reset to NewTherapistUserFlow to prevent going back to login page
    RootNavigation.navigationRef.reset({
      index: 0,
      routes: [{ name: 'NewTherapistUserFlow' }],
    });
  };

  const setViewForClient = () => {
    if (userData.accepted_tos) {
      setPreferenceOrProfile('preference')
      RootNavigation.navigationRef.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      });
      return;
    }

    RootNavigation.navigationRef.reset({
      index: 0,
      routes: [{ name: 'NewClientUserFlow' }],
    });
  };

  const setView = () => {
    // logic for displaying view
    const { user_role } = userData;
    setUserType(userData.user_role)
    switch (user_role) {
      case USER_ROLE.THERAPIST:
        setViewForTherapist();
        break;
      case USER_ROLE.CLIENT:
        setViewForClient();
        break;
      default:
        RootNavigation.navigate('SelectUserType');
    }
    setLoginLoading(false);
  };

  const isMessagingEnabled = (authStatus) => {
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  };

  const saveTokenInFirebase = async (userId, token) => {
    // Add the token to the users datastore
    try {
      const customAuthToken = await raClient.getFirebaseAuthToken();
      await auth().signInWithCustomToken(customAuthToken);
      await firestore()
        .collection("users")
        .doc(userId)
        .set({
          tokens: firestore.FieldValue.arrayUnion(token),
        });
    } catch (error) {
      console.log("saveTokenInFirebase.error", error);
    }
  };

  useEffect(() => {
    if (
      !isMessagingEnabled(messagingAuthStatus) ||
      !userData.id
    ) {
      return;
    }

    const getDeviceToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("deviceToken", token);
        saveTokenInFirebase(userData.id, token);
      } catch (error) {
        console.log("getAPNSToken.err", error)
      }
    }

    messaging().onTokenRefresh(token => {
      saveTokenInFirebase(userData.id, token);
    });

    getDeviceToken();
  }, [messagingAuthStatus, userData.id]);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        setMessagingAuthStatus(authStatus);
      } catch (error) {
        console.log("getFirebaseToken.error", "User has rejected permissions for push notification");
      }
    };

    const navigateToChatRoom = (remoteMessage) => {
      RootNavigation.replace('TabNavigator');
      RootNavigation.navigate('TabNavigator', {
        screen: 'MessagesTab',
        params: {
          screen: 'IndividualMessage',
          params: {
            chatRoom: remoteMessage?.data ? JSON.parse(remoteMessage.data.chat) : null,
            returnToMsgList: true
          }
        }
      });
    }

    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log('user sign in')
          setIsUserSignedIn(true);
          break;
        case "signOut":
          console.log('user sign out')
          setIsUserSignedIn(false);
          setUserData(userSchema)
          setUserType(null)
          break;
        case "tokenRefresh_failure":
          console.log('token refresh')
          break;
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigateToChatRoom(remoteMessage);
    });

    // called when message is received in foreground
    messaging().onMessage((message) => console.log("message received", message));

    // Check whether an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
        navigateToChatRoom(remoteMessage);
      }
    });

    checkNotificationPermission();

    const storage = new StorageHelper().getStorage();
    Auth.configure({
      storage
    });

    const calculateClockDrift = (iatAccessToken, iatIdToken) => {
      const now = Math.floor(new Date() / 1000);
      const iat = Math.min(iatAccessToken, iatIdToken);
      return now - iat;
    };

    const _getAmplifyAuthUser = (url) => {
      Auth._oAuthHandler.handleAuthResponse(url).then((resp) => {
        try {
          // create a CognitoAccessToken using the response accessToken
          const AccessToken = new
            AmazonCognitoIdentity.CognitoAccessToken({
              AccessToken: resp.accessToken,
            });

          // create a CognitoIdToken using the response idToken
          const IdToken = new AmazonCognitoIdentity.CognitoIdToken({
            IdToken: resp.idToken,
          });

          // create a RefreshToken using the response refreshToken
          const RefreshToken = new
            AmazonCognitoIdentity.CognitoRefreshToken({
              RefreshToken: resp.refreshToken,
            });

          // create a session object with all the tokens
          const sessionData = {
            IdToken: IdToken,
            AccessToken: AccessToken,
            RefreshToken: RefreshToken,
          };

          // create the CognitoUserSession using the sessionData
          const session = new AmazonCognitoIdentity.CognitoUserSession(
            sessionData
          );

          const { aws_user_pools_id, aws_user_pools_web_client_id } = awsExports;
          // create an object with the UserPoolId and ClientId
          var poolData = {
            UserPoolId: aws_user_pools_id,
            ClientId: aws_user_pools_web_client_id,
          };

          // pass the poolData object to CognitoUserPool
          var userPool = new AmazonCognitoIdentity.CognitoUserPool(
            poolData
          );

          // create an object containing the username and user pool.
          // You can get the username from CognitoAccessToken object
          // we created above.
          var userData = {
            Username: AccessToken.payload.username,
            Pool: userPool,
          };

          // create a cognito user using the userData object
          var cognitoUser = new AmazonCognitoIdentity.CognitoUser(
            userData
          );

          // set the cognito user session w/ the CognitoUserSession
          cognitoUser.setSignInUserSession(session);

          const storageKeyPrefix = 'CognitoIdentityServiceProvider.' + aws_user_pools_web_client_id;
          const authUserStoragePrefix = storageKeyPrefix + '.' + IdToken.payload['cognito:username'];

          // manually set storage
          storage.setItem(storageKeyPrefix + '.LastAuthUser', IdToken.payload['cognito:username']);
          storage.setItem(authUserStoragePrefix + '.idToken', resp.idToken);
          storage.setItem(authUserStoragePrefix + '.accessToken', resp.accessToken);
          storage.setItem(authUserStoragePrefix + '.refreshToken', resp.refreshToken);
          storage.setItem(authUserStoragePrefix + '.clockDrift', '' + calculateClockDrift(AccessToken.payload['iat'], IdToken.payload['iat']) + '');

          setIsUserSignedIn(true);
        } catch (error) {
          console.log("error", error);
        }
      });
    };

    const navigateToTherapistProfile = async (therapistId) => {
      if (!therapistId) {
        return;
      }

      const therapistProfile = await raClient.getUser(therapistId);
      RootNavigation.replace('TabNavigator');
      RootNavigation.navigate('TabNavigator', {
        screen: 'HomeTab',
        params: {
          screen: 'TherapistProfile',
          params: {
            data: therapistProfile
          }
        }
      });
    };

    branch.subscribe({
      onOpenStart: ({
        uri,
        cachedInitialEvent
      }) => {
        console.log(
          'subscribe onOpenStart, will open ' +
          uri +
          ' cachedInitialEvent is ' +
          cachedInitialEvent,
        );
      },
      onOpenComplete: ({
        error,
        params,
        uri
      }) => {
        if (error) {
          console.error(
            'subscribe onOpenComplete, Error from opening uri: ' +
            uri +
            ' error: ' +
            error,
          );
          return;
        } else if (params) {
          console.log("params", params);
          if (params["tid"]) {
            navigateToTherapistProfile(params["tid"]);
            return;
          }

          if (params["+rn_cached_initial_event"]) {
            return;
          }

          if (
            params["~referring_link"] &&
            params["code"] &&
            params["state"]
          ) {
            const url = params["~referring_link"];
            console.log("url", url);

            if (Platform.OS === "android") {
              _getAmplifyAuthUser(url);
            }
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!userData.id) {
      return;
    }

    const startSocket = async () => {
      console.log('starting socket...');
      // connect user id
      const token = (await Auth.currentSession())
        .getIdToken()
        .getJwtToken();

      const ws = new SocketClient({
        endpoint: websocketConfig.endpoints[0].endpoint,
        userId: userData.id,
        token
      });

      ws.onopen = (e) => {
        console.log("open connection", e);
        clearInterval(socketInterval);

        ws.onclose = (e) => {
          console.log("close connection", e);
          // const interval = setInterval(startSocket, SOCKET_POLL_TIMEOUT);
          // setSocketInterval(interval);
        };

        ws.onerror = (e) => {
          console.log("socket error", e);
          // const interval = setInterval(startSocket, SOCKET_POLL_TIMEOUT);
          // setSocketInterval(interval);
        };
      };

      setSocket(ws);
    }

    startSocket();
  }, [userData.id])

  useEffect(() => {
    const checkIfUserSignedIn = async () => {
      try {
        setLoginLoading(true);
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        if (attributes) {
          let res = await raClient.getUser(attributes.sub);
          console.log("if therapistList..................");
          const therapistList = await raClient.getUsersList();
          console.log("therapistList..................", therapistList, therapistList.length);
          if (!res.user_role && userType === USER_ROLE.CLIENT || userType === USER_ROLE.THERAPIST) {
            res = await raClient.updateUser({
              user_role: userType
            });

          }


          console.log('user returned from api', res)

          setUserData(res)
          setUserType(res.user_role)
          getPropForEditProfile(res.user_role)

          if (!isUserSignedIn) {
            setIsUserSignedIn(true)
          }
        }
      } catch (error) {
        console.log({
          evt: "thecouch.app.app.useEffect.currentAuthenticatedUser",
          message: error.message || `${error}`,
          stack: error.stack
        });
        setIsUserSignedIn(false);
        setLoginLoading(false)
      }
    }

    if (!userData.id && !userData.email) {
      checkIfUserSignedIn()
    }
  }, [isUserSignedIn])

  useEffect(() => {
    if (!userData.email) {
      RootNavigation.navigationRef.reset({
        index: 0,
        routes: [{ name: 'SelectUserType' }],
      });
      return;
    }

    const logInPurchases = async () => {
      if (!userData.id) {
        return;
      }

      if (userData.user_role === USER_ROLE.CLIENT) {
        return;
      }

      try {
        initializePurchases(userData.id);
        const customer = await Purchases.getCustomerInfo();

        console.log("customer", customer);
        const offerings = await Purchases.getOfferings();

        const subscriptionMap = {};
        const periodMap = {
          MONTHLY: "month",
          ANNUAL: "year"
        }

        if (offerings.current?.availablePackages?.length) {
          let packages = offerings.current.availablePackages
          packages.sort((a, b) => {
            return b?.product?.price - a?.product?.price
          });
          packages.map((p) => {
            const { identifier, title, priceString } = p?.product || {};
            const buttonText = `${priceString} per ${periodMap[p?.packageType]}`;

            p.btnTitle = `${title} Membership`;
            p.btnText = buttonText;

            subscriptionMap[identifier] = p;
            return p;
          });

          setSubscriptionMap(subscriptionMap);

          console.log("packages", packages);
          setProducts(packages)
        }

        Purchases.addCustomerInfoUpdateListener((info) => {
          setCurrentSubscription(info.activeSubscriptions[0]);
        });
        setCurrentSubscription(customer.activeSubscriptions[0]);
      } catch (error) {
        console.log("error", error);
      }
    };

    const initializeView = async () => {
      await logInPurchases();
      setView();
    }

    initializeView();
  }, [userData.id, userData.email])

  useEffect(() => {
    // Get form/preference/profile options
    const getOptions = async () => {
      let optionTypes = [
        {
          id: 'licenseType',
          contentfulId: '6faiP0iGsnCliKHCjhlzb',
          contentfulProp: 'licenseType',
          variableName: 'licenseOptions'
        },
        {
          id: 'licenseType',
          contentfulId: '38q2d5ncKNuqmyhhwwSEQq',
          contentfulProp: 'licenseType',
          variableName: 'supervisorLicenseOptions'
        },
        {
          id: 'language',
          contentfulId: '1lRQaGKL7illSZsAlpmVnl',
          contentfulProp: 'language',
          variableName: 'languageOptions'
        },
        {
          id: 'healthInsurance',
          contentfulId: '12NfaeOaqimGGXCbBUjIqy',
          contentfulProp: 'healthInsuranceTypes',
          variableName: 'insuranceOptions'
        },
        {
          id: 'modality',
          contentfulId: '1UNgSmSbcKt8TUQrxRAmGd',
          contentfulProp: 'modalities',
          variableName: 'modalityOptions'
        },
        {
          id: 'specialties',
          contentfulId: '5hvqNUVOuLNC8cuWbNSfQz',
          contentfulProp: 'specialties',
          variableName: 'specialtyOptions'
        },
        {
          id: 'usStates',
          contentfulId: 'OKGy1AfH5muwtqsYciwY3',
          contentfulProp: 'usStates',
          variableName: 'usStateOptions'
        }
      ]
      let optionsObj = { ...prefAndProfileOptions }

      optionTypes.forEach((option, index) => {
        cfClient.getEntry(option.contentfulId).then((entry) => {
          optionsObj[option.variableName] = entry.fields[option.contentfulProp]
          setPrefAndProfileOptions(optionsObj)
        }).catch((error => (console.log(error))))
      })
    }
    getOptions()
  }, [])

  return (
    <AppContext.Provider
      value={{
        screenWidth,
        screenHeight,
        loginLoading,
        setLoginLoading,
        userType,
        setUserType,
        userData,
        setUserData,
        preferenceOrProfile,
        isNewUser,
        setIsNewUser,
        firstSignOut,
        setFirstSignOut,
        prefAndProfileOptions,
        therapistProfiles,
        setTherapistProfiles,
        likedPagesData,
        setLikedPagesData,
        isUserSignedIn,
        setIsUserSignedIn,
        headerPostLike,
        setHeaderPostLike,
        raClient,
        socket,
        cfClient,
        currentSubscription,
        setCurrentSubscription,
        setProducts,
        products,
        subscriptionMap,
        setSubscriptionMap
      }}>
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: [headerStyles.container],
            headerShadowVisible: false,
            // headerBackImageSource: backArrowGrey,
            headerBackImage: () => (
              <Image
                source={backArrowGrey}
                style={{ width: 14, height: 15, marginLeft: 26 }}
              />
            ),
            headerBackTitle: ' ',
            headerTintColor: styles.colorGrey2.color,
          }}>
          <Stack.Screen
            name="SelectUserType"
            component={SelectUserType}
            options={{
              title: '',
              headerShown: false,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />

          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              title: '',
              headerShown: true,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: '',
              headerShown: true,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />

          <Stack.Screen
            name="NewClientUserFlow"
            component={NewClientUserFlow}
            options={{
              title: '',
              headerShown: true,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />

          <Stack.Screen
            name="NewTherapistUserFlow"
            component={NewTherapistUserFlow}
            options={{
              title: '',
              headerShown: true,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />

          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              title: '',
              headerShown: false,
              headerStyle: [headerStyles.container],
              headerBackTitle: ' ',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}