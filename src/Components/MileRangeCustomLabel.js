import React from 'react';
import styles from '../Styles'

import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

MileRangeCustomLabel.defaultProps = {
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
                <Text style={labelStyles.sliderLabelText}>{value}mi</Text>
            </AnimatedView>
        )
    );
}

export function MileRangeCustomLabel(props) {
    const {
        leftDiff,
        oneMarkerValue,
        oneMarkerLeftPosition,
        oneMarkerPressed,
    } = props;

    return (
        <View style={labelStyles.parentView}>
            <LabelBase
                position={oneMarkerLeftPosition}
                value={oneMarkerValue}
                leftDiff={leftDiff}
                pressed={oneMarkerPressed}
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
        bottom: -15,
        width: width,
        height: width,
    },
    sliderLabelText: {
        flex: 1,
        fontSize: 12,
        lineHeight: width,
        color: styles.colorGrey4.color,
        fontFamily: 'opensans-bold',
        textAlign: 'center',
    },
});