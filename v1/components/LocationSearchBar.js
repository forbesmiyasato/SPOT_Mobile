import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import PredictionList from './PredictionList';
import LocationInput from './LocationInput';
import Colors from '../constants/Colors';
import Config from '../config';

const width = Dimensions.get('window').width;



const LocationSearchBar = props => {
    const [predictions, setPredictions] = useState([]);

    async function onLocationChange(inputLocation) {
        console.log(inputLocation);
        console.log(Config.GOOGLE_API);
        const API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputLocation}&key=${Config.GOOGLE_API}&sessiontoken=1234567890`;
        console.log(API_URL);
        try {
            console.log(API_URL);
            const result = await fetch(API_URL);
            const json = await result.json();
            setPredictions(json.predictions);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            <LocationInput style={styles.locationInput}
                iconColor={Colors.primary}
                placeholderColor={Colors.greyDark}
                onChangeInput={onLocationChange} />
            <PredictionList predictions={predictions} />
        </View>
    )
}

const styles = StyleSheet.create({
    locationInput: {
        marginTop: width / 20,
        marginBottom: width / 10
    }
});

export default LocationSearchBar;