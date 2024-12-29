import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef()

// Make ready Navigation to navigate
export async function prepareNavigation() {
    navigationRef.isReady()
}

// Navigae to any page 
export async function navigate(routeName: string, params?: object) {
    navigationRef.isReady()

    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params))
    }
}

// Replace route 
export async function replace(routeName: string, params?: object) {
    navigationRef.isReady()

    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params))
    }
}


// history screen remove and applivation get close 
// initial stack start from zero
export async function resetAndNavigate(routeName: string) {
    navigationRef.isReady()

    if (navigationRef.isReady()) {
        // reset the previus stack which contains navigation history
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }]
        }))
    }
}

// Go back Navigate 
export async function goBack() {
    navigationRef.isReady()

    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack())
    }
}


export async function push(routeName: string, params?: object) {
    navigationRef.isReady()

    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params))
    }
}