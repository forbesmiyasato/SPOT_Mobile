import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation-stack';
import BarChart from '../components/Dashboard';
import DonutChart from '../components/AvailabilityChart';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height - Header.HEIGHT;

const DetailScreen = (props) => {
    const data = props.navigation.getParam('data');
    const getDirection = props.navigation.getParam('getDirection');
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={{ uri: data.Image }} style={styles.image} />
                <View style={styles.featuresContainer}>
                    <View style={styles.features}><Text>Open Parkings</Text>
                        <Text>{data.Availability}</Text></View>
                    <View style={styles.features}><Text>Distance</Text>
                        <Text>{data.DistanceMatrix.distance}</Text>
                        <Text>miles</Text></View>
                    <View style={styles.features}><Text>Time Duration</Text>
                        <Text>{data.DistanceMatrix.duration}</Text>
                        <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit>
                            {data.DistanceMatrix.unit}</Text></View>
                    <TouchableOpacity style={styles.features}
                    onPress={getDirection(data.Lat, data.Lng)}>
                        <View style={styles.directions}>
                            <Text style={styles.directionsText}>Get Directions</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <BarChart parkingLotID={data._id} />
                <DonutChart style={styles.availabilityChart}
                    Open={data.Availability} Total={data.TotalParkings}
                    topPosition={200 / 2}
                    leftPosition={width / 2}
                    height={200} />
            </View>
        </ScrollView>
    )
}

DetailScreen.navigationOptions = (navData) => {

    return {
        headerTitle: navData.navigation.getParam('data').Name
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    featuresContainer: {
        flexDirection: 'row',
        height: "10%"
    },
    features: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.greyLight,
        borderRightWidth: 0.5,
    },
    directions: {
        backgroundColor: '#2196F3',
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    directionsText: {
        color: 'white'
    },
    image: {
        width: "100%",
        height: height * 0.3
    },
    availabilityChart: {
        position: 'absolute',
        // top: (height - (width / 30 * 8)) / 3 / 4 - labelHeight,
        // left: (width * 0.43333 / 2) - labelWidth / 2,
        textAlign: 'center',
        color: Colors.greyDark
    }
});

export default DetailScreen;