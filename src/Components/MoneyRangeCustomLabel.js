import React from 'react';
import styles from '../Styles'

import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

MoneyRangeCustomLabel.defaultProps = {
    leftDiff: 0,
};

const width = 50;

function LabelBase(props) {
    const { position, value, leftDiff, pressed } = props;

    const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
    const cachedPressed = React.useRef(pressed);

    React.useEffect(() => {
        Animated.timing(scaleValue.current, {
            toValue: 1,
            duration: 200,
            delay: 0,
            useNativeDriver: false,
        }).start();
        cachedPressed.current = pressed;
    }, [pressed]);

    return (
        Number.isFinite(position) &&
        Number.isFinite(value) && (
            <AnimatedView
                style={[
                    labelStyles.sliderLabel,
                    {
                        left: position - width / 2,
                        transform: [
                            { translateY: width },
                            { scale: scaleValue.current },
                            { translateY: -width },
                        ],
                    },
                ]}
            >
                <Text
                    style={[
                        labelStyles.sliderLabelText,
                        {
                            fontSize: props.small ? 14 : 18,
                            lineHeight: props.small ? 16 : 22,
                            color: props.textColor ? props.textColor : styles.colorYellow1.color,
                            bottom: props.label2 && 16,
                            marginBottom: props.small ? 3 : 16,
                        }]}>${value}</Text>
            </AnimatedView>
        )
    );
}

export function MoneyRangeCustomLabel(props) {
    const {
        leftDiff,
        oneMarkerValue,
        twoMarkerValue,
        oneMarkerLeftPosition,
        twoMarkerLeftPosition,
        oneMarkerPressed,
        twoMarkerPressed,
    } = props.data;

    return (
        <View style={labelStyles.parentView}>
            <LabelBase
                position={oneMarkerLeftPosition}
                value={oneMarkerValue}
                leftDiff={leftDiff}
                pressed={oneMarkerPressed}
                small={props.small}
                textColor={props.textColor}
            />
            <LabelBase
                label2
                position={twoMarkerLeftPosition}
                value={twoMarkerValue}
                leftDiff={leftDiff}
                pressed={twoMarkerPressed}
                small={props.small}
                textColor={props.textColor}
            />
        </View>
    );
}

const labelStyles = StyleSheet.create({
    parentView: {
        position: 'relative',
    },
    sliderLabel: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 0,
        width: width,
        // height: width,
        backgroundColor: 'transparent'
    },
    sliderLabelText: {
        flex: 1,
        // lineHeight: width,
        fontFamily: 'opensans-bold',
        textAlign: 'center',
    },
});