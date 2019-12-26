import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ListItem from '../components/ListViewListItem';

const ListScreen = props => {
    const renderGridItem = (itemData) => {
        return (
            <ListItem
            data={itemData.item} 
            color='white'
            onSelect={() => {
                console.log("clicked")
            }} />
        )
    }

    console.log(props.data);
    
    return (
        <View>
        <FlatList 
         columnWrapperStyle={ styles.columnWrapper }
         keyExtractor={(item, index) => item._id} data={props.data} renderItem={renderGridItem} numColumns={2} />
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