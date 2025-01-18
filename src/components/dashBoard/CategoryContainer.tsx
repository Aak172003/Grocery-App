import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import ScalePress from '@components/ui/ScalePress';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const CategoryContainer: FC<{ data: any }> = ({ data }) => {
    const renderItems = (items: any[]) => {
        return items.map((item, index) => (
            <ScalePress
                onPress={() => navigate('ProductCategories')}
                key={index}
                style={styles.item}
            >
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <CustomText
                        style={styles.text}
                        varient="h8"
                        fontFamily={Fonts.Medium}
                        numberOfLines={2}
                    >
                        {item.name}
                    </CustomText>
                </View>
            </ScalePress>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>{renderItems(data)}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#E5F3F3',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        height: 40,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
    },
});

export default CategoryContainer;
