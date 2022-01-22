import styles from './styles';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Shift} from '../constants/collectionTypes';
import * as db from '../utils/db';


const NextShift = () => {

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../assets/penn_logo.png')} />
    const { user } = useContext(AuthContext);
    const [nextShift, setShifts] = useState<Shift | null>(null);
    
    if (user === null) return null;

    const userID = user.id;

    useEffect(() => {
        async function getInfo() {
            try {
                const nextShift = await db.getNextShift(user.id);
                setShifts(nextShift)

            } catch (err) {
                console.log(err);
            }
        }
        if (nextShift == null) {
            //TODO add case if there is no upcoming shift
            console.log("No next shift")
        }
        getInfo();
      }, []);


    return (
        <Card style={styles.card}>
            <Card.Title title="Shift" left = {penn_logo} titleStyle={styles.blackText}/>
                <Card.Content>
                    <Title style={styles.blackText}>Next Shift</Title>
                    <Paragraph style={styles.blackText}>Start Time: {nextShift?.start.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>End Time: {nextShift?.end.toString()}</Paragraph>
                    <Paragraph style={styles.blackText}>Role: FIX</Paragraph>
                </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );   
}

export default NextShift;