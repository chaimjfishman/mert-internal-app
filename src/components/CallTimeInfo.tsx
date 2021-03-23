import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { Portal, Dialog, Card, Button, Avatar, Title, Paragraph} from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from "../providers/AuthProvider";
import CallCard from "./CallCard"
import {ScrollView, View, Text, SafeAreaView} from 'react-native'
import { Call } from '../../constants/collectionTypes';
// import { SafeAreaView } from 'react-native-safe-area-context';



const CallTimeInfo = () => {
    const [visible, setVisible] = React.useState(false);

    const { user } = useContext(AuthContext);
    const [callInfo, setCallInfo] = useState<any>(null);
    const [prevCalls, setPrevCalls] = useState<Call[]>([]);
    const contact = props => <Avatar.Icon style={styles.avatarContainer} {...props} icon={require('../../assets/phone_icon.png')} />

    useEffect(() => {
        async function getInfo() {
            try {
                const latestCall = await db.getLatestCall(user.id);
                setCallInfo(latestCall)
                const prevCalls = await db.getUserCalls(user.id);
                setPrevCalls(prevCalls)
            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const listItems = prevCalls.map((curr) =>
    <SafeAreaView key={curr.dispatched.toLocaleString()}>
        <ScrollView style={styles.callContainer}>
            <Paragraph style={styles.blackText}>Start Time: {curr.dispatched.toLocaleString()}</Paragraph>
            <Paragraph style={styles.blackText}>Arrival Time: {curr.onScene.toLocaleString()}</Paragraph>
            <Paragraph style={styles.blackText}>Transported Time: {curr.tranScene.toLocaleString()}</Paragraph>
            <Paragraph style={styles.blackText}>Completion Time: {curr.completed.toLocaleString()}</Paragraph>
        </ScrollView>     
    </SafeAreaView>  
    ); 

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <Card style={styles.card}>
            <Card.Title title="Latest Call" left = {contact} titleStyle={styles.blackText}/>
                <Card.Content>
                    <Title style={styles.blackText}>Latest Call</Title>
                    <Paragraph style={styles.blackText}>Start Time: {callInfo?.dispatched.toLocaleString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Arrival Time: {callInfo?.onScene.toLocaleString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Transported Time: {callInfo?.tranScene.toLocaleString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Completion Time: {callInfo?.completed.toLocaleString()}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={showDialog}>Show Previous Calls</Button>
                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogContainer}>
                                <Dialog.Title>Calls</Dialog.Title>
                                <Dialog.Content style={styles.dialogStyle}>
                                    <ScrollView>    
                                        {listItems}
                                    </ScrollView>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                </Card.Actions>
        </Card>
    );   
}

export default CallTimeInfo;