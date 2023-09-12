import React from 'react'
import styles from '../Styles'

import {
    Platform,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Animated,
} from 'react-native'


export const PageScroll = (props) => {
    // const [keyboardAvoidingViewKey, setKeyboardAvoidingViewKey] = useState('keyboardAvoidingViewKey')

    return (
        <SafeAreaView
            style={[styles.flexGrow1,
            {
                backgroundColor: props.backgroundColor ? props.backgroundColor : styles.backgroundColorYellow0.backgroundColor
            }
            ]}
        >
            {props.scrollEnabled === false ?
                <>
                    { props.children}
                </>
                :
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flexGrow: 1 }}
                >
                    <ScrollView
                        scrollEnabled={props.scrollEnabled ? props.scrollEnabled : true}
                        style={[styles.flex1]}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref={props.scrollRef}
                        onScroll={Animated.event(
                            [],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        {props.children}
                    </ScrollView>
                </KeyboardAvoidingView>
            }
        </SafeAreaView>
    )
}