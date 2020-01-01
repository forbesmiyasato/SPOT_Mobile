import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, Platform, Button } from 'react-native';
import Axios from 'axios';
import ListView from './ListView';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Directions from 'react-native-google-maps-directions';
import ToggleSwitch from 'rn-toggle-switch';
import MapView from './MapView';

//iOS baseURL changes everytime launching via Ngrok
const baseUrl = Platform.OS === 'ios' ? 'https://e935b714.ngrok.io/' : 'http://10.0.2.2:5000/';
const DisplayScreen = (props) => {
    const [inputLocation, setInputLocation] = useState(props.navigation.getParam('location'));
    const [parkingLots, setParkingLots] = useState([]);
    const [toggleView, setToggleView] = useState(false); //false - list, true - map

    //When the toggle button is clicked
    const handleButtonToggle = () => {
        setToggleView((current) => !current);
    }
    //When get direction button is clicked in both the list and map view
    const handleGetDirection = (destinationLat, destinationLng) => {
        const DirectionData = {
            source: {
                latitude: inputLocation.lat,
                longitude: inputLocation.lng
            },
            destination: {
                latitude: destinationLat,
                longitude: destinationLng
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ]
        }
        Directions(DirectionData);
    }

    //Fetch data from backend once the component mounts
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

        props.navigation.setParams({switchClicked : handleButtonToggle})
    }, [])

    // console.log(parkingLots);

    return (
        <ImageBackground source={require('../assets/ShowPageImage.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                style={styles.linearGradient} />
            {toggleView
                ? <MapView data={parkingLots}/>
                : <ListView data={parkingLots} getDirection={handleGetDirection} />
            }
        </ImageBackground>
    )
}

DisplayScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Parking Lots",
        headerRight:
            <ToggleSwitch
                text={{ on: 'List', off: 'Map', activeTextColor: 'white', inactiveTextColor: 'white' }}
                textStyle={{ fontWeight: 'bold' }}
                color={{ indicator: 'white', active: Colors.primaryLight, inactive: Colors.primaryDark, 
                activeBorder: Colors.primaryLight, inactiveBorder: Colors.primaryDark }}
                active={true}
                disabled={false}
                width={50}
                radius={25}
                onValueChange={() => {navData.navigation.getParam('switchClicked')()}}
            />
    };
};

const styles = StyleSheet.create({
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
});

export default DisplayScreen;