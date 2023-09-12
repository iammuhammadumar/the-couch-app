import React from 'react';
import styles from '../Styles';

import { Text } from './Text';
import { Loading } from './Loading'
import {
  View,
  TouchableOpacity,
} from 'react-native';

// fontFamily is a string, options: [Any font file name from src/Assets/fonts]

export const Button = props => {
  let backgroundColor = styles.backgroundColorOrange2.backgroundColor; // default if no props.backgroundColor is given

  if (props.backgroundColor) {
    if (props.backgroundColor.backgroundColor) {
      backgroundColor = props.backgroundColor.backgroundColor;
    } else {
      backgroundColor = props.backgroundColor;
    }
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={props.disabled && 1}
      onPress={props.onPress}
      style={[
        {
          width: props.width,
          height: props.height,
          paddingTop: props.paddingTop ? props.paddingTop : 14,
          paddingHorizontal: props.paddingH ? props.paddingH : 18,
          paddingBottom: props.paddingBottom ? props.paddingBottom : 10,
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
          marginBottom: props.marginBottom,
          backgroundColor: backgroundColor,
          borderWidth: props.borderWidth,
          borderColor: props.borderColor,
          borderRadius: 10
        },
        props.btnStyle,
      ]}>
      <React.Fragment>
        {
          props.title ?
            <Text
              fontSize={props.titleFontSize ? props.titleFontSize : 19}
              lineHeight={props.titleLineHeight ? props.titleLineHeight : 23}
              color={props.titleColor ? props.titleColor : styles.colorGrey2}
              fontFamily={props.fontFamily ? props.fontFamily : 'primary'}
              fontWeight={props.fontWeight ? props.fontWeight : 700}
              text={props.title}
              textAlign={props.textAlign ? props.textAlign : 'center'}
              textStyle={props.textStyle}
            /> :
            <React.Fragment />
        }
        {
          props.text === 'setLoading' ?
            <Loading />
            :
            <Text
              fontSize={props.fontSize ? props.fontSize : 19}
              lineHeight={props.lineHeight ? props.lineHeight : 23}
              color={props.color ? props.color : styles.colorGrey2}
              fontFamily={props.fontFamily ? props.fontFamily : 'primary'}
              fontWeight={props.fontWeight ? props.fontWeight : 700}
              text={props.text}
              textAlign={props.textAlign ? props.textAlign : 'center'}
              textStyle={props.textStyle}
            />
        }
      </React.Fragment>
    </TouchableOpacity >
  );
};
