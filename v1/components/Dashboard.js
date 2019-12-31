import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryAxis } from "victory-native";
import victoryChart from "victory-native/lib/components/victory-chart";



const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

const Dashboard = props => {
    // console.log(props.data);
    // labels=['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
    // '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM',
    // '10 PM', '11 PM', '12 AM'];

    return (
        <View style={styles.container}>
            <VictoryChart
            domainPadding={{x: [20, 20]}} >
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
                    >
                    <VictoryBar
                        data={props.data} />
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