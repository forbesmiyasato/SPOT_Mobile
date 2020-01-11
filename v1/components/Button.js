import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

//Custom button, configurable externally
const Button = props => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={[styles.buttonText, {fontSize: props.fontSize}]}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: Colors.greyDark,
    }
});

export default Button;
