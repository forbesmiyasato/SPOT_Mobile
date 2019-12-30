import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListViewListItem';
import StatisticsModal from '../components/StatisticsModal';

const ListScreen = props => {
    const [showStatistics, setShowStatistics] = useState(false);
    const [statisticsParkingLot, setStatisticsParkingLot] = useState ('');

    const handleShowStatistics = (id) => {
        setShowStatistics(true);
        setStatisticsParkingLot(id);
    }

    const handleCloseModal = () => {
        setShowStatistics(false);
        setStatisticsParkingLot('');
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
                <View style={styles.modalPosition}>
                    <StatisticsModal
                        closeModal={handleCloseModal}
                        show={showStatistics}
                        parkingLotID={statisticsParkingLot} />
                </View>
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
    },
    modalPosition: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ListScreen;