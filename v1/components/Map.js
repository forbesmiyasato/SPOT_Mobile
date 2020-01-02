import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = (props) => {

    const redirectToDetail = (data) => {
        props.navigation.navigate({
            routeName: 'DetailScreen', params: {
                data: data
            }
        })
    };

    return (
        <View>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude: 45.522,
                    longitude: -123.110,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
            >
                {props.data.map((data, index) => {
                    var coordinate = { latitude: data.Lat, longitude: data.Lng };
                    return <MapView.Marker
                        key={index}
                        coordinate={coordinate}
                        title={data.Name}
                        description={"Click for more"}
                        onPress={props.onPress.bind(this, data)}
                        onCalloutPress={redirectToDetail.bind(this, data)}
                    />
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 0
    },
});

export default Map;