import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Map from '../components/Map';
import BottomDrawer from 'rn-bottom-drawer';
import { Header } from 'react-navigation-stack';
import BasicInfoModal from '../components/BasicInfoModal';

const MapView = (props) => {
    const [selected, setSelected] = useState();
    const [showList, setShowList] = useState();
    // const [detailState, setDetailState] = useState(false);
    const markerSelected = (data) => {
        setSelected(data);
    }

    // const calloutPressed = () => {
    //     setDetailState(true
    // }

    // const markerDeselected = () => {
    //     setSelected(null);
    //     console.log("deselected");
    // }

    return (
        <View>
            <Map data={props.data} onPress={markerSelected} navigation={props.navigation}/>

            {selected ?
            // (
            // <View style={styles.modal}>
                <BasicInfoModal data={selected}/> 
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