import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ListScreen = props => {
    console.log(props.navigation.getParam('location'));
    return (
        <Text>Test</Text>
    )
}

const styles = StyleSheet.create({

});

export default ListScreen;