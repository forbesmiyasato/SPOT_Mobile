import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListViewListItem';
import StatisticsModal from '../components/StatisticsModal';

const ListScreen = props => {
    const [showStatistics, setShowStatistics] = useState(false);

    const handleShowStatistics = () => {
        setShowStatistics(true);
    }

    const handleCloseModal = () => {
        setShowStatistics(false);
    }


    const renderGridItem = (itemData, index) => {
        return (
            <ListItem
                data={itemData.item}
                color='white'
                getDirection={props.getDirection}
                index={index}
                showStatistics={handleShowStatistics}
            />
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
            {showStatistics ?
                <StatisticsModal
                    closeModal={handleCloseModal}
                    show={showStatistics} />
                : null
            }
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