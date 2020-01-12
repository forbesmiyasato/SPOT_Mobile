import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

//Thanks to Lane Rettig from https://stackoverflow.com/questions/31889921/how-to-implement-radio-button-in-react-native
//For the implementation 
const RadioButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    );
}

export default RadioButton;