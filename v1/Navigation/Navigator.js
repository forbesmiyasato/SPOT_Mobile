import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from '../screens/LandingScreen';
import DisplayScreen from '../screens/DisplayScreen';

const ScreenNavigator = createStackNavigator({
    LandingScreen: {screen: LandingScreen},
    DisplayScreen: {screen: DisplayScreen}
})

export default createAppContainer(ScreenNavigator);