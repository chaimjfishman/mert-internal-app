import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { Card, Avatar, Title, Paragraph} from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from "../providers/AuthProvider";


const CallTimeInfo = () => {
    const { user } = useContext(AuthContext);
    const [callInfo, setCallInfo] = useState<any>(null);
    const contact = props => <Avatar.Icon {...props} icon={require('../../assets/phone_icon.png')} />

    useEffect(() => {
        async function getInfo() {
            try {
                const latestCall = await db.getLatestCall(user.id);
                setCallInfo(latestCall)

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);


    return (
        <Card style={styles.card}>
            <Card.Title title="Latest Call" left = {contact} titleStyle={styles.blackText}/>
                <Card.Content>
                    <Title style={styles.blackText}>Latest Call</Title>
                    <Paragraph style={styles.blackText}>Start Time: {callInfo?.callStart.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Arrival Time: {callInfo?.arrived.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Treatment Start Time: {callInfo?.treated.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Transported Time: {callInfo?.transported.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Completion Time: {callInfo?.completed.toString()}</Paragraph>
                </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );   
}

export default CallTimeInfo;