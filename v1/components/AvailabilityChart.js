import React, { useState } from 'react';
import { Text as InsideText, Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';
import { Header } from 'react-navigation-stack';
import Colors from '../constants/Colors';

const deviceHeight = Dimensions.get('window').height - Header.HEIGHT;
const deviceWidth = Dimensions.get('window').width

const AvailabilityChart = (props) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const [labelHeight, setLabelHeight] = useState(0);
    //console.log(props);
    const data = [
        {
            key: 1,
            amount: props.Open,
            svg: { fill: Colors.primary },
        },
        {
            key: 2,
            amount: props.Occupied,
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

    //calculate open parking percentage to display
    const OpenParkings = parseInt(props.Open);
    const OccupiedParkings = parseInt(props.Occupied);
    const TotalParkings = OpenParkings + OccupiedParkings;
    const percent = OpenParkings / TotalParkings * 100;
    const display = percent.toString() + "%";

    return (
        <PieChart
            style={{ height: "80%" }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
        >
            <InsideText
                onLayout={({ nativeEvent: { layout: { width, height } } }) => {
                    setLabelWidth(width);
                    setLabelHeight(height);
                }}
                style={{
                    position: 'absolute',
                    top: (deviceHeight - (deviceWidth / 30 * 8)) / 3 / 4 - labelHeight,
                    left: (deviceWidth * 0.43333 / 2) - labelWidth / 2,
                    textAlign: 'center',
                    color: Colors.greyDark
                }}>{display}</InsideText>
            <Labels />
        </PieChart>
    )
}

export default AvailabilityChart;