import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback, Platform, Dimensions, Animated } from 'react-native';
import { Header } from 'react-navigation-stack';
import FlipCard from 'react-native-flip-card';

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
                <Text style={styles.title} numberOfLines={2}>{props.data.Name}</Text>
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
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 22,
        textAlign: 'right'
    }
});

export default ListItem;