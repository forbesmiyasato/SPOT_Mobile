import React from 'react';
import {View, Text} from 'react-native';
import {BarChart, Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {LinearGradient} from 'react-native-svg';
import * as scale from 'd3-scale'

const StatisticsChart = props => {

    console.log(props.data);
    const data = props.data;
    return (
        <View style={{ height: "100%", width: "100%", padding: 0 }}>
        <BarChart
            style={{ flex: 1 }}
            data={props.data}
            gridMin={0}
            svg={{ fill: 'rgb(134, 65, 244)' }}
        />
        <XAxis
            style={{ marginTop: 10 }}
            data={ props.data }
            scale={scale.scaleBand}
            formatLabel={ (value, index) => index }
            labelStyle={ { color: 'black' } }
        />
    </View>
    )

};

export default StatisticsChart;