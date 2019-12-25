import React from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient'

const LandingScreen = () => {
    return (
        <View style={styles.container} >
            <ImageBackground source={require('../assets/LandingImage2.jpg')}
                style={{ width: '100%', height: '100%' }}>
                <LinearGradient colors={[Colors.radient1, Colors.radient2]} 
                style={styles.linearGradient} />
                 <Text> Open up App.js to start working on your app!</Text>
            </ImageBackground>
           

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
});

export default LandingScreen;