import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { Card, Avatar, Title, Paragraph} from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from "../providers/AuthProvider";
import CallCard from "./CallCard"


const CallTimeInfo = () => {
    const { user } = useContext(AuthContext);
    const [callInfo, setCallInfo] = useState<any>(null);
    const [prevCalls, setPrevCalls] = useState<[] | null>(null)
    const contact = props => <Avatar.Icon {...props} icon={require('../../assets/phone_icon.png')} />

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

    async function getPrevCalls(uid: any) {
        const listItems = prevCalls.map((curr) =>
            <CallCard call={curr}/>
      );
    }

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
                    {/* <Button onPress={getPrevCalls} >See More Calls</Button> */}
                </Card.Actions>
        </Card>
    );   
}

export default CallTimeInfo;