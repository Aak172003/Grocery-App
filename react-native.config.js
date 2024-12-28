
// in ios list me react-native-vector-icons ko add krna pdta hai , 
// aur android ke lie wo automatically assets create ojata hai

// This is how i link my fonts in android folder 
// npx react-native-asset

module.exports = {
    project: {
        ios: {},
        android: {}
    },
    "react-native-vector-icons": {
        platforms: {
            ios: null
        }
    },
    assets: ['./src/assets/fonts'],
    getTransformModulePath() {
        return require.resolve("react-native-typescript-transformer")
    },
    getSourceExts() {
        return ['ts', 'tsx']
    }
}