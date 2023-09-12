import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from "@react-navigation/routers";

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function replace(name) {
    if (navigationRef.isReady()) {
        navigationRef.current.dispatch(StackActions.replace(name))
    }
}