import React, {useState, useEffect} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';
import Axios from 'axios';
import BarChart from '../components/BarChart';

//iOS baseURL changes everytime launching via Ngrok
const baseUrl = Platform.OS === 'ios' ? 'https://5e602b58.ngrok.io/' : 'http://10.0.2.2:5000/';

const StatisticsModal = props => {
    const [statistics, setStatistics] = useState([]);

    useEffect(()=> {
        const fetchStatistics = async () => {
            console.log("fetching parking lot statistics");
            const results = await Axios.get(`${baseUrl}ParkingLot/${props.parkingLotID}/SnapShots/All`);
            
            console.log("done fetching parking lot statistics");
            return results.data;
        }

        const getAveragePerHour = async () => {
            const statistics = await fetchStatistics().then((result)=> {
                return result;
            });

            var hour;
            var totalPerHour = new Array(24).fill(0);
            var countPerHour = new Array(24).fill(0);
            var averagePerHour = new Array(24);
            statistics.map((data) => {
                var utcTime = data.timestamp;
                hour = parseInt(utcTime.substring(11, 13)) - 7 < 0 ? 
                parseInt(utcTime.substring(11, 13)) - 7 + 24 : 
                parseInt(utcTime.substring(11, 13)) - 7;
                var openParkings = parseInt(data.OpenParkings);
                totalPerHour[hour] += openParkings;
                countPerHour[hour]++;
                averagePerHour[hour] = parseInt((totalPerHour[hour] / countPerHour[hour]).toFixed(2));
            })

            setStatistics(averagePerHour);
        }

        getAveragePerHour();
    }, [])
    return (
        <Modal visible={props.show}
        transparent={true}
        >
            <View
            style={styles.modal}>
                <BarChart data={statistics} />
                <Button onPress={props.closeModal} title="Hide Modal"/>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: "90%",
        height: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        margin: 0
    }
});
export default StatisticsModal;
