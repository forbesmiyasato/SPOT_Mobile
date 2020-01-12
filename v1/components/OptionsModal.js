import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import RadioButton from '../components/RadioButton';
import Colors from '../constants/Colors';
import Slider from 'react-native-slider';

const OptionsModal = props => {
    const [sortAvailability, setSortAvailability] = useState(false);
    const [sortDistance, setSortDistance] = useState(false);
    const [filterAvailability, setFilterAvailability] = useState(false);
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

    const filterAvailabilityClicked = () => {
        setFilterAvailability(current => !current);
    }

    const saveClicked = () => {
        if (sortAvailability) {
            console.log("Sort By Availability")
            props.handleSortByAvailability();

        }

        if (sortDistance) {
            console.log("Sort By Distance")
            props.handleSortByDistance();
            
        }

        if (filterAvailability) {
            console.log("Filter By Availability")
            props.handleFilterByAvailability();
        }

        if (slideValue >= 0) {
            console.log("Within Distance:", slideValue);
            props.handleFilterByDistance(slideValue);
        }

        props.closeModal();
    }

    return (
        <Modal visible={props.show}
            transparent={true}
        >
            <View style={styles.background}></View>
            <View
                style={styles.modal}>
                <Text style={styles.title}>Sort By:</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Availability  </Text>
                    <RadioButton selected={sortAvailability} onPress={sortAvailabilityClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Distance  </Text>
                    <RadioButton selected={sortDistance} onPress={sortDistanceClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <Text style={styles.title}>Filter By:</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Availability  </Text>
                    <RadioButton selected={filterAvailability} onPress={filterAvailabilityClicked}
                        borderColor={Colors.primary} selectedColor={Colors.primary} />
                </View>
                <View style={{alignItems: 'center'}}>
                <Text style={styles.within}> Within <Text style={{color: Colors.primaryDark}}>{slideValue}</Text> miles</Text>
                </View>
                <Slider
                    step={1}
                    maximumValue={100}
                    value={slideValue}
                    // onSlideStart={() => {
                    //     setIsSliding(true);
                    // }}
                    // onSlideComplete={() => {
                    //     setIsSliding(false);
                    // }}
                    onValueChange={val => {
                        setSlideValue(val);
                    }}
                    thumbTintColor={Colors.primary}
                    minimumTrackTintColor={Colors.primaryLight}
                    maximumTrackTintColor={Colors.primaryDark}
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
    background: {
        backgroundColor: 'rgba(100,100,100, 0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    modal: {
        position: 'absolute',
        top: '30%',
        left: '25%',
        width: "50%",
        // justifyContent: 'center',
        padding: 10,
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
    },
    within: {
        fontSize: 20,
        color: Colors.primaryLight,
        marginTop: 2
    }
});
export default OptionsModal;
