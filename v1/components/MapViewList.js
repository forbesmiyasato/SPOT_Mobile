import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native'
import { Header } from 'react-navigation-stack';

const headerHeight = Header.HEIGHT;  
const screenHeight = Dimensions.get('window').height;

const MapViewList = (props) => {

    return (
        <Modal visible={props.show}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modal}>
        <Text> test </Text>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 0,
        height: screenHeight - headerHeight,
        width: "100%",
        position: 'absolute',
        bottom: '0%',
        left: '0%',
        backgroundColor: 'white'
    }
});

export default MapViewList;
