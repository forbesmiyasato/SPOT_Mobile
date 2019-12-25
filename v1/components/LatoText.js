import React from 'react';
import {Text, StyleSheet} from 'react-native';

const LatoText = (props) => {
    return (
        <Text style={{...styles.font, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'lato',
        fontWeight: '200'
    }
})

export default LatoText;