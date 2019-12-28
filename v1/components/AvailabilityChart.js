import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const AvailabilityChart = (props) => {
    const data = [
        {
            name: "Open Parking",
            Slots: parseInt(props.Open, 10),
            color: 'blue',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Occupied Parking",
            Slots: parseInt(props.Occupied, 10),
            color: 'red',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        }
    ]

    const chartConfig = {
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        //strokeWidth: 2, // optional, default 3
    }

    return (
        <PieChart
            data={data}
            width={Dimensions.get('window').width / 4.5}
            height={Dimensions.get('window').width / 4.5}
            chartConfig={chartConfig}
            accessor="Slots"
            backgroundColor="transparent"
            paddingLeft="30"
            hasLegend={false}
            absolute
        />
    )
}

export default AvailabilityChart;