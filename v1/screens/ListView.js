import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const ListScreen = props => {
    const renderGridItem = (itemData) => {
        return (
            <View key={itemData.item._id}>
            <Text style={styles.Name}>{itemData.item.Name}</Text>
            </View>
        )
    }

    return (
        <View>
        <FlatList data={props.data} renderItem={renderGridItem} numColumns={2} />
        </View>
    )
}

const styles = StyleSheet.create({
    Name: {
        color: 'black'
    }
});

export default ListScreen;