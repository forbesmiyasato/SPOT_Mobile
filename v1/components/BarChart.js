import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import * as scale from 'd3-scale'
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    fillShadowGradient: Colors.primary,
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => Colors.greyDark,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.3,
    decimalPlaces: 2
};
const StatisticsChart = props => {

    const data = {
        labels: ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
            '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM',
            '10 PM', '11 PM', '12 AM'],
        datasets: [
            {
                data: props.data
            }
        ]
    };

    return (
        <BarChart data={data} width={width * 0.9} height={height * 0.4}
            chartConfig={chartConfig} verticalLabelRotation={30}
            fromZero={true} withInnerLines={true}
            style={styles.graphStyle}/>
    )

};

const styles = StyleSheet.create({
    graphStyle: {
        
    }
})
//formatLabel={(value, index) => (index + 1) - 12 > 0 ? (index - 11) + 'pm' : (index + 1) + 'am'}
export default StatisticsChart;