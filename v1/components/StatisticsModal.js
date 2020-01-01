import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import Axios from 'axios';
import Dashboard from '../components/Dashboard';

//iOS baseURL changes everytime launching via Ngrok
const baseUrl = Platform.OS === 'ios' ? 'https://e935b714.ngrok.io/' : 'http://10.0.2.2:5000/';

const StatisticsModal = props => {
    const [averageArray, setAverageArray] = useState([]);
    const [highestArray, setHighestArray] = useState([]);
    const [lowestArray, setLowestArray] = useState([]);
    const [canRenderDashboard, setCanRenderDashboard] = useState(false)
    useEffect(() => {
        const fetchStatistics = async () => {
            console.log("fetching parking lot statistics");
            const results = await Axios.get(`${baseUrl}ParkingLot/${props.parkingLotID}/SnapShots/All`);

            console.log("done fetching parking lot statistics");
            return results.data;
        }

        const getData = async () => {
            const results = await fetchStatistics().then((result) => {
                return result;
            });

            var hour;
            var totalPerHour = new Array(24).fill(0);
            var countPerHour = new Array(24).fill(0);
            var averagePerHour = new Array(24);
            var highestPerHour = new Array(24).fill({ x: 0, y: 0 });
            var lowestPerHour = new Array(24).fill({ x: 0, y: 100 });
            var highest;
            var lowest;
            results.map((data) => {
                var utcTime = data.timestamp;
                hour = parseInt(utcTime.substring(11, 13)) - 7 < 0 ?
                    parseInt(utcTime.substring(11, 13)) - 7 + 24 :
                    parseInt(utcTime.substring(11, 13)) - 7;
                var openParkings = parseInt(data.OpenParkings);
                hour--;
                if (hour === -1) {
                    hour = 23;
                }
                totalPerHour[hour] += openParkings;
                countPerHour[hour]++;
                var average = { x: hour, y: parseFloat((totalPerHour[hour] / countPerHour[hour]).toFixed(2)) }
                if (openParkings > highestPerHour[hour].y) {
                    highest = { x: hour, y: openParkings };
                    highestPerHour[hour] = highest;
                }
                if (openParkings < lowestPerHour[hour].y) {
                    lowest = { x: hour, y: openParkings };
                    lowestPerHour[hour] = lowest;
                }
                averagePerHour[hour] = average;
            })
            setAverageArray(averagePerHour);
            setHighestArray(highestPerHour);
            setLowestArray(lowestPerHour);
            setCanRenderDashboard(true);
        }

        getData();
    }, [])
    return (
        <Modal visible={props.show}
            transparent={true}
        >
            <View
                style={styles.modal}>
                {canRenderDashboard ? 
                    <Dashboard average={averageArray} highest={highestArray} lowest={lowestArray} />
                    : null
                }
                <Button onPress={props.closeModal} title="Close" />
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: '20%',
        left: '2.5%',
        width: "95%",
        height: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        margin: 0,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    }
});
export default StatisticsModal;
