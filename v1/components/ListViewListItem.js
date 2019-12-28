import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity, View, Text, StyleSheet,
    TouchableNativeFeedback, Platform, Dimensions, Image, ImageBackground
} from 'react-native';
import { Header } from 'react-navigation-stack';
import FlipCard from 'react-native-flip-card';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - Header.HEIGHT;

const ListItem = props => {
    const [receivedProps, setReceivedProps] = useState(props);

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <FlipCard
            style={styles.gridItem}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
        >
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <Image source={{ uri: props.data.Image }} style={styles.image} />
                <LinearGradient colors={[Colors.radient1, Colors.radient2]}
                    style={styles.linearGradient}>
                        <Text style={styles.title} numberOfLines={1}>{props.data.Name.replace('<br/>', '\n')}</Text>
                </LinearGradient>
                <View style={styles.details}>
                    <Text>{props.data.Availability}</Text>
                </View>
            </View>
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <Text>Back</Text>
            </View>
        </FlipCard>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: width / 30,
        height: (height - (width / 30 * 8)) / 3,
        borderRadius: 10,
        width: width * 0.43333
    },
    front: {
    },
    back: {
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        //padding: 10,
        //justifyContent: 'flex-end',
        //alignItems: 'flex-end'
    },
    name: {
        position: 'absolute',
        top: '30%',
        width: '60%',
        right: 10
        /*justifyContent: 'flex-end',
        alignItems: 'flex-end',*/
    },
    details: {
    },
    title: {
        fontSize: 17,
        //textAlign: 'right'
        color: 'white'
    },
    image: {
        width: "100%",
        height: "50%",
        resizeMode: 'cover'
    },
    linearGradient: {
        //padding: 5,
        height: '15%',
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        top: '35%',
        justifyContent: 'center'
    }
});

export default ListItem;