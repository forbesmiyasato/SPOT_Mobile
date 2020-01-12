import React, {useState} from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import RadioButton from '../components/RadioButton';

const OptionsModal = props => {
    const [sortAvailability, setSortAvailability] = useState(false);
    const [sortDistance, setSortDistance] = useState(false);

    const sortAvailabilityClicked = () => {
        setSortAvailability(current => !current);
        setSortDistance(false);
    } 

    const sortDistanceClicked = () => {
        setSortDistance(current => !current);
        setSortAvailability(false);
    }

    const saveClicked = () => {
        if(sortAvailability) {
            props.handleSortByAvailability();
            console.log("Sort By Availability")
        }

        if(sortDistance) {
            props.handleSortByDistance();
            console.log("Sort By Distance")
        }

        props.closeModal();
    }

    return (
        <Modal visible={props.show}
            transparent={true}
        >
            <View
                style={styles.modal}>
                  <RadioButton selected={sortAvailability} onPress={sortAvailabilityClicked}/>
                  <RadioButton selected={sortDistance} onPress={sortDistanceClicked}/>
                  <Button onPress={props.closeModal} title="Close" />
                  <Button onPress={saveClicked} title="Save" />
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
export default OptionsModal;
