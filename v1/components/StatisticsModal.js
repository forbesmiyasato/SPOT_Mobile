import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';

const StatisticsModal = props => {
    const [visible, setVisible] = useState(props.show); 

    return (
        <Modal visible={visible}
        style={styles.modal}>
            <View>
                <Text>11111</Text>
                <Button onPress={props.closeModal} title="Hide Modal"/>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        width: "50%",
        height: "50%"
    }
});
export default StatisticsModal;
