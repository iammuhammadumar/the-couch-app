import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Lib/UserContext';
import styles from '../../Styles'

import LinearGradient from 'react-native-linear-gradient'

import { TabsOnboardingModalTextComp } from './TabsOnboardingModalTextComp'
import { Button } from '../../Components/Button'
import { Text } from '../../Components/Text'

import rejectIcon from '../../Assets/Images/rejectIcon.png'
import acceptIcon from '../../Assets/Images/acceptIcon.png'
import downLeftArrow from '../../Assets/Images/downLeftArrow-white.png'
import downRightArrow from '../../Assets/Images/downRightArrow-white.png'

import bottomNavBarNotActiveImg from '../../Assets/Images/bottomNavBar-notActiveImg.png'
import bottomNavBarProfileActiveImg from '../../Assets/Images/bottomNavBar-profileActiveImg.png'
import bottomNavBarHomeActiveImg from '../../Assets/Images/bottomNavBar-homeActiveImg.png'
import bottomNavBarInfoActiveImg from '../../Assets/Images/bottomNavBar-infoActiveImg.png'
import bottomNavBarMessageActiveImg from '../../Assets/Images/bottomNavBar-messageActiveImg.png'

import swipeLeftGestureIcon from '../../Assets/Images/swipeLeftGestureIcon.png'
import swipeRightGestureIcon from '../../Assets/Images/swipeRightGestureIcon.png'


import {
    Dimensions,
    Modal,
    View,
    ScrollView,
    Image,
    Platform,
} from 'react-native'


export const TabsOnboardingModal = (props) => {
    const { userType, setIsNewUser } = useAppContext()
    const screenHeight = Dimensions.get('window').height
    const [page, setPage] = useState(1)
    const [showsMenu, setShowsMenu] = useState(false)
    const [menuToShow, setMenuToShow] = useState(bottomNavBarNotActiveImg)


    useEffect(() => {
        if (page === 5) {
            setMenuToShow(bottomNavBarProfileActiveImg)
        } else if (page === 6) {
            setMenuToShow(bottomNavBarHomeActiveImg)
        } else if (page === 7) {
            setMenuToShow(bottomNavBarInfoActiveImg)
        } else if (page === 8 || page === 9) {
            setMenuToShow(bottomNavBarMessageActiveImg)
        } else if (page === 11) {
            setMenuToShow(bottomNavBarHomeActiveImg)
        }
    }, [page])

    const nextBtnFunc = () => {
        // Next functionality
        if (page + 1 <= 11) {
            setPage(page + 1)
        } else {
            setIsNewUser(false)
            props.closeModalFunc(true)
        }

        // Show bottom navbar image
        if (page + 1 >= 4) {
            setShowsMenu(true)
        }
    }


    const backBtnFunc = () => {
        // Back functinality
        if (page - 1 >= 1) {
            setPage(page - 1)
        }

        // Hide bottom navbar image
        if (page - 1 <= 3) {
            setShowsMenu(false)
        }
    }


    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType='fade'
        >
            <LinearGradient colors={page === 11 ? ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.95)'] : ['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']} style={[styles.width100, styles.flex1, styles.headerBackTopPadding]} >
                {/* <View style={[styles.width100, styles.flex1, styles.headerBackTopPadding, { backgroundColor: page !== 10 ? 'rgba(0, 0, 0, 0.8)' : 'transparent' }]}> */}

                <ScrollView contentContainerStyle={[styles.flexGrow1]}>
                    <View style={[styles.flexGrow1]}>
                        <View style={[styles.flexGrow1]}>

                            <Button
                                disabled={page === 1 || page === 11}
                                text='Back'
                                onPress={backBtnFunc} // Controls the inner pages not the modal!
                                fontSize={18}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={300}
                                color={page === 1 || page === 11 ? 'transparent' : '#fff'}
                                backgroundColor='rgba(0,0,0,0)'
                                // marginBottom={63}
                                btnStyle={{ alignSelf: 'flex-start' }}
                            />

                            <View style={[styles.width100, styles.flexGrow1, page !== 11 && styles.modalPadding, styles.flexCenterCenter, { paddingBottom: 10 }]}>

                                {page === 1 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='Welcome to your home screen!'
                                            text2={userType === '0' ?
                                                'These are therapists that fit the criteria you entered when logging in. Go to settings to change your filters at any time!' :
                                                'These are therapists in your area that you can network with. You can read their profile and learn about them and their specialties. Your profile is also displayed to other therapists. Hit next for an intro to the app, or hit skip to get started on your own.'
                                            }
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 2 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='This is your next button.'
                                            text2={userType === '0' ?
                                                'If a therapist doesn’t seem like a good fit, hit this button to see the next therapist. Don’t worry about making a mistake. If you run out of potential matches, this therapist may come up again. '
                                                :
                                                'If a therapist doesn’t seem like a good connection, hit this button to see the next therapist. Don’t worry about making a mistake. This therapist may come up again as you swipe. You can also search for specific names, modalities, and specialties in the search bar.'
                                            }
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 3 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='This is your accept button.'
                                            text2={userType === '0' ?
                                                'If the therapist is a good fit, hit this button to message or add them to your message list.'
                                                :
                                                'If the therapist is someone you want to connect with, hit this button to message or add them to your message list. '
                                            }
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 4 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='This is your menu.'
                                            text2='All these buttons help you get around the app. We have so many features that we’re excited to show you!'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 5 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='The first button is your profile.'
                                            text2='Click here to change your photo. You can also adjust your filters to connect with different therapists.'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 6 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='The second button is your home page.'
                                            text2='Click here to view different therapists’ profiles.'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 7 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='The third button is the info page.'
                                            text2={userType === '0' ?
                                                'Click here to view all kinds of information about different modalities. This information will help you find a better fit.'
                                                :
                                                'Click here to view all kinds of information about different topics. Some articles are geared to you and your practice, while others are for clients. Save articles you like or share helpful ones with your clients.'
                                            }
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 8 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='The last button is the message list.'
                                            text2='Click here to view all of the therapists you have liked. If you began a chat with a therapist, you check out their response here.'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 9 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='At the top is your search and favorite buttons'
                                            text2='You can use the search to look up specific therapists or topics like anxiety. If you search a topic you will find therapists that specialize in it as well as articles about it. If you find something you like you can favorite it and find it later in your favorites page.'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 10 &&
                                    <>
                                        <TabsOnboardingModalTextComp
                                            currentPage={page}
                                            text1='That’s it for now!'
                                            text2='Click next and start swiping!'
                                            btnText='Next'
                                            onPress={nextBtnFunc}
                                        />
                                    </>
                                }

                                {page === 11 &&
                                    <>
                                        <View style={[styles.width100, styles.flexGrow1, styles.alignCenter, styles.justifyEnd]}>
                                            <Button
                                                text='Got it!'
                                                onPress={() => { setIsNewUser(false), props.closeModalFunc(true) }}
                                                fontSize={21}
                                                lineHeight={25}
                                                fontFamily='primary'
                                                fontWeight={700}
                                                width='44%'
                                                // color='#fff'
                                                backgroundColor='#FDD6A2'
                                            />
                                        </View>

                                        <View style={[styles.flexGrow1, styles.width100, styles.paddingH10, styles.flexRowAlignCenter, styles.justifySpaceBetween]}>
                                            <View style={[styles.alignCenter, { width: '49.75%' }]}>
                                                <Image source={swipeLeftGestureIcon} style={{ width: 69, height: 94, marginBottom: 40 }} />

                                                <Text
                                                    text='Not feeling it?'
                                                    fontSize={17}
                                                    lineHeight={35}
                                                    fontFamily='primary'
                                                    fontWeight={700}
                                                    color='#fff'
                                                    textAlign='center'
                                                />
                                                <Text
                                                    text='Swipe left to pass.'
                                                    fontSize={13}
                                                    lineHeight={25}
                                                    fontFamily='primary'
                                                    fontWeight={400}
                                                    color='#fff'
                                                    textAlign='center'
                                                />

                                            </View>

                                            <View style={{ width: 1, height: 144, backgroundColor: '#fff', position: 'absolute', left: '53%', bottom: '20%' }} />

                                            <View style={[styles.alignCenter, { width: '49.75%' }]}>
                                                <Image source={swipeRightGestureIcon} style={{ width: 69, height: 94, marginBottom: 40 }} />

                                                <Text
                                                    text='Like what you see?'
                                                    fontSize={17}
                                                    lineHeight={35}
                                                    fontFamily='primary'
                                                    fontWeight={700}
                                                    color='#fff'
                                                    textAlign='center'
                                                />
                                                <Text
                                                    text='Swipe right to chat.'
                                                    fontSize={13}
                                                    lineHeight={25}
                                                    fontFamily='primary'
                                                    fontWeight={400}
                                                    color='#fff'
                                                    textAlign='center'
                                                />
                                            </View>
                                        </View>
                                    </>
                                }
                            </View>
                        </View>
                        <View>
                            {page !== 11 &&
                                <View style={[styles.width100, styles.justifyEnd, { height: 135, paddingBottom: 15 }]}>
                                    {page === 2 &&
                                        <Image source={rejectIcon} style={{ width: 54, height: 55, alignSelf: 'flex-start', marginLeft: '15%' }} />
                                    }
                                    {page === 3 &&
                                        <Image source={acceptIcon} style={{ width: 54, height: 55, alignSelf: 'flex-end', marginRight: '15%' }} />
                                    }
                                    {page === 5 &&
                                        <Image source={downLeftArrow} style={{ width: 54.5, height: 123, alignSelf: 'flex-start', left: '14%' }} />
                                    }
                                    {page === 6 &&
                                        <Image source={downLeftArrow} style={{ width: 54.5, height: 123, position: 'absolute', bottom: 16, left: '36%' }} />
                                    }
                                    {page === 7 &&
                                        <Image source={downRightArrow} style={{ width: 59.5, height: 118, position: 'absolute', bottom: 16, right: '41%' }} />
                                    }
                                    {page === 8 &&
                                        <Image source={downRightArrow} style={{ width: 59.5, height: 118, position: 'absolute', bottom: 16, right: '22%' }} />
                                    }
                                </View>
                            }

                            <View style={[styles.width100, styles.alignCenter, showsMenu && styles.backgroundColorWhite, { height: Platform.OS === 'ios' ? 65 : 55 }]}>
                                {showsMenu &&
                                    <Image source={menuToShow} style={{ width: Platform.OS === 'ios' ? '100%' : '75%', height: Platform.OS === 'ios' ? 56 : 46 }} />
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* </View> */}
            </LinearGradient>
        </Modal>
    )
}