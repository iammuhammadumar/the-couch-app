import React from 'react'
import styles from '../Styles';

import {
    Platform,
    Text as RNText,
} from 'react-native'

// fontFamily is a string, options: 'primary', 'secondary', or [Any font file name from src/Assets/Fonts]
// primary is Open sans
// secondary is Domine

export const Text = (props) => {

    let fontFam = null
    let fontWeightStyle = ''

    if (props.fontWeight || props.fontStyle) {
        if (props.fontWeight === 300 && props.fontStyle === 'italic') {
            fontWeightStyle = 'lightitalic'
        } else if (props.fontWeight === 300) {
            fontWeightStyle = 'light'
        } else if (props.fontWeight === 400 && props.fontStyle === 'italic') {
            fontWeightStyle = 'italic'
        } else if (props.fontWeight === 400) {
            fontWeightStyle = 'regular'
        } else if (props.fontWeight === 500 && props.fontStyle === 'italic') {
            fontWeightStyle = 'mediumitalic'
        } else if (props.fontWeight === 500) {
            fontWeightStyle = 'medium'
        } else if (props.fontWeight === 600 && props.fontStyle === 'italic') {
            fontWeightStyle = 'semibolditalic'
        } else if (props.fontWeight === 600) {
            fontWeightStyle = 'semibold'
        } else if (props.fontWeight === 700 && props.fontStyle === 'italic') {
            fontWeightStyle = 'bolditalic'
        } else if (props.fontWeight === 700) {
            fontWeightStyle = 'bold'
        } else if (props.fontWeight === 800 && props.fontStyle === 'italic') {
            fontWeightStyle = 'extrabolditalic'
        } else if (props.fontWeight === 800) {
            fontWeightStyle = 'extrabold'
        } else {
            fontWeightStyle = 'regular'
        }
    } else {
        fontWeightStyle = 'regular'
    }

    // The underscore in font names only work on android and dashes in font names only work on ios
    if (Platform.OS === 'android') {
        if (props.fontFamily === 'primary') {
            fontFam = 'opensans_' + fontWeightStyle
        } else if (props.fontFamily === 'secondary') {
            fontFam = 'domine_' + fontWeightStyle
        } else {
            fontFam = props.fontFamily?.replace('-', '_')
        }
    } else { // ios
        if (props.fontFamily === 'primary') {
            fontFam = 'opensans-' + fontWeightStyle
        } else if (props.fontFamily === 'secondary') {
            fontFam = 'domine-' + fontWeightStyle
        } else {
            fontFam = props.fontFamily
        }
    }

    let textColor = styles.colorGrey2 // default if no props.color is given

    if (props.color) {
        if (props.color.color) {
            textColor = props.color.color
        } else if (props.color) {
            textColor = props.color
        }
    }

    return (
        <RNText
            onPress={props.onPress ? () => props.onPress() : (function () { })()}
            numberOfLines={props.numberOfLines}
            ellipsizeMode={props.ellipsizeMode || "tail"}
            style={[{
                width: props.width,
                fontSize: props.fontSize,
                lineHeight: props.lineHeight,
                fontFamily: fontFam,
                fontWeight: props.fontWeight, // Some fonts might need a font-weight added for either android or ios but not both
                color: textColor,
                textAlign: props.textAlign,
                flexWrap: 'wrap',
                marginTop: props.marginTop,
                marginBottom: props.marginBottom
            }, props.textStyle]}
        >
            {props.text}
        </RNText>
    )
}