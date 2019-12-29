import React from 'react';
import {
    TouchableOpacity, View, Text, StyleSheet,
    TouchableNativeFeedback, Platform, Dimensions, Image
} from 'react-native';
import { Header } from 'react-navigation-stack';
import FlipCard from 'react-native-flip-card';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import AvailabilityChart from '../components/AvailabilityChart';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - Header.HEIGHT;

const ListItem = props => {

    /*let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }*/

    const Occupied = props.data.TotalParkings - props.data.Availability;

    return (
        <FlipCard
            style={styles.gridItem}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
        >
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <Image source={{ uri: props.data.Image }} style={styles.image} />
                <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                    style={styles.linearGradientName}>
                    <Text style={styles.title} numberOfLines={1}>{props.data.Name.replace('<br/>', '\n')}</Text>
                </LinearGradient>
                <View style={styles.details}>
                    <View style={styles.detailsLeft}>
                        <Text style={styles.detailsHeader}>Open Parking:</Text>
                        <Text style={styles.detailsData}>{props.data.Availability}</Text>
                    </View>
                    <View style={styles.detailsRight}>
                        <Text style={styles.detailsHeader}>Distance:</Text>
                        <Text style={styles.detailsData}>{props.data.DistanceMatrix.distance}</Text>
                        <Text style={styles.detailsHeader}>Duration:</Text>
                        <Text style={styles.detailsData}>{props.data.DistanceMatrix.duration}</Text>
                        <Text style={styles.detailsData}>{props.data.DistanceMatrix.unit}</Text>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                    style={styles.linearGradientBackGround} />
                <View style={styles.backTop}>
                    <AvailabilityChart Open={props.data.Availability} Occupied={Occupied}/>
                </View>
                <View style={styles.backBottom}>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} fontSize={14} 
                        onPress={props.getDirection.bind(this, props.data.Lat, props.data.Lng)}>Get Directions</Button>
                        <Button style={styles.button} fontSize={14}>See Statistics</Button>
                    </View>
                </View>
            </View>
        </FlipCard>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: width / 30,
        height: (height - (width / 30 * 8)) / 3,
        borderRadius: 10,
        width: width * 0.43333
    },
    front: {
    },
    back: {
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        overflow: 'hidden'
    },
    detailsHeader: {
        textAlign: 'center',
        color: Colors.greyDark,
        fontWeight: 'bold'
    },
    detailsData: {
        color: Colors.greyDark
    },
    details: {
        flex: 1,
        flexDirection: 'row',
    },
    detailsLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        color: 'white',
    },
    image: {
        width: "100%",
        height: "50%",
        resizeMode: 'cover'
    },
    linearGradientName: {
        //padding: 5,
        height: '15%',
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        top: '35%',
        justifyContent: 'center'
    },
    linearGradientBackGround: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5
    },
    buttonContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: "center"
    },
    backTop: {
        flex: 1,
        justifyContent: 'center'
    },
    backBottom:{
        flex: 1,
        
    }
});

export default ListItem;