import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Map from '../components/Map';
import BottomDrawer from 'rn-bottom-drawer';
import { Header } from 'react-navigation-stack';
import BasicInfoModal from '../components/BasicInfoModal';

const MapView = (props) => {
    const [selected, setSelected] = useState();
    const [showList, setShowList] = useState();

    const markerSelected = (data) => {
        setSelected(data);
    }

    // const markerDeselected = () => {
    //     setSelected(null);
    //     console.log("deselected");
    // }
    console.log(selected);
    return (
        <View>
            <Map data={props.data} onPress={markerSelected} />

            {selected ?
            // (
            // <View style={styles.modal}>
                <BasicInfoModal /> 
            // </View>
            // )
            : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: 400
    }
});

export default MapView;