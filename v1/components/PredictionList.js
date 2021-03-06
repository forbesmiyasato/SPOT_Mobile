import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Keyboard, Image, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;

const PredictionList = props => {

    /*To handle whether keyboard is visible, important because we don't want to render the list 
      if keyboard is visible*/
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    //The list of predictions returned from API
    const list = (
        props.predictions.map((prediction, i) => {
            return (
                <TouchableHighlight key={prediction.id} 
                onPress={props.onPress.bind(this, prediction.place_id)}>
                    <View style={(i === props.predictions.length - 1 ? //Only last prediction needs border bottom
                            { ...styles.textContainer, borderBottomWidth: 1 }
                            : styles.textContainer)}>
                        <Text style={styles.mainText}>
                            {prediction.structured_formatting.main_text}
                        </Text>
                        <Text style={styles.subText}>
                            {prediction.structured_formatting.secondary_text}
                        </Text>
                    </View>
                </TouchableHighlight>
            )
        }))

    //if keyboard isn't visible we don't render the list. Google logo is necessary due to Google policies. 
    return (
        <View style={{ ...styles.list, ...props.style }}>
            {isKeyboardVisible && props.predictions.length > 0 ? list : null}
            {isKeyboardVisible && props.predictions.length > 0 ?
                <View style={styles.google}>
                    <Image source={require('../assets/powered_by_google_on_white.png')} />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'white',
        borderColor: Colors.greyDark,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
    },
    mainText: {
        color: Colors.greyDark,
        fontWeight: 'bold',
        fontSize: width / 30,
    },
    subText: {
        color: Colors.greyDark,
        fontSize: width / 35,
    },
    list: {
        position: 'relative',
    },
    google: {
        backgroundColor: 'white',
    }
});

export default PredictionList;