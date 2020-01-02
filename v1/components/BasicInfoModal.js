import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Easing, Image } from 'react-native'
import { Header } from 'react-navigation-stack';
import { Scale } from 'victory-native';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.3;

const heightValue = new Animated.Value(0);
const MapViewList = (props) => {

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
            <Image source={{ uri: props.data.Image }} style={styles.image}
                resizeMode={"cover"} />
            <Text> {props.data.Name} </Text>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'row',
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
    image: {
        width: "50%",
        height: "64%",
        resizeMode: 'cover',
    },

});

export default MapViewList;
