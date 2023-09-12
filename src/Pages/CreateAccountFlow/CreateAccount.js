import React, { useState, useRef } from 'react'
import styles from '../../Styles';
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button'
import { TextInput } from '../../Components/TextInput'
import { Loading } from '../../Components/Loading'

import { MainCouchLogo } from '../../Components/MainCouchLogo';
// import backArrowGrey from '../../Assets/Images/backArrow-grey.png'
import facebookIcon from '../../Assets/Images/facebookIcon.png'
import googleIcon from '../../Assets/Images/googleIcon.png'
import appleIcon from '../../Assets/Images/appleIcon.png'

import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

const CreateAccount = ({ route, navigation }, props) => {
    const { userType, loginLoading, setLoginLoading } = useAppContext();
    const [createAccountInfo, setCreateAccountInfo] = useState({
        email: '',
        password: '',
    })
    const [nextBtnLoading, setNextBtnLoading] = useState(false)
    const { isUserSignedIn, setIsUserSignedIn } = useAppContext()
    const [createAccountError, setCreateAccountError] = useState('')
    const [createAccountSuccess, setCreateAccountSuccess] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [verifyAccountError, setVerifyAccountError] = useState('')
    const [verifyAccountDisabled, setVerifyAccountDisabled] = useState(false)
    const counter = useRef(0)
    const scrollViewRef = useRef(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../Assets/Images/backArrow-grey.png')} style={{ width: 14, height: 15 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const scrollBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }

    const handleEmailChange = (newValue) => {
        setCreateAccountInfo({ ...createAccountInfo, email: newValue })
        setCreateAccountError('')
        setCreateAccountSuccess(false)
    }

    const handlePasswordChange = (newValue) => {
        setCreateAccountInfo({ ...createAccountInfo, password: newValue })
        setCreateAccountError('')
        setCreateAccountSuccess(false)
    }

    const handleVerificationCodeChange = (newValue) => {
        setVerificationCode(newValue)
        setVerifyAccountError('')
    }

    const verifyAccount = async () => {
        setNextBtnLoading(true)
        try {
            await Auth.confirmSignUp(createAccountInfo.email, verificationCode || 'v');
            setLoginLoading(true);
        } catch (error) {
            console.log({
                evt: "thecouch.app.createAccount.verifyAccount",
                message: `${error}`,
                stack: error.stack
            });

            if (error.message.includes('Current status is CONFIRMED')) {
                setIsUserSignedIn(isUserSignedIn ? parseInt(isUserSignedIn) + 1 : true);
            } else {
                setVerifyAccountError(error.message || '')
                setNextBtnLoading(false)
                setLoginLoading(false);
            }
        }
    }

    const resendVerificationCode = async () => {
        setVerificationCode('')
        let resendCodeInterval;
        try {
            if (counter.current <= 0) {
                await Auth.resendSignUp(createAccountInfo.email);
                setVerifyAccountError('')
                console.log('sent verification code to user email');
                counter.current = 3;
                setVerifyAccountDisabled(true);
                resendCodeInterval = setInterval(() => {
                    counter.current--;
                    if (counter.current <= 0) {
                        setVerifyAccountError('')
                        setVerifyAccountDisabled(false);
                        clearInterval(resendCodeInterval);
                    }
                }, 1000 * 60)
            } else {
                setVerifyAccountError('Please wait 3 minutes to send another verification code.')
            }
        } catch (error) {
            console.log({
                evt: "thecouch.app.createAccount.resendVerificationCode",
                message: `${error}`,
                stack: error.stack
            });
            clearInterval(resendCodeInterval)
            setVerifyAccountError(error.message || '')
        }
    }

    const handleFederatedSignUp = (idpName) => {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider[idpName] });
    };

    const signUp = async () => {
        setNextBtnLoading(true)
        try {
            const { email, password } = createAccountInfo;
            const { userConfirmed } = await Auth.signUp({
                email,
                username: email,
                password,
                attributes: {
                    email
                },
                autoSignIn: {
                    enabled: true
                }
            });
            // let userConfirmed;
            if (userConfirmed) {
                setIsUserSignedIn(isUserSignedIn ? parseInt(isUserSignedIn) + 1 : true);
                setLoginLoading(true);
            } else {
                setIsUserSignedIn(false)
                setCreateAccountSuccess(true)
            }
            setNextBtnLoading(false)
        } catch (error) {
            console.log({
                evt: 'thecouch.app.createAccount.signUp',
                message: `${error}`,
                stack: error.stack
            });

            setCreateAccountError(error.message || '')
            setNextBtnLoading(false)
        }
    }

    const renderConfirmUserView = () => {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ marginBottom: 30 }}>
                    <Text
                        text='Verify Account'
                        fontSize={28}
                        lineHeight={34}
                        fontFamily='primary'
                        fontWeight={700}
                        color={styles.colorGrey2}
                        textAlign='center'
                    />
                </View>
                <View>
                    <Text
                        text='Please enter the verification code sent to your email.'
                        fontSize={15}
                        lineHeight={18}
                        fontFamily='primary'
                        fontWeight={500}
                        color={styles.colorBlack0}
                        textAlign='left'
                    />
                </View>
                <View>
                    <TextInput
                        label='Verification Code'
                        value={verificationCode}
                        onChangeFunc={handleVerificationCodeChange}
                        placeholder='Enter verification code'
                        marginBottom={16}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text
                            text={verifyAccountError}
                            marginBottom={10}
                            fontFamily='primary'
                            fontWeight={300}
                            color={styles.colorRed1.color}
                            fontSize={15}
                            lineHeight={18}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {nextBtnLoading ?
                        <Loading />
                        :
                        <Button
                            onPress={verifyAccount}
                            text={'Next'}
                            width='95%'
                            backgroundColor={styles.backgroundColorOrange2}
                            color={styles.colorGrey2.color}
                            fontSize={19}
                            lineHeight={23}
                            fontFamily='primary'
                            fontWeight={700}
                            marginBottom={40}
                        />
                    }

                    <Button
                        onPress={resendVerificationCode}
                        disabled={counter.current > 0 || nextBtnLoading}
                        text={'Resend Code'}
                        // // width='100%'
                        // backgroundColor={verifyAccountDisabled ? styles.backgroundColorGrey1 : styles.backgroundColorOrange2}
                        // color={styles.colorGrey2.color}
                        // fontSize={19}
                        // lineHeight={27}
                        // fontFamily='primary'
                        // fontWeight={700}
                        color={counter.current > 0 || nextBtnLoading ? 'transparent' : styles.colorOrange3}
                        fontSize={19}
                        lineHeight={27}
                        fontFamily='primary'
                        fontWeight={700}
                        backgroundColor='transparent'
                        // paddingH={30}
                        // paddingTop={10}
                        marginBottom={35}
                    />
                </View>
            </View>
        );
    }

    const renderCreateAccountView = () => {
        return (
            <View>
                <View style={{ marginBottom: 30 }}>
                    <Text
                        text='Create Account'
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
                                text='Sign up with Facebook'
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
                                text='Sign up with Google'
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
                                text='Sign up with Apple'
                                fontSize={15}
                                lineHeight={23}
                                fontFamily='primary'
                                fontWeight={700}
                                color={styles.colorGrey2}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.flexRow, { marginBottom: 30 }]}>
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
                        value={createAccountInfo.email}
                        onFocus={scrollBottom}
                        onChangeFunc={handleEmailChange}
                        placeholder='Type here'
                        marginBottom={16}
                    />

                    <TextInput
                        secureTextEntry={true}
                        label='Password'
                        value={createAccountInfo.password}
                        onFocus={scrollBottom}
                        onChangeFunc={handlePasswordChange}
                        placeholder='Type here'
                        marginBottom={15}
                    />
                </View>

                <View>
                    <Text
                        text='Password must contain:'
                        fontSize={14}
                        lineHeight={15}
                        fontFamily='primary'
                        fontWeight={300}
                        color={styles.colorBlack0}
                        textStyle={{ paddingLeft: 19, paddingRight: 9 }}
                        marginBottom={5}
                    />
                    <Text
                        text={`At least 8 characters \nAt least 1 lowercase character \nAt least 1 uppercase character \nAt least 1 number or 1 special character`}
                        fontSize={14}
                        lineHeight={20}
                        fontFamily='primary'
                        fontWeight={300}
                        color={styles.colorBlack0}
                        textStyle={{ paddingLeft: 30, paddingRight: 9 }}
                        marginBottom={7}
                    />

                    <Text
                        text={createAccountError}
                        marginBottom={10}
                        fontFamily='primary'
                        fontWeight={300}
                        color={styles.colorRed1.color}
                        fontSize={15}
                        lineHeight={18}
                    >
                    </Text>
                </View>
                <View>
                    <Button
                        onPress={signUp}
                        text={nextBtnLoading ? 'setLoading' : 'Next'}
                        width='100%'
                        backgroundColor={styles.backgroundColorOrange2}
                        color={styles.colorGrey2.color}
                        fontSize={19}
                        lineHeight={23}
                        fontFamily='primary'
                        fontWeight={700}
                        textAlign='center'
                        marginBottom={35}
                    />

                    <Button
                        disabled
                        onPress={null}
                        text=''
                        fontSize={20}
                        lineHeight={30}
                        // fontFamily='primary'
                        fontWeight={500}
                        // color={styles.colorOrange2.color}
                        textStyle={{ textDecorationLine: 'underline' }}
                        width={'100%'}
                        backgroundColor={'transparent'}
                    />
                </View>
            </View>
        );
    }

    return (
        <PageScroll scrollRef={scrollViewRef}>
            <View style={
                !loginLoading
                    ? [styles.flexGrow1, styles.pagePadding, styles.justifySpaceBetween]
                    : [styles.flexGrow1, styles.pagePadding]
            }>
                <MainCouchLogo marginBottom={30} />
                {
                    loginLoading
                        ? <Loading />
                        : (
                            createAccountSuccess
                                ? renderConfirmUserView()
                                : renderCreateAccountView()
                        )
                }
            </View>
        </PageScroll>
    )
}

export default CreateAccount;