import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import PredictionList from './PredictionList';
import LocationInput from './LocationInput';
import Colors from '../constants/Colors';
import Config from '../config';

const width = Dimensions.get('window').width;

   //Generate unique session token to reduce request cost 
        //(Formulate from "https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/324")
const createPlacesAutocompleteSessionToken = (a) => {
        return a
            ? (a ^ Math.random() * 16 >> a / 4).toString(16)
            : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, createPlacesAutocompleteSessionToken);
    };

const LocationSearchBar = props => {
    const [predictions, setPredictions] = useState([]);
    const [sessionToken, setSessionToken] = useState(createPlacesAutocompleteSessionToken());

    //may not be necesary
    useEffect(() => {
        setSessionToken(createPlacesAutocompleteSessionToken());
    }, [])


    async function onLocationChange(inputLocation) {
        const AUTOCOMPLETE_API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=
        ${inputLocation}&key=${Config.GOOGLE_API}&sessiontoken=${sessionToken}&components=country:us`;
        try {
            const result = await fetch(AUTOCOMPLETE_API_URL);
            const json = await result.json();
            const predictions = json.predictions.slice(0, 3);
            setPredictions(predictions);
        } catch (err) {
            console.log(err);
        }
    };

    const onSelectLocation = (selectedLocation) => {
        const DETAILS_API_URL = `https://maps.googleapis.com/maps/api/place/details/json?key=
        ${Config.GOOGLE_API}&place_id=${selectedLocation}&sessiontoken=${sessionToken}&fields=geometry`

        fetch(DETAILS_API_URL).then((response) => {
            return response.json()
        }).then((responseJson) => {
            return (
                props.navigation.navigate({
                    routeName: 'DisplayScreen', params: {
                        location: responseJson.result.geometry.location
                    }
                })
            );
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <View>
            <LocationInput style={styles.locationInput}
                iconColor={Colors.primary}
                placeholderColor={Colors.greyDark}
                onChangeInput={onLocationChange} />
            <PredictionList onPress={onSelectLocation} style={styles.list} predictions={predictions} />
        </View>
    )
}

const styles = StyleSheet.create({
    locationInput: {
        marginTop: width / 20,
    },
    list: {
        marginBottom: width / 10
    }
});

export default LocationSearchBar;