import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Axios from 'axios';
import ListView from './ListView';

const DisplayScreen = props => {
    const [inputLocation, setInputLocation] = useState(props.navigation.getParam('location'));
    const [parkingLots, setParkingLots] = useState([]);

    useEffect(() => {
        var ParkingLots = [];
        Axios.get('http://10.0.2.2:5000/ParkingLot/All')
            .then(response => {
                response.data.map((ParkingLot) => {
                    var destination = `${ParkingLot.Lat}/${ParkingLot.Lng}`;
                    var origin = `${inputLocation.lat}/${inputLocation.lng}`

                    Axios.get(`http://10.0.2.2:5000/distancematrix/${origin}/${destination}`)
                        .then(response => {
                            ParkingLot["Distance"] = response.data.distance;
                            ParkingLot["Duration"] = response.data.duration;
                            ParkingLot["TimeUnit"] = response.data.unit;
                            Axios.get(`http://10.0.2.2:5000/ParkingLot/${ParkingLot._id}/SnapShots/latest`)
                                .then(response => {
                                    ParkingLot["OpenParkings"] = response.data;
                                })
                                .then (()=> {
                                    delete ParkingLot['SnapShots'];
                                    ParkingLots.push(ParkingLot);
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        })  
                        .catch(error => {
                            console.log(error);
                        })
                })
            })
            .catch(error => {
                console.log(error);
            })

            setParkingLots(ParkingLots);
    }, [])

    return (
        <ListView data={parkingLots}/>
    )
}

const styles = StyleSheet.create({

});

export default DisplayScreen;