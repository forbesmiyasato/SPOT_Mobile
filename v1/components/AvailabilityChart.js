import React, { useState } from 'react';
import { Text as InsideText, Dimensions, View, Platform } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';
import { Header } from 'react-navigation-stack';
import Colors from '../constants/Colors';

const height = Dimensions.get('window').height - Header.HEIGHT;
const width = Dimensions.get('window').width

const AvailabilityChart = (props) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const [labelHeight, setLabelHeight] = useState(0);

    const OpenParkings = parseInt(props.Open);
    const OccupiedParkings = parseInt(props.Total - props.Open);
    const TotalParkings = OpenParkings + OccupiedParkings;
    const percent = OpenParkings / TotalParkings * 100;
    const display = percent.toString() + "%";
    const data = [
        {
            key: 1,
            amount: props.Open,
            svg: { fill: Colors.primary },
        },
        {
            key: 2,
            amount: OccupiedParkings,
            svg: { fill: 'red' }
        }
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={15}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                </Text>
            )
        })
    }

    return (
        <>
        <PieChart
            style={{ height: props.height }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
        >

            <Labels />
        </PieChart> 
        <InsideText
            onLayout={({ nativeEvent: { layout: { width, height } } }) => {
                setLabelWidth(width);
                setLabelHeight(height);
            }}
            style={[props.style,
            {
                top: props.topPosition - labelHeight / 2,
                left: props.leftPosition - labelWidth / 2
            }]}>
            {display}
        </InsideText>
        </>
    )
}

export default AvailabilityChart;