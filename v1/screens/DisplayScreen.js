import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Axios from 'axios';

const DisplayScreen = props => {
    console.log(props.navigation.getParam('location'));
    const [inputLocation, setInputLocation] = useState();
    const [parkingLots, setParkingLots] = useState([]);

    useEffect(() => {
       Axios.get('http://10.0.2.2:5000/ParkingLot/All')
            .then(response => {
                console.log(response)
            })
            .catch (error => {
                console.log(error);
            })

    }, [])


    return (
        <Text>Test</Text>
    )
}

const styles = StyleSheet.create({

});

export default DisplayScreen;