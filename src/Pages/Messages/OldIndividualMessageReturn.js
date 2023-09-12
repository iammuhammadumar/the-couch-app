// return (
//     <SafeAreaView style={[styles.pageAboveBottomTab, { paddingHorizontal: 0 }]}>
//         <View style={[styles.flexGrow1, { paddingTop: 20 }]}>
//             {userType === '0' &&
//                 <View style={[styles.flexRowAlignCenter, styles.borderBottomGrey1, styles.alignSelfCenter, { marginHorizontal: 7.5 }]}>
//                     <TouchableOpacity style={[styles.flex1, { marginBottom: 11 }]}>
//                         <Text
//                             text='Chat'
//                             fontSize={15}
//                             lineHeight={18}
//                             fontFamily='primary'
// fontWeight = {400}
//                             color='#6D6A69'
//                             textAlign='center'
//                         />
//                     </TouchableOpacity>
//                     <View style={[styles.height100, { width: 1, marginBottom: 5, backgroundColor: '#D8D4D4' }]} />

//                     {/* DK TODO: ADD FUNCTIONALITY */}
//                     <TouchableOpacity style={[styles.flex1, { marginBottom: 11 }]}>
//                         <Text
//                             text='Profile'
//                             fontSize={15}
//                             lineHeight={18}
//                             fontFamily='primary'
// fontWeight = {400}
//                             color='#6D6A69'
//                             textAlign='center'
//                         />
//                     </TouchableOpacity>
//                 </View>
//             }

//             {messages.name && (
//                 <>
//                     <FlatList
//                         data={messages.messages}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => {
//                             return (
//                                 <View>
//                                     <Cards
//                                         style={[
//                                             {
//                                                 backgroundColor:
//                                                     item.from === 'me' ? '#FFE6C7' : '#F6E5D4',
//                                                 marginLeft: item.from === 'me' ? 180 : 0,
//                                                 marginRight: item.from === 'me' ? 0 : 180,
//                                                 marginBottom: 37,
//                                                 paddingHorizontal: 7,
//                                                 paddingBottom: 10,
//                                                 paddingTop: 5,
//                                             },
//                                         ]}>
//                                         <View>
//                                             <Text
//                                                 text={item.message}
//                                                 textAlign={item.from === 'me' ? 'right' : 'left'}
//                                                 fontSize={14}
//                                                 color='#454545'
//                                                 lineHeight={17}
//                                                 // fontFamily='primary'
//fontWeight = {400}
//                                                 textAlign='left'
//                                             />
//                                         </View>
//                                     </Cards>
//                                 </View>
//                             );
//                         }}
//                         style={[styles.flex1, styles.pagePadding]}
//                     />
//                 </>
//             )}
//         </View>
//     </SafeAreaView>
// );