import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from '../screens/LandingScreen';
import DisplayScreen from '../screens/DisplayScreen';
import DetailScreen from '../screens/MapViewDetailScreen';

const ScreenNavigator = createStackNavigator({
    LandingScreen: {screen: LandingScreen},
    DisplayScreen: {screen: DisplayScreen},
    DetailScreen: {screen: DetailScreen}
})

export default createAppContainer(ScreenNavigator);