import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import Dashboard from '../components/Dashboard';

const StatisticsModal = props => {

    return (
        <Modal visible={props.show}
            transparent={true}
        >
            <View
                style={styles.modal}>
                    <Dashboard parkingLotID={props.parkingLotID}/>
                <Button onPress={props.closeModal} title="Close" />
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: '20%',
        left: '2.5%',
        width: "95%",
        height: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        margin: 0,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    }
});
export default StatisticsModal;
