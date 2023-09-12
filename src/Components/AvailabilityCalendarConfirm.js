import React, { useState, useRef } from 'react'
import styles from '../Styles'

import { CustomScrollView } from './CustomScrollView'
import { CustomHorizontalScrollIndicator } from './CustomHorizontalScrollIndicator'
import { Button } from './Button'

import { View, ScrollView, Animated } from 'react-native'

export const AvailabilityCalendarConfirm = (props) => {

    const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
    const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

    const scrollIndicatorSize =
        completeScrollBarWidth > visibleScrollBarWidth
            ? (visibleScrollBarWidth * visibleScrollBarWidth) /
            completeScrollBarWidth
            : visibleScrollBarWidth;
    const scrollIndicator = useRef(new Animated.Value(0)).current;

    const difference =
        visibleScrollBarWidth > scrollIndicatorSize
            ? visibleScrollBarWidth - scrollIndicatorSize
            : 1;

    const scrollIndicatorPosition = Animated.multiply(
        scrollIndicator,
        visibleScrollBarWidth / completeScrollBarWidth
    ).interpolate({
        inputRange: [0, difference],
        outputRange: [0, difference],
        extrapolate: 'clamp'
    });

    const daysObj = { 'Su': 7, 'M': 1, 'Tu': 2, 'W': 3, 'Th': 4, 'F': 5, 'Sa': 6 }
    const timeObj = { 'Morning': 1, 'Mid-day': 2, 'Afternoon': 3, 'Evening': 4, 'Night': 5 }

    const tabOptions = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
    const timeStr = ['Morning', 'Mid-day', 'Afternoon', 'Evening', 'Night']

    return (
        <View style={{ marginBottom: props.marginBottom }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // alwaysBounceHorizontal={false}
                bounces={false}
                onContentSizeChange={(width, height) => {
                    // console.log('height', width, height)
                    setCompleteScrollBarWidth(width);
                }}
                onLayout={({
                    nativeEvent: {
                        layout: { width }
                    }
                }) => {
                    setVisibleScrollBarWidth(width);
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollIndicator } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={[styles.width100, styles.flexRow]}>
                    {/* Left View with all the time of days buttons */}
                    <View
                        style={[styles.backgroundColorYellow01, styles.alignCenter, styles.paddingT38L30R15B15, { borderTopLeftRadius: 6, marginTop: 40 }]}
                    >
                        {timeStr.map((time, index) => (
                            <Button
                                key={index}
                                text={time}
                                disabled
                                fontSize={20}
                                lineHeight={24}
                                fontFamily='primary'
                                width={165}
                                backgroundColor={styles.backgroundColorWhite}
                                color={styles.colorBlack1}
                                marginBottom={index !== 4 ? 20 : 0}
                                btnStyle={[styles.borderRadius3]}
                            />
                        ))}
                    </View>

                    {/* Right View with the tab options and the pink time of day markers */}
                    <View style={[styles.flexRow]}>
                        {tabOptions.map((day, index) => (
                            // Each tab with the day at the top and the time of day markers at the bottom
                            <View key={index}>
                                <Button
                                    disabled
                                    text={day}
                                    fontSize={20}
                                    lineHeight={24}
                                    width={40}
                                    backgroundColor={styles.backgroundColorYellow01}
                                    btnStyle={[styles.borderTopRadius6, { paddingTop: 5, paddingHorizontal: 0, paddingBottom: 5 }]}
                                />

                                <View style={[styles.flex1, styles.paddingT43L9B15, styles.backgroundColorYellow01, { width: index !== 6 ? 44 : 40 }]}>
                                    {timeStr.map((time, index) => {
                                        let isActive = Boolean(props?.data?.filter(obj => obj.schedule_days === daysObj[day] && obj.schedule_begin === timeObj[time]).length > 0)
                                        return (
                                            <View
                                                key={index}
                                                style={[
                                                    styles.borderRadius3,
                                                    {
                                                        width: 27,
                                                        height: '21%',
                                                        marginBottom: -4,
                                                        backgroundColor: isActive ? styles.backgroundColorRed1.backgroundColor : 'transparent',
                                                    }
                                                ]}
                                            />
                                        )
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.width100, styles.backgroundColorYellow01, styles.paddingL30R2B10, styles.borderBottomRadius6]}>
                <CustomHorizontalScrollIndicator
                    scrollIndicatorSize={scrollIndicatorSize}
                    scrollIndicatorPosition={scrollIndicatorPosition}
                    height={14}
                    trackColor='transparent'
                    thumbColor='#FDFDFD'
                />
            </View>
        </View>
    )
}