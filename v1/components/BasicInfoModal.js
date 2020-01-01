import React, { useReducer } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Easing } from 'react-native'
import { Header } from 'react-navigation-stack';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.3;

const MapViewList = (props) => {
    const heightValue = new Animated.Value(0);


    Animated.timing(heightValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
    }).start();

    const ModalShift = heightValue.interpolate({
        inputRange: [0, 100],
        outputRange: [modalHeight, 0]
    })

    return (
        <Animated.View style={[styles.modal, { transform: [{ translateY: ModalShift }] }]} >
            <Text> test1111 </Text>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        height: modalHeight,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 2,
        // borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
});

export default MapViewList;
