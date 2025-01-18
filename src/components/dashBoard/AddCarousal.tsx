import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { screenWidth } from '@utils/Scaling';
import ScalePress from '@components/ui/ScalePress';

const AddCarousal: FC<{ adData: any }> = ({ adData }) => {
    const progressValue = useSharedValue(0);
    const baseOptions = {
        vertical: false,
        width: screenWidth,
        height: screenWidth * 0.5,
    };

    return (
        <View style={{ left: -20, marginVertical: 20 }}>
            <Carousel
                {...baseOptions}
                autoPlay
                autoPlayInterval={3000}
                loop
                pagingEnabled
                snapEnabled
                mode="parallax"
                data={adData}
                modeConfig={{
                    // parallaxScrollingScale: 0.900,
                    // parallaxScrollingOffset: 55,
                    parallaxScrollingScale: 0.94,
                    parallaxScrollingOffset: 0,
                }}
                onProgressChange={(currentProgress) => {
                    const roundedProgress = parseFloat(currentProgress.toFixed(2)); // Limit to 2 decimal places
                    progressValue.value = roundedProgress;
                }}
                renderItem={({ item }: any) => (

                    <ScalePress style={styles.imageContainer}>
                        <Image source={item} style={styles.img} />
                    </ScalePress>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
});

export default AddCarousal;
