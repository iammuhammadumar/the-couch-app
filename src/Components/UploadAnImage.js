import React, { useEffect, useState } from 'react'
import styles from '../Styles'
import { useAppContext } from '../Lib/UserContext';
import axios from "axios";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from './Button'
import { Text } from './Text'
import { Loading } from './Loading'

import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native'

import plusIconOrange from '../Assets/Images/plusIcon-orange.png'
import xIconOrange from '../Assets/Images/xIcon-orange.png'
import cameraRollIcon from '../Assets/Images/cameraRollIcon.png'
import takePhotoIcon from '../Assets/Images/takePhotoIcon.png'
import greyCircleIcon from '../Assets/Images/greyCircleIcon.png'
import couchSelectionBackground from '../Assets/Images/couchSelectionBackground.png'

export const UploadAnImage = (props) => {
    const { screenWidth, userType, userData } = useAppContext()
    const [modalToChooseTypeOpen, setModalToChooseTypeOpen] = useState(false)
    const [couchModalOpen, setCouchModalOpen] = useState(false)
    const [picType, setPicType] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [selectedImgSrc, setSelectedImgSrc] = useState(props.backgroundImage)
    const [useResizeMode, setUseResizeMode] = useState('cover')
    const [couchPhotoHeight, setCouchPhotoHeight] = useState('auto')
    const [iconPosition, setIconPosition] = useState('absolute')
    const [selectedCouch, setSelectedCouch] = useState(null)
    const couchOptions = [
        {
            id: 'yellowCouch',
            source: "https://thecouchfea60ba6e7772c4700b0cbef545cde86b8230222-prod.s3.us-west-2.amazonaws.com/public/yellowCouch.png"
        },
        {
            id: 'purpleCouch',
            source: "https://thecouchfea60ba6e7772c4700b0cbef545cde86b8230222-prod.s3.us-west-2.amazonaws.com/public/purpleCouch.png"
        },
        {
            id: 'orangeCouch',
            source: "https://thecouchfea60ba6e7772c4700b0cbef545cde86b8230222-prod.s3.us-west-2.amazonaws.com/public/orangeCouch.png"
        },
        {
            id: 'redCouch',
            source: "https://thecouchfea60ba6e7772c4700b0cbef545cde86b8230222-prod.s3.us-west-2.amazonaws.com/public/redCouch.png"
        },
    ]

    useEffect(() => {
        if (props.value) {
            const couchUrls = couchOptions.map(({ source }) => source);
            setSelectedImgSrc({ uri: props.value })
            if (couchUrls.includes(props.value)) {
                setUseResizeMode('contain')
                setCouchPhotoHeight(screenWidth / 2.5)
                setIconPosition('relative')
            } else {
                setUseResizeMode('cover')
                setCouchPhotoHeight(screenWidth * 0.84)
                setIconPosition('absolute')
            }
        } else {
            setSelectedImgSrc(props.backgroundImage)
            setUseResizeMode('contain')
            setCouchPhotoHeight(screenWidth * 0.74)
            setIconPosition('absolute')
        }
    }, [props.value])



    const selectImage = async (obj) => {
        setImageLoading(true)

        let options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
            maxWidth: 400,
            maxHeight: 500,
            quality: 1,
        }
        setModalToChooseTypeOpen(false)
        const result = await launchImageLibrary(options);
        handleLibraryOrCameraResponse(result);
    }

    const handleLibraryOrCameraResponse = (result) => {
        if (result.assets && result.assets[0]) {
            setModalToChooseTypeOpen(false)
            props.onChangefunc(props.stateName, props.statePath, `data:image/png;base64,${result.assets[0].base64}`);
            setImageLoading(false)
            setUseResizeMode('cover')
        } else if (result.didCancel || result.errorCode) {
            setImageLoading(false)
        }
    }


    const takePicture = async () => {
        // setImageLoading(true)
        let options = {
            cameraType: 'front',
            includeBase64: true,
            saveToPhotos: false,
            includeExtra: false,
            maxWidth: 400,
            maxHeight: 500,
            quality: 1,
        }
        try {
            const res = await launchCamera(options);
            handleLibraryOrCameraResponse(res);
        } catch (error) {
            console.log("error", error);
        }
    }


    const chooseType = (type) => {
        setPicType(type)
    }


    const selectType = async () => {
        if (picType === 'library') {
            selectImage()
        } else if (picType === 'camera') {
            takePicture()
        } else if (picType === 'couches') {
            setModalToChooseTypeOpen(false)
            setCouchModalOpen(true)
        }
    }

    return (
        <View style={[styles.width100]}>
            <TouchableOpacity
                onPress={() => { if (!props.disabled) { setModalToChooseTypeOpen(true) } }}
                style={[styles.alignCenter, { position: 'relative', marginBottom: props.marginBottom }]}
            >
                <Image
                    source={selectedImgSrc}
                    resizeMode={useResizeMode}
                    style={[userType === '0' ? styles.borderRadius200 : styles.borderTopRadius10, styles.overflowHidden, { width: '100%', height: couchPhotoHeight }]}
                    imageStyle={[styles.alignSelfStart]}
                />
                {imageLoading &&
                    <Loading size='large' color={props.value ? '#fff' : '#504E4E'} style={{ position: 'absolute', top: '40%' }} />
                }
                {!props.hidePlusSign &&
                    <>
                        {props.value ?
                            <Image source={xIconOrange} style={{ width: 51, height: 51, position: iconPosition, bottom: iconPosition === 'absolute' ? 20 : 0 }} />
                            :
                            <Image source={plusIconOrange} style={{ width: 51, height: 51, position: iconPosition, bottom: iconPosition === 'absolute' ? 20 : 0 }} />
                        }
                    </>
                }
            </TouchableOpacity>


            <Modal
                visible={modalToChooseTypeOpen}
                transparent={true}
                animationType='fade'
            >
                <View style={[styles.flex1, styles.headerBackTopPadding, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}>
                    <Button
                        text='Back'
                        fontSize={18}
                        lineHeight={34}
                        fontFamily='primary'
                        fontWeight={300}
                        color='#fff'
                        backgroundColor='rgba(0,0,0,0)'
                        onPress={() => setModalToChooseTypeOpen(false)}
                        marginBottom={63}
                        btnStyle={{ alignSelf: 'flex-start' }}
                    />
                    <View style={[styles.flexGrow1, styles.modalPadding, styles.flexCenterCenter]}>
                        <View style={[styles.width100, styles.borderRadius10, styles.backgroundColorWhite, { marginBottom: 43 }]}>
                            <Button
                                text={
                                    <View style={[styles.flexRowAlignCenter]}>
                                        <Image source={cameraRollIcon} style={{ width: 18, height: 18, marginRight: 13 }} />
                                        <Text
                                            text='Camera roll'
                                            fontSize={16}
                                            lineHeight={16}
                                            fontFamily='primary'
                                            fontWeight={300}
                                            color={'#38393B'}
                                            textStyle={{ textAlign: 'left' }}
                                        />
                                    </View>
                                }
                                onPress={() => chooseType('library')}
                                width='100%'
                                backgroundColor={picType === 'library' ? '#FDD6A2' : 'rgba(0,0,0,0)'}
                                btnStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 1, borderBottomColor: '#E2E2E280', paddingTop: 25 }}
                            />
                            <Button
                                text={
                                    <View style={[styles.flexRowAlignCenter]}>
                                        <Image source={takePhotoIcon} style={{ width: 18, height: 18, marginRight: 13 }} />
                                        <Text
                                            text='Take photo'
                                            fontSize={16}
                                            lineHeight={16}
                                            fontFamily='primary'
                                            fontWeight={300}
                                            color={'#38393B'}
                                            textStyle={{ textAlign: 'left' }}
                                        />
                                    </View>
                                }
                                onPress={() => chooseType('camera')}

                                width='100%'
                                backgroundColor={picType === 'camera' ? '#FDD6A2' : 'rgba(0,0,0,0)'}
                                btnStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: props.forCouches && 0, borderBottomRightRadius: props.forCouches && 0, paddingBottom: !props.forCouches ? 25 : 10 }}
                            />

                            {props.forCouches &&
                                <Button
                                    text={
                                        <View style={[styles.flexRowAlignCenter]}>
                                            <Image source={greyCircleIcon} style={{ width: 18, height: 18, marginRight: 13 }} />
                                            <Text
                                                text='Select from our couches'
                                                fontSize={16}
                                                lineHeight={16}
                                                fontFamily='primary'
                                                fontWeight={300}
                                                color={'#38393B'}
                                                textStyle={{ textAlign: 'left' }}
                                            />
                                        </View>
                                    }
                                    onPress={() => chooseType('couches')}

                                    width='100%'
                                    backgroundColor={picType === 'couches' ? '#FDD6A2' : 'rgba(0,0,0,0)'}
                                    btnStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, paddingBottom: 20, borderTopWidth: 1, borderTopColor: '#E2E2E280' }}
                                />
                            }
                        </View>

                        <Button
                            text='Select'
                            fontSize={21}
                            lineHeight={25}
                            fontFamily='primary'
                            fontWeight={700}
                            color='#fff'
                            backgroundColor='#FDD6A2'
                            onPress={selectType}
                            marginBottom={63}
                        />
                    </View>
                </View>
            </Modal>


            {/* For couch selection */}
            <Modal
                visible={couchModalOpen}
                transparent={true}
                animationType='fade'
            >
                <View style={[styles.flex1]}>
                    <ImageBackground
                        source={couchSelectionBackground}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View style={[styles.flexGrow1, styles.headerBackTopPadding]}>
                            <Button
                                text='Back'
                                fontSize={18}
                                lineHeight={34}
                                fontFamily='primary'
                                fontWeight={300}
                                color='#fff'
                                backgroundColor='rgba(0,0,0,0)'
                                onPress={() => setCouchModalOpen(false)}
                                marginBottom={63}
                                btnStyle={{ alignSelf: 'flex-start' }}
                            />
                            <View style={[styles.flexGrow1, styles.modalPadding, styles.flexCenterCenter]}>

                                <View style={[styles.width100, styles.borderRadius10, styles.backgroundColorWhite, { marginBottom: 43 }]}>
                                    {couchOptions.map((couchObj, index) => (
                                        <TouchableOpacity
                                            key={couchObj.id}
                                            onPress={() => setSelectedCouch(couchObj.source)}
                                            style={[styles.width100, styles.flexCenterCenter, { height: 103, backgroundColor: selectedCouch === couchObj.source ? '#C4C4C44D' : 'rgba(0,0,0,0)' }]}
                                        >
                                            <Image source={{ uri: couchObj.source }} style={{ width: 180, height: 75 }} />
                                        </TouchableOpacity>
                                    ))}

                                </View>

                                <Button
                                    text='Select'
                                    fontSize={21}
                                    lineHeight={25}
                                    fontFamily='primary'
                                    fontWeight={700}
                                    color='#fff'
                                    backgroundColor='#FDD6A2'
                                    onPress={() => { props.onChangefunc(props.stateName, props.statePath, selectedCouch.toString()), setUseResizeMode('contain'), setCouchModalOpen(false) }}
                                    marginBottom={63}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    )
}