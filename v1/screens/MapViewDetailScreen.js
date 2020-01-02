import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Header } from 'react-navigation-stack';

const height = Dimensions.get('window').height - Header.HEIGHT;

const DetailScreen = (props) => {

    const data = props.navigation.getParam('data');

    return (
        <View style={styles.container}>
             <Image source={{ uri: data.Image }} style={styles.image}/>
        </View>
    )
}

DetailScreen.navigationOptions = (navData) => {

    return {
        headerTitle: navData.navigation.getParam('data').Name
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        width: "100%",
        height: height * 0.3
    }
});

export default DetailScreen;