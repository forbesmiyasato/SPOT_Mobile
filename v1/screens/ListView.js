import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListViewListItem';
import PredictionList from '../components/PredictionList';

const ListScreen = props => {
    const [receivedProps, setReceivedProps] = useState(props);

    const renderGridItem = (itemData, index) => {
        return (
            <ListItem
            data={itemData.item}
            color='white'
            getDirection={props.getDirection}
            index={index} />
        )
    }

    return (
        <View>
            <FlatList
                columnWrapperStyle={styles.columnWrapper}
                keyExtractor={item => item._id} 
                data={props.data} 
                renderItem={renderGridItem} 
                numColumns={2} />
        </View>
    )
}

const styles = StyleSheet.create({
    Name: {
        color: 'black'
    },
    row: {
        flex: 1,
        justifyContent: 'space-around'
    },
    columnWrapper: {
        justifyContent: 'space-between',
    }
});

export default ListScreen;