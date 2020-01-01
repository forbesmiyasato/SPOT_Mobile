import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Map from '../components/Map';

const MapView = (props) => {
    return (
        <View>
            <Map data={props.data}/>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default MapView;