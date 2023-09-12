import React from 'react';
import styles from '../../Styles';
import { useAppContext } from '../../Lib/UserContext';

import { PageScroll } from '../../Components/PageScroll'
import { Text } from '../../Components/Text'
import { Button } from '../../Components/Button'
import { Loading } from '../../Components/Loading'

import {
    Dimensions,
    View,
} from 'react-native';

import { MainCouchLogo } from '../../Components/MainCouchLogo';


const SelectUserType = ({ route, navigation }) => {
    const { loginLoading, setUserType, isUserSignedIn } = useAppContext();
    const screenHeight = Dimensions.get('screen').height

    return (
        <PageScroll>
            <View style={[styles.flexCenterCenter, { paddingTop: '4%' }]}>
                <View style={[styles.width100, styles.paddingH36, styles.alignCenter]}>
                    <MainCouchLogo full selectUserScreen />
                </View>
                {loginLoading
                    ? <Loading />
                    : <>
                        <Text
                            text={`Welcome! ${'\n'} Let's get started.`}
                            fontSize={34}
                            lineHeight={54}
                            fontFamily='primary'
                            fontWeight={700}
                            color={styles.colorGrey2}
                            textAlign='center'
                            marginBottom={screenHeight * 0.10}
                        />
                        <Text
                            text="Tell us why you're here."
                            fontSize={27}
                            lineHeight={54}
                            fontFamily='primary'
                            fontWeight={700}
                            color={styles.colorGrey2}
                            textAlign='center'
                            marginBottom={screenHeight * 0.03}
                        />

                        <View style={[styles.width100, styles.paddingH36]}>
                            <Button
                                text="I am looking for a therapist."
                                onPress={() => {
                                    setUserType('0'),
                                        navigation.navigate('CreateAccount')
                                }}
                                color={styles.colorGrey2}
                                fontSize={19}
                                lineHeight={23}
                                fontFamily='primary'
                                fontWeight={700}
                                width={'100%'}
                                backgroundColor={styles.backgroundColorOrange2}
                                marginBottom={screenHeight * 0.10}
                            />
                            <Button
                                text="I am a therapist."
                                onPress={() => {
                                    setUserType('1'),
                                        navigation.navigate('CreateAccount')
                                }}
                                color={styles.colorGrey2}
                                fontSize={19}
                                lineHeight={23}
                                fontFamily='primary'
                                fontWeight={700}
                                width={'100%'}
                                backgroundColor={styles.backgroundColorOrange2}
                                marginBottom={screenHeight * 0.07}
                            />
                            <Text text={isUserSignedIn} />
                            {
                                !isUserSignedIn ?
                                    <Button
                                        text={loginLoading ? 'setLoading' : 'I already have an account'}
                                        onPress={() => navigation.navigate('Login')}
                                        color={styles.colorOrange2}
                                        fontSize={19}
                                        lineHeight={23}
                                        fontFamily='primary'
                                        fontWeight={700}
                                        textStyle={{ textDecorationLine: 'underline' }}
                                        backgroundColor='transparent'
                                    /> :
                                    null
                            }
                        </View>
                    </>
                }
            </View>
        </PageScroll>
    );
};

export default SelectUserType;