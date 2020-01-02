import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Header } from 'react-navigation-stack';
import BarChart from '../components/Dashboard';
import DonutChart from '../components/AvailabilityChart';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height - Header.HEIGHT;

const DetailScreen = (props) => {

    const data = props.navigation.getParam('data');

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={{ uri: data.Image }} style={styles.image} />
                <BarChart parkingLotID={data._id} />
                <DonutChart style={styles.availabilityChart} 
        Open={data.Availability} Total={data.TotalParkings} 
        topPosition={(height - (width / 30 * 8)) / 3 / 4}
        leftPosition={(width * 0.43333 / 2)}/>
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