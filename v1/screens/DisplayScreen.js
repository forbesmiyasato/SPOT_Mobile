import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, Platform, Button } from 'react-native';
import Axios from 'axios';
import ListView from './ListView';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Directions from 'react-native-google-maps-directions';
import ToggleSwitch from 'rn-toggle-switch';
import MapView from './MapView';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/CustomHeaderButton';
import OptionsModal from '../components/OptionsModal';
import { Header } from 'react-navigation-stack';
import Config from '../config';

const HeaderHeight = Header.HEIGHT;
//iOS baseURL changes everytime launching via Ngrok
const baseUrl = Platform.OS === 'ios' ? `${Config.REACT_APP_IOS_BASE_URL}/` : `${Config.REACT_APP_OTHER_BASE_URL}/`;

const DisplayScreen = (props) => {
    const [inputLocation, setInputLocation] = useState(props.navigation.getParam('location'));
    const [parkingLots, setParkingLots] = useState([]);
    const [toggleView, setToggleView] = useState(false); //false - list, true - map
    const [showOptions, setShowOptions] = useState(false);
    const [filteredList, setFilteredList] = useState();
    //Fetch data from backend once the component mounts
    useEffect(() => {
        const fetchParkingLots = async () => {
            var ParkingLots = [];
            console.log("Start fetch");
            console.log(Config.REACT_APP_OTHER_BASE_URL);
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

        props.navigation.setParams({ switchClicked: handleButtonToggle, optionClicked: handleOptionsClicked })
    }, [])

    //When the toggle button is clicked
    const handleButtonToggle = () => {
        setToggleView((current) => !current);
    }

    //----Options Section-----//
    //Hides options on map, and shows options on list
    useEffect(() => {
        props.navigation.setParams({ hideOption: toggleView });
    }, [toggleView])

    const handleOptionsClicked = () => {
        setShowOptions(true);
    }

    const handleOptionsClose = () => {
        setShowOptions(false);
    }

    const handleSortByAvailability = () => {
        setParkingLots(parkingLots.sort(function (a, b) {
            return b.Availability - a.Availability;
        }));
    }

    const handleSortByDistance = () => {
        setParkingLots(parkingLots.sort(function (a, b) {
            return a.DistanceMatrix.distance - b.DistanceMatrix.distance;
        }));
        console.log("Called");
    }

    const handleFilterByAvailability = () => {
        setFilteredList(parkingLots.filter(parkingLot => parkingLot.Availability > 10));
    }

    const handleFilterByDistance = (distance) => {
        if (distance === 0) {
            distance = 2147483647; //if within 0 miles then return all parking lots (within distance doesn't take effect)
        }
        setFilteredList(parkingLots.filter(parkingLot => parkingLot.DistanceMatrix.distance < distance));
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

    return (
        <ImageBackground source={require('../assets/ShowPageImage.jpg')}
            style={{ width: '100%', height: '100%' }}>
            <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                style={styles.linearGradient} />
            <OptionsModal show={showOptions} closeModal={handleOptionsClose}
                handleSortByAvailability={handleSortByAvailability}
                handleSortByDistance={handleSortByDistance}
                handleFilterByAvailability={handleFilterByAvailability}
                handleFilterByDistance={handleFilterByDistance}/>
            {toggleView
                ? <MapView data={parkingLots} navigation={props.navigation} initialLocation={inputLocation}
                getDirection={handleGetDirection} />
                : <ListView data={filteredList? filteredList : parkingLots} getDirection={handleGetDirection} />
            }
        </ImageBackground>
    )
}

DisplayScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Parking Lots",
        headerRight:
            <>
                {navData.navigation.getParam('hideOption') ? null :
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title="Options"
                            iconName='ios-options'
                            onPress={() => { navData.navigation.getParam('optionClicked')() }} />
                    </HeaderButtons>
                }
                <ToggleSwitch
                    text={{ on: 'List', off: 'Map', activeTextColor: 'white', inactiveTextColor: 'white' }}
                    textStyle={{ fontWeight: 'bold' }}
                    color={{
                        indicator: 'white', active: Colors.primaryLight, inactive: Colors.primaryDark,
                        activeBorder: Colors.primaryLight, inactiveBorder: Colors.primaryDark
                    }}
                    active={true}
                    disabled={false}
                    width={50}
                    radius={20}
                    onValueChange={() => { navData.navigation.getParam('switchClicked')() }}
                />

            </>

    };
};

console.log(HeaderHeight);

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