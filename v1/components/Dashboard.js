import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryAxis } from "victory-native";
import Colors from '../constants/Colors';
import Axios from 'axios';

const baseUrl = Platform.OS === 'ios' ? 'https://e935b714.ngrok.io/' : 'http://10.0.2.2:5000/';

const Dashboard = props => {
    const [lowestArray, setLowestArray] = useState([]);
    const [extraForHighest, setExtraForHighest] = useState([]);
    const [extraForAverage, setExtraForAverage] = useState([]);


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

            const TempExtraHighest = new Array(24);
            const TempExtraAverage = new Array(24);

            averagePerHour.map((data, i) => {
                TempExtraHighest[i] = highestPerHour[i].y - data.y;
                TempExtraAverage[i] = data.y - lowestPerHour[i].y;
            })

            setExtraForHighest(TempExtraHighest);
            setExtraForAverage(TempExtraAverage);
            setLowestArray(lowestPerHour);
        }

        getData();

        console.log("Bar Chart Did Mount")
    }, [])

    return (
        <View style={styles.container}>
            <VictoryChart
                domainPadding={{ x: [20, 20] }} >
                <VictoryAxis
                    label="Time"
                    tickValues={['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
                        '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM',
                        '10 PM', '11 PM', '12 AM']}
                    style={{ tickLabels: { fontSize: 7, angle: 45 } }}
                />
                <VictoryAxis
                    dependentAxis
                    label="Parking Availability"
                    style={{
                        axis: { stroke: "black" },
                        tickLabels: { fill: "black" }
                    }}
                />
                <VictoryStack
                    colorScale={[Colors.primaryLight, Colors.primary, Colors.primaryDark]}
                >
                    <VictoryBar
                        data={lowestArray} />
                    <VictoryBar
                        data={extraForAverage} />
                    <VictoryBar
                        data={extraForHighest} />
                </VictoryStack>
            </VictoryChart>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
        width: "100%",
        paddingLeft: 40
    }
});

export default Dashboard;