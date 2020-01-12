import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import RadioButton from '../components/RadioButton';
import Colors from '../constants/Colors';
import Slider from 'react-native-slider';

const OptionsModal = props => {
    const [sortAvailability, setSortAvailability] = useState(false);
    const [sortDistance, setSortDistance] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const [slideValue, setSlideValue] = useState(0);
    
    const sortAvailabilityClicked = () => {
        setSortAvailability(current => !current);
        setSortDistance(false);
    }

    const sortDistanceClicked = () => {
        setSortDistance(current => !current);
        setSortAvailability(false);
    }

    const saveClicked = () => {
        if (sortAvailability) {
            console.log("Sort By Availability")
            props.handleSortByAvailability();

        }

        if (sortDistance) {
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
                <Text style={styles.title}>Sort By:</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Availability</Text>
                    <RadioButton selected={sortAvailability} onPress={sortAvailabilityClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Distance</Text>
                    <RadioButton selected={sortDistance} onPress={sortDistanceClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <Text style={styles.title}>Filter By:</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Availability</Text>
                    <RadioButton selected={sortDistance} onPress={sortDistanceClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <Text>{slideValue}</Text>
                <Slider
                    step={1}
                    maximumValue={100}
                    value={slideValue}
                    onSlideStart={() => {
                        setIsSliding(true);
                    }}
                    onSlideComplete={() => {
                        setIsSliding(false);
                    }}
                    onValueChange={val => {
                        setSlideValue(val);
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button color='grey' onPress={props.closeModal} title="Close" />
                    <Button onPress={saveClicked} title="Save" />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: "50%",
        height: "50%",
        // justifyContent: 'center',
        padding: 5,
        backgroundColor: 'white',
        margin: 0,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: "30%"
    },
    text: {
        color: Colors.primary,
        fontSize: 20
    },
    title: {
        color: Colors.primaryDark,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
export default OptionsModal;
