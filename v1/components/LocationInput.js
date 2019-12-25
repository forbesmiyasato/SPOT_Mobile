import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScreenWidth = Dimensions.get('window').width;

const LocationInput = (props) => {
    return (
        <View style={{...styles.inputContainer, ...props.style }}>
            <TextInput placeholderTextColor={props.placeholderColor} placeholder='Enter Location' style={styles.searchBar} /> 
            <Ionicons style={styles.searchIcon} name="ios-search" size={30} color={props.iconColor} />
        </View>
        )
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: ScreenWidth * 0.65,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    searchBar: {
        padding: 10,
        flex: 1
    },
    searchIcon: {
        marginRight: 10
    }
});

export default LocationInput;

