import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  semiBold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  italic: {
    fontStyle: 'italic',
  },

  textAlignCenter: {
    textAlign: 'center',
  },

  underline: {
    textDecorationLine: 'underline',
  },

  uppercase: {
    textTransform: 'uppercase',
  },

  // Font colors

  colorWhite: {
    color: '#fff',
  },


  colorGrey0: {
    color: '#A5A3A3',
  },

  colorGrey2: {
    color: '#6D6A69',
  },
  colorGrey4: {
    color: '#707070',
  },


  colorYellow1: {
    color: '#E3AF51'
  },

  colorOrange2: {
    color: '#FFD4A5',
  },
  colorOrange3: {
    color: '#F6B27D',
  },


  colorPink1: {
    color: '#F6A3A2',
  },

  colorRed1: {
    color: '#FF0000'
  },

  colorBlack0: {
    color: '#504E4E',
  },
  colorBlack1: {
    color: '#454545',
  },
  colorBlack2: {
    color: '#000000',
  },




  // Background Colors
  backgroundColorWhite: {
    backgroundColor: 'white',
  },

  backgroundColorWhite1: {
    backgroundColor: '#E2E2E2',
  },


  backgroundColorYellow0: {
    backgroundColor: '#FCFAEA',
  },
  backgroundColorYellow01: {
    backgroundColor: '#ECE9D8'
  },

  backgroundColorYellow1: {
    backgroundColor: '#E3AF51',
  },



  backgroundColorOrange0: {
    backgroundColor: '#F6E5D4',
  },
  backgroundColorOrange1: {
    backgroundColor: '#FFE6C7',
  },

  backgroundColorOrange2: {
    backgroundColor: '#FFD4A5',
  },



  backgroundColorRed0: {
    backgroundColor: '#E0C9C1',
  },
  backgroundColorRed1: {
    backgroundColor: '#F59798',
  },

  backgroundColorGrey0: {
    backgroundColor: '#A5A3A3',
  },
  backgroundColorGrey1: {
    backgroundColor: '#D3D1C4',
  },
  backgroundColorGrey3: {
    backgroundColor: '#C4C4C4',
  },
  backgroundColorGrey4: {
    backgroundColor: "#E6E6E6"
  },


  // Flex
  flex1: {
    flex: 1,
  },

  flexGrow1: {
    flexGrow: 1,
  },

  flexBasis10: {
    flexBasis: 10,
  },


  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This is for small screens
  },
  noWrap: {
    flexWrap: 'nowrap',
  },

  flexRowReverse: {
    flexDirection: 'row-reverse',
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flexColumnReverse: {
    flexDirection: 'column-reverse',
  },
  flexCenterCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignFlexStart: {
    alignItems: 'flex-start',
  },
  alignFlexEnd: {
    alignItems: 'flex-end',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },

  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },


  justifySelfEnd: {
    justifySelf: 'flex-end',
  },




  border1: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderStyle: 'solid',
  },



  borderRadius3: {
    borderRadius: 3,
  },

  borderTopRadius3: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  borderBottomRadius3: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  borderRadius10: {
    borderRadius: 10,
  },


  borderTopRadius10: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  borderRadius27: {
    borderRadius: 27,
  },

  borderRadius100: {
    borderRadius: 100,
  },

  borderRadius200: {
    borderRadius: 200,
  },

  borderTopRadius6: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  borderBottomRadius6: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },


  overflowScroll: {
    overflow: 'scroll',
  },
  overflowHidden: {
    overflow: 'hidden',
  },



  borderBottomGrey0: {
    borderBottomColor: '#A5A3A3',
    borderBottomWidth: 1,
  },
  borderBottomGrey1: {
    borderBottomColor: '#D8D4D4',
    borderBottomWidth: 1,
  },



  borderBottomBlack0: {
    borderBottomColor: '#504E4E',
    borderBottomWidth: 1,
  },

  borderBottomBlack4: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },







  // Sizes
  logoSize: {
    width: 324,
    height: 76,
  },


  width100: {
    width: '100%',
  },



  height55: {
    height: 55
  },
  height80: {
    height: 80
  },
  height100: {
    height: '100%',
  },
  minHeight100: {
    minHeight: '100%',
  },





  // padding

  fullHeaderTopPadding: {
    paddingTop: Platform.OS === 'ios' ? 91 : 50,
  },

  headerBackTopPadding: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },



  modalPadding: {
    paddingHorizontal: 36,
    paddingBottom: 20,
  },



  padding8: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },


  paddingT15: {
    paddingTop: 15,
  },

  paddingT25: {
    paddingTop: 25,
  },

  PaddingT30: {
    paddingTop: 30,
  },

  paddingT37: {
    paddingTop: 37,
  },

  paddingT50: {
    paddingTop: 50,
  },

  paddingT32: {
    paddingTop: 32,
  },

  paddingT90: {
    paddingTop: 90,
  },


  paddingV10: {
    paddingVertical: 10,
  },
  paddingV30: {
    paddingVertical: 30,
  },
  paddingV50: {
    paddingVertical: 50,
  },

  paddingH9: {
    paddingHorizontal: 9
  },
  paddingH10: {
    paddingHorizontal: 10
  },
  paddingH15: {
    paddingHorizontal: 15
  },
  paddingH20: {
    paddingHorizontal: 20
  },
  paddingH24: {
    paddingHorizontal: 24
  },
  paddingH32: {
    paddingHorizontal: 32
  },
  paddingH36: {
    paddingHorizontal: 36
  },

  paddingT46B16: {
    paddingTop: 46,
    paddingBottom: 16,
  },

  paddingT43L9B15: {
    paddingTop: 43,
    paddingLeft: 9,
    paddingBottom: 15,
  },

  paddingT38L30R15B15: {
    paddingTop: 38,
    paddingLeft: 30,
    paddingRight: 15,
    paddingBottom: 15,
  },

  paddingL5R20: {
    paddingLeft: 5,
    paddingRight: 20,
  },

  paddingR20: {
    paddingRight: 20,
  },

  paddingL30R2B10: {
    paddingLeft: 30,
    paddingRight: 2,
    paddingBottom: 10,
  },


  paddingB7: {
    paddingBottom: 7,
  },
  paddingB20: {
    paddingBottom: 20,
  },






  // Reusable component styles
  textInput: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 21,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E2E2E2',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 1,
    shadowOffset: {
      width: -1,
      height: 1
    },
    elevation: 1, // For Android

    fontSize: 15,
    fontFamily: 'opensans-light',
    color: '#504E4E',
  },

  chatContainer: {
    padding: 5,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
    borderTopColor: '#E2E2E2',
    borderTopWidth: 1
  },

  chatTextInput: {
    width: '80%',
    height: 50,
    backgroundColor: 'transparent',
    fontSize: 15,
    fontFamily: 'opensans-light',
    color: '#504E4E'
  },

  inputShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 1,
    shadowOffset: {
      width: -1,
      height: 1
    },
    elevation: 1, // For Android
  },


  swipeTherapistCards: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FCFAEA',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 1, // For Android
    // marginBottom: 20,
  },

  stcSpecialtyViews: {
    width: 'auto',
    backgroundColor: '#E0C9C1',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 11,
    marginBottom: 6,
  },

  swipeBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
  },


  displayPrefPills: {
    minWidth: 83,
    height: 32,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD4A5',
    borderRadius: 16,
    marginRight: 19,
  },



  infoCardContainer: {
    justifyContent: 'center',
    backgroundColor: '#FFE6C7',
    shadowColor: '#FFE6C7',
    shadowRadius: 0,
    marginBottom: 10,
    marginTop: 30,
    borderRadius: 10,
  },


  infoCardShadow: {
    flex: 1,
    backgroundColor: '#FCFAEA',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 1,
  },



  recentSearchesContainer: {
    width: '100%',
    flexGrow: 1,
    height: '90%',
    paddingTop: 54,
    paddingHorizontal: 37,
    marginBottom: Platform.OS === 'ios' ? 90 : 80, // + 25?
  },

  searchBarInHeader: {
    // width: '100%',
    // alignSelf: 'flex-end',
    flex: 2,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#D9D9D9',
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginLeft: 21,
  },





  // Pages

  pagePadding: {
    paddingHorizontal: 26,
    paddingBottom: 20,
  },



  pageAboveBottomTab: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#FCFAEA',
    paddingHorizontal: 26,
    marginBottom: Platform.OS === 'ios' ? 65 : 55,
  }
});
