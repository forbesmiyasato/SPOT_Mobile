import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback, Platform, Dimensions } from 'react-native';
import { Header } from 'react-navigation-stack';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - Header.HEIGHT;

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21)
    {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
        <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
            <View style={{...styles.container, ...{backgroundColor: props.color}}}>
                <Text style={styles.title} numberOfLines={2}>{props.data.Name}</Text>
            </View>
        </TouchableCmp>
        </View>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 0.5,
        margin: width / 30,
        height: (height - (width / 30 * 8)) / 3,
        borderRadius: 10,
        maxWidth: "43.333%"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 22,
        textAlign: 'right'
    }
});

export default CategoryGridTile;