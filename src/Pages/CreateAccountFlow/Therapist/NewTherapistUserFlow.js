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
import { Page1Supervisor } from './Page1Supervisor';
import { UnlockFeature } from './UnlockFeature';
import { ContinueOrSkipFilters } from './ContinueOrSkipFilters';
import { Page2Office } from './Page2Office';
import { Page3Insurance } from './Page3Insurance';
import { Page3Insurers } from './Page3Insurers';
import { Page3HourlyRate } from './Page3HourlyRate';
import { Page4TherapyType } from './Page4TherapyType';
import { Page5Languages } from './Page5Languages';
import { Page6Availability } from './Page6Availability';
import { Page6AvailabilityConfirm } from './Page6AvailabilityConfirm';
import { Page7Gender } from './Page7Gender';
import { Page8Lgbtqia } from './Page8Lgbtqia';
import { Page9RaceEthnicity } from './Page9RaceEthnicity';
import { Page10Modality } from './Page10Modality';
import { Page11Specialties } from './Page11Specialties';
import { Page12Profiles } from './Page12Profiles'
import { Page13AutoReply } from './Page13AutoReply';
import { Page14Education } from './Page14Education'
import { Page15Photo } from './Page15Photo';
import { Page16Couch } from './Page16Couch'

//TODO:
//1) send data to state (for API post)

//Repeat for Therapist

//TODO:
//Lambda function for get request for matching therapists, create pseudocode for prioritization for criteria, deal-breaker --> this has to have strict equivalance

const NewTherapistUserFlow = ({ route, navigation }, props) => {
  const { currentSubscription, setUserData, setIsNewUser, setFirstSignOut, raClient, userType } = useAppContext()
  const scrollViewRef = useRef(null);

  const [currentPageNumber, setCurrentPageNumber] = useState(1); // 1
  const [nextPageNumber, setNextPageNumber] = useState(1); // 1
  const [submitLoading, setSubmitLoading] = useState(false);
  const [skipModalHasBeenOpened, setSkipModalHasBeenOpened] = useState(false);
  const [skipModalOpen, setSkipModalOpen] = useState(false);

  // Header back button controls the form pages
  const prevBtnFunc = () => {
    console.log('currentPageNumber ', currentPageNumber)
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

  const [pageDone, setPageDone] = useState({
    // handles if the 'next' btn for current questions is active or not
    1: false, // required questions
    1.1: true, // supervisor info required if license type === an associate license
    1.2: true, // unlock features
    1.3: true, // Continue to filters page
    2: true, // nonRequired questions
    3: true,
    3.1: true,
    3.2: true,
    4: true,
    5: true,
    6: true,
    6.1: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    14: true,
    15: true,
    16: true,
  });

  const [form, setForm] = useState({
    page1Info: {
      firstName: '',
      lastName: '',
      licenseType: '', // array with one string for the backend?
      state: '', // array with one string for the backend?
      nameState: '', // for backend ??
      abbrState: '', // for backend ??
      licenseNumber: '',
      agreeToTerms: false,
    },
    page1Supervisor: {
      firstName: '',
      lastName: '',
      licenseType: '',
      state: '',
      licenseNumber: '',
    },
    page2Office: {
      zipCode: undefined,
      meetingPreference: undefined,
      wheelChair: false,
    },
    page3Insurance: {
      insurance: undefined,
    },
    page3Insurers: {
      insurers: [], // array of strings
    },
    page3HourlyRate: {
      hourlyRateRange: [0, 0], // two sepearte property values on the backend
    },
    page4TherapyType: {
      therapyTypes: [], // array of strings
    },
    page5Languages: {
      languages: [], // array of strings
    },
    page6Availability: {
      availability: [], // array of objects
      sameTimeForEntireWeek: false,
      sameMonFriTime: false,
      alwaysAvailable: false,
    },
    page7Gender: {
      gender: [] // array of strings
    },
    page8Lgbtqia: {
      lgbtqia: undefined,
    },
    page9RaceEthnicity: {
      ethnicity: [], // array of strings
    },
    page10Modality: {
      modality: [ // array of objects
        // {
        //   value: '', // string, required if other is specified
        //   description: null,
        // }
      ],
    },
    page11Specialties: {
      specialties: [], // array of strings
    },
    page12Profiles: { // Push to an array before sent to backend?
      website: undefined,
      instagram: undefined,
      facebook: undefined,
      otherWebsites: [],
    },
    page13AutoReply: {
      autoResponse: undefined,
    },
    page14Education: {
      education: [], // (max 3)
      bio: undefined,
    },
    page15Photo: {
      profilePhoto: undefined,
    },
    page16Couch: {
      couchPhoto: undefined,
    }
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
    if (currentPageNumber === 16) {
      addNewTherapistForm();
      return;
    }

    if (!pageDone[currentPageNumber]) {
      return;
    }

    if (currentPageNumber === 1) {
      setSubmitLoading(true)
      const {
        firstName,
        lastName,
        state,
        licenseType,
        licenseNumber,
        // accepted_tos
        agreeToTerms,
      } = form["page1Info"]

      const payload = {
        accepted_tos: agreeToTerms ? 1 : 0,
        given_name: firstName,
        family_name: lastName,
        license_type: licenseType,
        license_number: licenseNumber,
        state: state,
        user_role: userType
      };

      if (form.page1Supervisor?.licenseNumber) {
        payload.supervisor = {
          given_name: form.page1Supervisor.firstName,
          last_name: form.page1Supervisor.lastName,
          license_type: form.page1Supervisor.licenseType,
          state: form.page1Supervisor.state,
          license_number: form.page1Supervisor.licenseNumber
        }
      }
      const user = await raClient.updateUser(payload);

      setUserData(user)
      setSubmitLoading(false)
    }

    if (nextPageNumber === currentPageNumber) {
      setCurrentPageNumber(currentPageNumber + 1);
      setNextPageNumber(nextPageNumber + 1);
    } else if (nextPageNumber === 1.2 && currentSubscription) {
      setCurrentPageNumber(1.3);
      setNextPageNumber(1.3);
    } else {
      setCurrentPageNumber(nextPageNumber);
    }
    scrollUp();
  };

  const skipToNextFunc = () => {
    setSkipModalOpen(false);
    if (currentPageNumber !== 16) {
      let pageToTop = Math.floor(currentPageNumber + 1);
      setCurrentPageNumber(pageToTop);
      setNextPageNumber(pageToTop);
      if (!skipModalHasBeenOpened) {
        setSkipModalHasBeenOpened(true);
      }
      scrollUp();
    } else {
      addNewTherapistForm();
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

  const addNewTherapistForm = async () => {
    setSubmitLoading(true);

    let profileSchema = {
      meeting: form.page2Office.meetingPreference, // string("0" for In-person, "1" for virtual, "2" for both)
      // distance: null, // number, NOTE: Only for clients
      min_cost: form.page3HourlyRate.hourlyRateRange[0] > 0 ? form.page3HourlyRate.hourlyRateRange[0] : undefined,
      max_cost: form.page3HourlyRate.hourlyRateRange[1] > 0 ? form.page3HourlyRate.hourlyRateRange[1] : undefined,
      wheelchair: form.page2Office.wheelChair, // boolean
      lgbtqia: form.page8Lgbtqia.lgbtqia, // boolean
      gender: form.page7Gender.gender, // array
      specialty: form.page11Specialties.specialties,
      insurance: form.page3Insurers.insurers,
      modality: form.page10Modality.modality,
      language: form.page5Languages.languages,
      therapy_type: form.page4TherapyType.therapyTypes,
      race: form.page9RaceEthnicity.ethnicity,
    };

    let preferenceSchema = { // this stays here
      availability: form.page6Availability.availability, // array of objects(minimum 1 if specified, null is allowed)
    }

    let userDataBody = { // Here for testing login functionality
      user_role: "1", // ("0" if client, "1" if therapist)
      state: form.page1Info.state, // string
      zip_code: form.page2Office.zipCode, // number
      license_type: form.page1Info.licenseType, // string
      license_number: form.page1Info.licenseNumber, // string
      given_name: form.page1Info.firstName, // string
      family_name: form.page1Info.lastName, // string
      profile_photo_url: form.page15Photo.profilePhoto, // string
      couch_photo_url: form.page16Couch.couchPhoto, // string
      website_url: form.page12Profiles.website, // string
      instagram_url: form.page12Profiles.instagram, // string
      facebook_url: form.page12Profiles.facebook, // string
      auto_reply: form.page13AutoReply.autoResponse, // string
      biography: form.page14Education.bio, // string
      education: form.page14Education.education, // array of unique strings(max 3)
      relevant_links: form.page12Profiles.otherWebsites, // array of unique objects // DK TODO: MAKE JUST ARRAY OF STRINGS
      profile: profileSchema, // preference_schema
      preference: preferenceSchema,
      dealbreaker: {
        meeting: false, // boolean
        distance: false, // boolean,
        cost: false, // boolean,
        wheelchair: false, // boolean,
        lgbtqia: false, // boolean,
        gender: false, // boolean,
        specialty: false, // boolean,
        insurance: false, // boolean,
        modality: false, // boolean,
        language: false, // boolean,
        therapy_type: false, // boolean,
        race: false, // boolean,
        availability: false, // boolean,
      },
      is_therapist_verified: false
    }

    if (form.page1Supervisor?.licenseNumber) {
      userDataBody.supervisor = {
        given_name: form.page1Supervisor.firstName,
        last_name: form.page1Supervisor.lastName,
        license_type: form.page1Supervisor.licenseType,
        state: form.page1Supervisor.state,
        license_number: form.page1Supervisor.licenseNumber
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
          <MainCouchLogo marginBottom={currentPageNumber !== 7 && currentPageNumber !== 1.1 ? 30 : 10} />

          {currentPageNumber === 1 && (
            <Page1Info
              pageQuestions={{ ...form.page1Info }}
              updateAnswerOnPage={updateAnswerOnPage}
              addSupervisorInfo={() => setCurrentPageNumber(1.1)}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {
            currentPageNumber === 1.1 && (
              <Page1Supervisor
                pageQuestions={{ ...form.page1Supervisor }}
                updateAnswerOnPage={updateAnswerOnPage}
                pageDone={{ ...pageDone }}
                updatePageDone={updatePageDone}
                setNextPageNumber={setNextPageNumber}
              />
            )
          }

          {
            currentPageNumber === 1.2 && (
              <UnlockFeature
                setNextPageNumber={setNextPageNumber}
                nextBtnFunc={nextBtnFunc}
                skipAllFilters={skipAllFilters}
              />
            )
          }

          {currentPageNumber === 1.3 && (
            <ContinueOrSkipFilters
              setNextPageNumber={setNextPageNumber}
              nextBtnFunc={nextBtnFunc}
              submitLoading={submitLoading}
              // createAccount={addNewTherapistForm}
              skipAllFilters={skipAllFilters}
            />
          )}

          {currentPageNumber === 2 && (
            <Page2Office
              pageQuestions={{ ...form.page2Office }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
            />
          )}

          {currentPageNumber === 3 && (
            <Page3Insurance
              pageQuestions={{ ...form.page3Insurance }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 3.1 && (
            <Page3Insurers
              pageQuestions={{ ...form.page3Insurers }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 3.2 && (
            <Page3HourlyRate
              pageQuestions={{ ...form.page3HourlyRate }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 4 && (
            <Page4TherapyType
              pageQuestions={{ ...form.page4TherapyType }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 5 && (
            <Page5Languages
              pageQuestions={{ ...form.page5Languages }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 6 && (
            <Page6Availability
              pageQuestions={{ ...form.page6Availability }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 6.1 && (
            <Page6AvailabilityConfirm
              availabilityArray={[...form.page6Availability.availability]}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 7 && (
            <Page7Gender
              pageQuestions={{ ...form.page7Gender }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 8 && (
            <Page8Lgbtqia
              pageQuestions={{ ...form.page8Lgbtqia }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 9 && (
            <Page9RaceEthnicity
              pageQuestions={{ ...form.page9RaceEthnicity }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 10 && (
            <Page10Modality
              pageQuestions={{ ...form.page10Modality }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 11 && (
            <Page11Specialties
              pageQuestions={{ ...form.page11Specialties }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 12 && (
            <Page12Profiles
              pageQuestions={{ ...form.page12Profiles }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 13 && (
            <Page13AutoReply
              pageQuestions={{ ...form.page13AutoReply }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 14 && (
            <Page14Education
              pageQuestions={{ ...form.page14Education }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 15 && (
            <Page15Photo
              pageQuestions={{ ...form.page15Photo }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

          {currentPageNumber === 16 && (
            <Page16Couch
              pageQuestions={{ ...form.page16Couch }}
              updateAnswerOnPage={updateAnswerOnPage}
              pageDone={{ ...pageDone }}
              updatePageDone={updatePageDone}
              setNextPageNumber={setNextPageNumber}
            />
          )}

        </View>

        {/* {Object.values(pageDone).every(Boolean) ? */}

        {(currentPageNumber !== 1.2 && currentPageNumber !== 1.3) && (
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
                  currentPageNumber === 1 || currentPageNumber === 1.1 || currentPageNumber === 6.1 ? 0 : 1,
              }}>
              <Button
                disabled={currentPageNumber === 1 || currentPageNumber === 1.1 || currentPageNumber === 6.1}
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
          modalText="If you skip something, you can always go back into your settings and adjust your filters."
          btnText="Skip"
          btnFunc={skipToNextFunc}
        />
      </View>
    </PageScroll>
  );
};

export default NewTherapistUserFlow