import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, Animated, Dimensions, 
    TouchableWithoutFeedback, Keyboard, Easing, KeyboardAvoidingView} from 'react-native';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Button from '../components/Button';
import Text from '../components/LatoText';
import Config from '../config';
import LocationSearchBar from '../components/LocationSearchBar';

const width = Dimensions.get('window').width;


const LandingScreen = (props) => {

    var textValue = new Animated.Value(0);
    var buttonMove = new Animated.Value(0);
    var buttonAnimatedOpacity = new Animated.Value(0);

    Animated.timing(buttonAnimatedOpacity, {
        toValue: 1,
        duration: 1250,
        easing: Easing.ease
    }).start();

    Animated.timing(buttonMove, {
        toValue: 1,
        duration: 500,
        delay: 750,
        easing: Easing.ease
    }).start();

    Animated.timing(textValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease
    }).start();

    const buttonOpacity = buttonAnimatedOpacity.interpolate({
        inputRange: [0, 0.75, 1],
        outputRange: [0, 0, 1]
    })

    const textOpacity = textValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const translationUpY = buttonMove.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    })
    const translationRightX = textValue.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [100, -20, 0]
    })

    const translationLeftX = textValue.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [-100, 20, 0]
    })

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <KeyboardAvoidingView style={styles.container}
                behavior="height" >
                <ImageBackground source={require('../assets/LandingImage2.jpg')}
                    style={{ width: '100%', height: '100%' }}>
                    <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                        style={styles.linearGradient} />
                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>S<FontAwesome name="product-hunt" size={30} />OT</Text>
                    </View>
                    <View style={styles.headerBox}>
                        <Animated.View style={{ opacity: textOpacity, transform: [{ translateX: translationLeftX }] }}>
                            <Text style={styles.headerMain}> SPOT </Text>
                        </Animated.View>
                        <Animated.View style={{ opacity: textOpacity, transform: [{ translateX: translationRightX }] }}>
                            <View style={styles.headerSubContainer}>
                                <Text style={styles.headerSub}>Single Parking Observation Tool</Text>
                            </View>
                        </Animated.View>
                        <LocationSearchBar navigation={props.navigation} />
                        <Animated.View style={{ opacity: buttonOpacity, transform: [{ translateY: translationUpY }] }}>
                            <Button style={styles.button}><Text>Current Location <Entypo name="location" size={20} /></Text></Button>
                        </Animated.View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback>
    );
}

LandingScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: "5%",
        left: "5%",
    },
    logo: {
        fontSize: 30,
        color: Colors.white
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    headerBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerMain: {
        color: Colors.white,
        fontSize: width / 6,
        letterSpacing: width / 15
    },
    headerSubContainer: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    headerSub: {
        color: Colors.white,
        fontSize: width / 17,
    },
    locationInput: {
        marginTop: width / 20,
        marginBottom: width / 10
    },
    button: {
    }
});

export default LandingScreen;