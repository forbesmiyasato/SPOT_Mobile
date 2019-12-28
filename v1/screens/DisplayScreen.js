import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Axios from 'axios';
import ListView from './ListView';


const baseUrl = Platform.OS === 'ios' ? 'https://bfedbd1c.ngrok.io/' : 'http://10.0.2.2:5000/';
const DisplayScreen = props => {
    const [inputLocation, setInputLocation] = useState(props.navigation.getParam('location'));
    const [parkingLots, setParkingLots] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParkingLots = async () => {
            var ParkingLots = [];
            console.log("Start fetch");
            try {
                const returnedParkingLots = await Axios.get(`${baseUrl}ParkingLot/All`);
                ParkingLots = returnedParkingLots.data;
            } catch (error) {
                console.log("fetch parking lots error:", error);
            }
            console.log("Done fetching parking lots");

            try {
                const results = await Promise.all(ParkingLots.map(async (ParkingLot, i) => {
                    var destination = `${ParkingLot.Lat}/${ParkingLot.Lng}`;
                    var origin = `${inputLocation.lat}/${inputLocation.lng}`;
                    const availability = await Axios.get(`${baseUrl}ParkingLot/${ParkingLot._id}/SnapShots/latest`);
                    const distanceMatrix = await Axios.get(`${baseUrl}distancematrix/${origin}/${destination}`);
                    ParkingLots[i]["Availability"] = availability.data;
                    ParkingLots[i]["DistanceMatrix"] = distanceMatrix.data;
                    return Promise.resolve(1);
                }))
            } catch (error) {
                console.log("fetch details error", error)
            }

            setParkingLots(ParkingLots);
        }

        fetchParkingLots();
    }, [])

    console.log(parkingLots);

    return (
        <ListView data={parkingLots} />
    )
}

const styles = StyleSheet.create({

});

export default DisplayScreen;