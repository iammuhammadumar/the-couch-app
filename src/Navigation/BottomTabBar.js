import React, { useState } from 'react';

import styles from '../Styles';

import {
    Platform,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
} from 'react-native'

// import { forFadeFromCenter } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

const { width } = Dimensions.get('screen')


const BottomTabBar = ({ state, descriptors, navigation }) => {

    return (
        <View style={[barStyles.container, styles.flexCenterCenter]}>
            <View style={[barStyles.innerView]}>
                {state.routes.map((route, index) => {
                    // const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    let iconName;
                    let iconWidth = null

                    let iconHeight = null

                    if (route.name === 'ProfileTab') {
                        iconName = isFocused
                            ? require('../Assets/Images/profileTabIcon-active.png')
                            : require('../Assets/Images/profileTabIcon-inactive.png');
                        iconWidth = Platform.OS === 'ios' ? 24 : 24;
                        iconHeight = Platform.OS === 'ios' ? 23 : 23;


                    } else if (route.name === 'HomeTab') {
                        iconName = isFocused
                            ? require('../Assets/Images/homeTabIcon-active.png')
                            : require('../Assets/Images/homeTabIcon-inactive.png');
                        iconWidth = Platform.OS === 'ios' ? 39 : 39;
                        iconHeight = Platform.OS === 'ios' ? 28 : 28;

                    } else if (route.name === 'InfoTab') {
                        iconName = isFocused
                            ? require('../Assets/Images/infoTabIcon-active.png')
                            : require('../Assets/Images/infoTabIcon-inactive.png');
                        iconWidth = Platform.OS === 'ios' ? 28 : 28;
                        iconHeight = Platform.OS === 'ios' ? 28 : 28;

                    } else if (route.name === 'MessagesTab') {
                        iconName = isFocused
                            ? require('../Assets/Images/messagesTabIcon-active.png')
                            : require('../Assets/Images/messagesTabIcon-inactive.png');
                        iconWidth = Platform.OS === 'ios' ? 28 : 28;
                        iconHeight = Platform.OS === 'ios' ? 23.8 : 23.8;
                    }

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    return (
                        <TouchableOpacity onPress={onPress} style={[barStyles.tabs, styles.flexCenterCenter]} key={route.name}>
                            <Image source={iconName} style={{ width: iconWidth, height: iconHeight }} />
                        </TouchableOpacity>
                    )

                })}
            </View>
        </View>
    )
}

const barStyles = StyleSheet.create({
    container: {
        width,
        height: Platform.OS === 'ios' ? 65 : 55,
        position: 'absolute',
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#fff',
    },
    innerView: {
        width: '93%', // '83%'
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
    },

    tabs: {
        flex: 1,
    },
})

export default BottomTabBar