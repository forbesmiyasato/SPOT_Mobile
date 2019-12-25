import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PredictionList = props => {
    const list = (
        props.predictions.map(prediction => {
            console.log(prediction.description);
            return <Text style={styles.text} key={prediction.id}>{prediction.description}</Text>
        })
    )
    return (
        <View>
            {list}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 20
    }
});

export default PredictionList;