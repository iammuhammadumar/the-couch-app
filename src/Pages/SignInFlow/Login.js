import React, { useState } from 'react';
import styles from '../../Styles'
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'; // *** For testing userData
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { MainCouchLogo } from '../../Components/MainCouchLogo';
import { Text } from '../../Components/Text';
import { TextInput } from '../../Components/TextInput'
import { Button } from '../../Components/Button'


import facebookIcon from '../../Assets/Images/facebookIcon.png'
import googleIcon from '../../Assets/Images/googleIcon.png'
import appleIcon from '../../Assets/Images/appleIcon.png'

import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'


const Login = ({ route, navigation }, props) => {
  const { loginLoading, setLoginLoading } = useAppContext();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Images/backArrow-grey.png')} style={{ width: 14, height: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleFederatedSignUp = async (idpName) => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider[idpName] });
  };

  const signIn = async () => {
    setLoginLoading(true)
    try {
      await Auth.signIn(loginInfo.email, loginInfo.password);
    } catch (error) {
      setLoginLoading(false)
      console.log(JSON.stringify({
        evt: "thecouch.app.signIn",
        message: error.message,
        stack: error.stack
      }));
      alert(error.message)
    }
  };

  return (
    <PageScroll>
      <View style={[styles.flexGrow1, styles.paddingH36, styles.justifySpaceBetween]}>
        <MainCouchLogo marginBottom={30} />

        <View>
          <Text
            text='Log in'
            fontSize={28}
            lineHeight={34}
            fontFamily='primary'
            fontWeight={700}
            color={styles.colorGrey2}
            textAlign='center'
            marginBottom={19}
          />

          {/* <TouchableOpacity
            onPress={() => handleFederatedSignUp('Facebook')}
            style={[styles.textInput, styles.flexRowAlignCenter, { marginBottom: 8 }]}
          >
            <Image source={facebookIcon} style={{ width: 24, height: 25 }} />
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text
                text='Sign in with Facebook'
                fontSize={15}
                lineHeight={23}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
              />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => handleFederatedSignUp('Google')}
            style={[styles.textInput, styles.flexRowAlignCenter, { marginBottom: 8 }]}
          >
            <Image source={googleIcon} style={{ width: 29, height: 30 }} />
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text
                text='Sign in with Google'
                fontSize={15}
                lineHeight={23}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFederatedSignUp('Apple')}
            style={[styles.textInput, styles.flexRowAlignCenter]}
          >
            <Image source={appleIcon} style={{ width: 29, height: 30 }} />
            <View style={[styles.flex1, styles.alignCenter]}>
              <Text
                text='Sign in with Apple'
                fontSize={15}
                lineHeight={23}
                fontFamily='primary'
                fontWeight={700}
                color={styles.colorGrey2}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.flexRow]}>
          <View style={[styles.flex1, styles.borderBottomBlack4, { height: '50%' }]} />
          <Text
            text='Or use email'
            fontSize={15}
            lineHeight={18}
            fontFamily='primary'
            fontWeight={300}
            color={styles.colorBlack0}
            textAlign='center'
            textStyle={{ marginHorizontal: 10 }}
          />
          <View style={[styles.flex1, styles.borderBottomBlack4, { height: '50%' }]} />
        </View>

        <View>
          <TextInput
            label='Email'
            value={loginInfo.email}
            onChangeFunc={newValue => setLoginInfo({ ...loginInfo, email: newValue })}
            placeholder='Type here'
            marginBottom={16}
          />

          <TextInput
            secureTextEntry={true}
            label='Password'
            value={loginInfo.password}
            onChangeFunc={newValue => setLoginInfo({ ...loginInfo, password: newValue })}
            placeholder='Type here'
          // marginBottom={16}
          />
        </View>

        <View>
          <Button
            text={loginLoading ? 'setLoading' : 'Log in'}
            onPress={signIn}
            color={styles.colorGrey2}
            fontSize={19}
            lineHeight={23}
            fontFamily='primary'
            fontWeight={700}
            width={'100%'}
            backgroundColor={styles.backgroundColorOrange2}
            marginBottom={20}
            btnStyle={{ paddingTop: 17, paddingBottom: 16 }}
          />
        </View>
      </View>
    </PageScroll>
  );
};

export default Login;