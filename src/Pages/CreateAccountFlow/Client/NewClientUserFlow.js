import React, { useRef, useState } from 'react';
import styles from '../../../Styles';
import { Auth } from 'aws-amplify'
// import AsyncStorage from '@react-native-async-storage/async-storage'; // *** For testing userData
import { useAppContext } from '../../../Lib/UserContext';

import { PageScroll } from '../../../Components/PageScroll';
import { MainCouchLogo } from '../../../Components/MainCouchLogo';
import { Text } from '../../../Components/Text';
import { Button } from '../../../Components/Button';
import { InfoModal } from '../../../Components/InfoModal';

import { View, TouchableOpacity, Image } from 'react-native';
// import { types } from '@babel/core';

import { Page1Info } from './Page1Info';
import { ContinueOrSkipFilters } from './ContinueOrSkipFilters';
import { Page2Meeting } from './Page2Meeting';
import { Page3Zipcode } from './Page3Zipcode';
import { Page4Insurance } from './Page4Insurance';
import { Page4Provider } from './Page4Provider';
// // import {Page4Payment} from './Page4Payment'; // ???
import { Page4OutOfPocket } from './page4OutOfPocket';
import { Page5TherapyType } from './Page5TherapyType';
import { Page6PreferredLanguage } from './Page6PreferredLanguage';
import { Page7Availability } from './Page7Availability';
import { Page7AvailabilityConfirm } from './Page7AvailabilityConfirm';
import { Page8Gender } from './Page8Gender';
import { Page9Lgbtqia } from './Page9Lgbtqia';
import { Page10RaceEthnicity } from './Page10RaceEthnicity';
import { Page11Modality } from './Page11Modality';
import { Page12Specialties } from './Page12Specialties';
import { Page13Photo } from './Page13Photo';

//TODO:
//1) send data to state (for API post)

//Repeat for Therapist

//TODO:
//Lambda function for get request for matching therapists, create pseudocode for prioritization for criteria, deal-breaker --> this has to have strict equivalance

const NewClientUserFlow = ({ route, navigation }, props) => {
  const { userType, setUserData, setIsNewUser, setFirstSignOut, raClient } = useAppContext()
  const scrollViewRef = useRef(null);

  const [currentPageNumber, setCurrentPageNumber] = useState(1); // 1
  const [nextPageNumber, setNextPageNumber] = useState(1); // 1
  const [skipModalHasBeenOpened, setSkipModalHasBeenOpened] = useState(false);
  const [skipModalOpen, setSkipModalOpen] = useState(false);

  // Header back button controls the form pages
  const prevBtnFunc = () => {
    // console.log('currentPageNumber ', currentPageNumber)
    if (currentPageNumber !== 1) {
      if (currentPageNumber % 1 !== 0) {
        // If current page is like 4.1, go back to page 4 instead of page 3
        let pageToTop = Math.floor(currentPageNumber);
        setCurrentPageNumber(pageToTop);
        setNextPageNumber(pageToTop);
      } else {
        // If current page is like 4, go back to page 3
        let pageToTop = currentPageNumber - 1;
        setCurrentPageNumber(pageToTop);
        setNextPageNumber(pageToTop);
      }
    } else {
      return;
      // navigation.navigate('CreateAccount')
    }
  };

  React.useLayoutEffect(() => {
    // The header back button controls the form!
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={prevBtnFunc}>
          <Image
            source={require('../../../Assets/Images/backArrow-grey.png')}
            style={{ width: 14, height: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentPageNumber]);

  // const [pageToShow, setPageToShow] = useState('questions'); // questions, auto filling, final review, success
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pageDone, setPageDone] = useState({
    // handles if the 'next' btn for current questions is active or not
    1: false, // required questions
    1.1: true, // Continue to filters page
    2: true, // nonRequired questions
    3: true,
    4: false, // required questions
    4.1: true,
    4.2: true,
    5: true,
    6: true,
    7: true,
    7.1: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
  });

  const [form, setForm] = useState({
    page1Info: {
      firstName: '',
      lastName: '',
      state: '',
      nameState: '', // for backend
      abbrState: '', // for backend
      agreeToTerms: false,
    },
    page2Meeting: {
      meetingPreference: undefined, // checkbox, select one
      meetingPrefIsDealBreaker: false, // toggle switch, yes or no
      searchMiles: 0,
      wheelChair: false,
    },
    page3Zipcode: {
      zipCode: undefined,
    },
    page4Insurance: {
      insurance: undefined, // if yes: show Page4Provider, else: page4OutOfPocket
    },
    page4Provider: { // page 4.1
      providers: [], // array of strings
      providerIsDealBreaker: false,
    },
    page4OutOfPocket: { // page 4.2
      outOfPocketRange: [0, 0], // backend?
      outOfPocketDealBreaker: false,
    },
    page5TherapyType: {
      therapyTypes: [], // array of strings
    },
    page6PreferredLanguage: {
      languages: [], // array of strings
      languageDealBreaker: false,
    },
    page7Availability: {
      availability: [], // array of objects
      sameTimeForEntireWeek: false,
      sameMonFriTime: false,
      alwaysAvailable: false,
      availabilityDealBreaker: false,
    },
    // page7AvailabilityConfirm: { // page 7.1 ?
    //   // This page is to confirm the times selected on previous page
    // },
    page8Gender: {
      gender: [], // array of strings
      genderDealBreaker: false,
    },
    page9Lgbtqia: {
      lgbtqia: undefined,
      lgbtqiaDealBreaker: false,
    },
    page10RaceEthnicity: {
      ethnicity: [], // array of strings
      ethnicityDealbreaker: false,
    },
    page11Modality: {
      // page 11.1 ?
      modality: [ // array of objects
        // {
        //   value: '', // string, required if other is specified
        //   description: null,
        // }
      ],
      modalityDealBreaker: false,
    },
    page12Specialties: {
      specialties: [], // array of strings
      specialtiesDealBreaker: false,
    },
    page13Photo: {
      profilePhoto: undefined,
    },
  });


  const updateAnswerOnPage = (page, stateName, statePath, newValue) => {
    let formState = { ...form };
    formState[page][stateName] = newValue;
    setForm(formState);
    // console.log('form: ', form);
  };

  const updatePageDone = (pageNum, bool) => {
    setPageDone({ ...pageDone, [pageNum]: bool });
  };

  // const backBtnFunc = () => {
  //   if (currentPageNumber !== 1) {
  //     setCurrentPageNumber(currentPageNumber - 1);
  //   }
  // };

  const scrollUp = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const nextBtnFunc = async () => {
    // console.log('pageDone[currentPageNumber]', pageDone[currentPageNumber])
    if (currentPageNumber === 13) {
      addNewClientForm();
      return;
    }

    if (!pageDone[currentPageNumber]) {
      return;
    }

    if (currentPageNumber === 1) {
      const {
        firstName,
        lastName,
        state,
        // accepted_tos
        agreeToTerms
      } = form["page1Info"]
      const user = await raClient.updateUser({
        accepted_tos: agreeToTerms ? 1 : 0,
        given_name: firstName,
        family_name: lastName,
        state: state,
        user_role: userType
      });

      setUserData(user)
    }

    console.log("nextPageNumber", nextPageNumber, currentPageNumber);

    if (nextPageNumber === currentPageNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
      setNextPageNumber(nextPageNumber + 1);
    } else {
      setCurrentPageNumber(nextPageNumber);
    }

    scrollUp();
  };

  const skipToNextFunc = () => {
    setSkipModalOpen(false);
    if (currentPageNumber !== 13) {
      let pageToTop = Math.floor(currentPageNumber + 1);
      setCurrentPageNumber(pageToTop);
      setNextPageNumber(pageToTop);
      if (!skipModalHasBeenOpened) {
        setSkipModalHasBeenOpened(true);
      }
      scrollUp();
    } else {
      addNewClientForm();
    }
  };

  const skipBtnFunc = () => {
    if (!skipModalHasBeenOpened) {
      setSkipModalOpen(true);
    } else {
      skipToNextFunc();
    }
  };

  const skipAllFilters = async () => {
    setSubmitLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      if (attributes) {
        let res = await raClient.getUser(attributes.sub);
        setUserData(res)
        setIsNewUser(true)
        setFirstSignOut(true)
        setSubmitLoading(false);
        navigation.replace('TabNavigator');
      }
    } catch (err) {
      console.log(err)
    }
    setSubmitLoading(false);
  }

  const addNewClientForm = async () => {
    setSubmitLoading(true);

    let preferenceSchema = { // this stays here
      meeting: form.page2Meeting.meetingPreference, // string("0" for In-person, "1" for virtual, "2" for both)
      distance: form.page2Meeting.searchMiles, // number, NOTE: Only for clients
      min_cost: form.page4OutOfPocket.outOfPocketRange[0] ? form.page4OutOfPocket.outOfPocketRange[0] : undefined,
      max_cost: form.page4OutOfPocket.outOfPocketRange[1] ? form.page4OutOfPocket.outOfPocketRange[1] : undefined,
      wheelchair: form.page2Meeting.wheelChair, // boolean
      lgbtqia: form.page9Lgbtqia.lgbtqia, // boolean
      gender: form.page8Gender.gender, // array
      specialty: form.page12Specialties.specialties,
      insurance: form.page4Provider.providers,
      modality: form.page11Modality.modality,
      language: form.page6PreferredLanguage.languages,
      therapy_type: form.page5TherapyType.therapyTypes,
      race: form.page10RaceEthnicity.ethnicity,
      availability: form.page7Availability.availability, // array of objects(minimum 1 if specified, null is allowed)
    }

    let userDataBody = { // Here for testing login functionality
      user_role: "0", // ("0" if client, "1" if therapist)
      state: form.page1Info.state, // string
      zip_code: form.page3Zipcode.zipCode, // number
      given_name: form.page1Info.firstName, // string
      family_name: form.page1Info.lastName, // string
      profile_photo_url: form.page13Photo.profilePhoto, // string
      // profile: preferenceSchema, // preference_schema
      preference: preferenceSchema,
      dealbreaker: {
        meeting: form.page2Meeting.meetingPrefIsDealBreaker, // boolean
        distance: false, // true??, boolean,
        cost: form.page4OutOfPocket.outOfPocketDealBreaker, // boolean,
        wheelchair: form.page2Meeting.meetingPrefIsDealBreaker === true && form.page2Meeting.wheelChair === true ? true : false, // true?? boolean,
        lgbtqia: form.page9Lgbtqia.lgbtqiaDealBreaker, // boolean,
        gender: form.page8Gender.genderDealBreaker, // boolean,
        specialty: form.page12Specialties.specialtiesDealBreaker, // boolean,
        insurance: form.page4Provider.providerIsDealBreaker, // boolean,
        modality: form.page11Modality.modalityDealBreaker, // boolean,
        language: form.page6PreferredLanguage.languageDealBreaker, // boolean,
        therapy_type: true, // true??, boolean,
        race: form.page10RaceEthnicity.ethnicityDealbreaker, // boolean,
        availability: form.page7Availability.availabilityDealBreaker, // boolean,
      }
    }

    try {
      let res = await raClient.updateUser(userDataBody)
      console.log(res)
      setUserData(res)
      setIsNewUser(true)
      setFirstSignOut(true)
      setSubmitLoading(false);
      navigation.replace('TabNavigator');
    } catch (err) {
      console.log(err)
      setSubmitLoading(false);
    }
  };

  return (
    <PageScroll scrollRef={scrollViewRef}>
      <View
        style={[styles.flex1, styles.pagePadding, styles.justifySpaceBetween]}>
        <View style={[styles.flexGrow1]}>
          <MainCouchLogo marginBottom={currentPageNumber !== 7 ? 30 : 10} />

          {currentPageNumber === 1 && (
            <Page1Info
              pageQuestions={{ ...form.page1Info }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 1.1 && (
            <ContinueOrSkipFilters
              setNextPageNumber={setNextPageNumber}
              nextBtnFunc={nextBtnFunc}
              skipAllFilters={skipAllFilters}
              submitLoading={submitLoading}
            />
          )}

          {currentPageNumber === 2 && (
            <Page2Meeting
              pageQuestions={{ ...form.page2Meeting }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
            />
          )}

          {currentPageNumber === 3 && (
            <Page3Zipcode
              pageQuestions={{ ...form.page3Zipcode }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
            />
          )}

          {currentPageNumber === 4 && (
            <Page4Insurance
              pageQuestions={{ ...form.page4Insurance }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 4.1 && (
            <Page4Provider
              pageQuestions={{ ...form.page4Provider }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 4.2 && (
            <Page4OutOfPocket
              pageQuestions={{ ...form.page4OutOfPocket }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 5 && (
            <Page5TherapyType
              pageQuestions={{ ...form.page5TherapyType }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
            />
          )}

          {currentPageNumber === 6 && (
            <Page6PreferredLanguage
              pageQuestions={{ ...form.page6PreferredLanguage }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
            />
          )}

          {currentPageNumber === 7 && (
            <Page7Availability
              pageQuestions={{ ...form.page7Availability }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 7.1 && (
            <Page7AvailabilityConfirm
              availabilityArray={[...form.page7Availability.availability]}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 8 && (
            <Page8Gender
              pageQuestions={{ ...form.page8Gender }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 9 && (
            <Page9Lgbtqia
              pageQuestions={{ ...form.page9Lgbtqia }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 10 && (
            <Page10RaceEthnicity
              pageQuestions={{ ...form.page10RaceEthnicity }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 11 && (
            <Page11Modality
              pageQuestions={{ ...form.page11Modality }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 12 && (
            <Page12Specialties
              pageQuestions={{ ...form.page12Specialties }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 13 && (
            <Page13Photo
              pageQuestions={{ ...form.page13Photo }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}
        </View>

        {/* {Object.values(pageDone).every(Boolean) ? */}

        {currentPageNumber !== 1.1 && (
          <View style={[styles.paddingH10]}>
            <View style={{ marginBottom: 25 }} />
            <Button
              onPress={nextBtnFunc}
              text={submitLoading ? 'setLoading' : "Next"}
              color={styles.colorGrey2}
              fontSize={19}
              lineHeight={23}
              fontFamily='primary'
              fontWeight={700}
              width={'100%'}
              backgroundColor={styles.backgroundColorOrange2}
              marginBottom={35}
            />

            <View
              style={{
                opacity:
                  currentPageNumber === 1 || currentPageNumber === 7.1 ? 0 : 1,
              }}>
              <Button
                disabled={currentPageNumber === 1 || currentPageNumber === 7.1}
                onPress={skipBtnFunc}
                text="Skip >"
                fontSize={20}
                lineHeight={30}
                fontFamily='primary'
                fontWeight={500}
                color={styles.colorOrange2.color}
                textStyle={{ textDecorationLine: 'underline' }}
                width={'100%'}
                backgroundColor={'transparent'}
              />
            </View>
          </View>
        )}

        <InfoModal
          // openModalFunc={() => setInfoModalVisible(true)}
          closeModalFunc={() => setSkipModalOpen(false)}
          onRequestClose={() => setSkipModalOpen(false)}
          visible={skipModalOpen}
          modalText="If you skip a step, you can always go back into your settings and adjust your filters."
          btnText="Skip"
          btnFunc={skipToNextFunc}
        />
      </View>
    </PageScroll>
  );
};

export default NewClientUserFlow;
