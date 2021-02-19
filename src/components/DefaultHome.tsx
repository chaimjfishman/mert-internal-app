import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../constants/navigationScreenTypes';
import { AuthContext } from "../providers/AuthProvider";
import { Avatar, Button, List, Card, Title, Paragraph } from 'react-native-paper';
import { Shift, Contact } from '../../constants/collectionTypes';
import * as db from '../utils/db';
import {StyleSheet, View, ScrollView, Linking } from 'react-native';

import CallMode from './CallMode';
import CircularProgress from './CircularProgress';
import Appbar from './Appbar';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DefaultHome(props: any) {

    const requiredMonthlyHours = 30;
    const { user } = useContext(AuthContext);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);
    const [nextShift, setShifts] = useState<Shift | null>(null);

    if (user === null) return null;

    const userID = user.id;

    useEffect(() => {
        async function getInfo() {
            try {
                // const nextShift = await db.getNextShift(user.id);
                // setShifts(nextShift)
                console.log(nextShift);
                // const monthlyHours = await db.getMonthlyHours(user.id);
                // setMonthlyHours(monthlyHours)
                const latestcall = await db.getLatestCall(user.id);
                console.log('latestcll')
                console.log(latestcall)
                // const contacts = await db.getContacts();
                // setContacts(contacts)

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

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../assets/penn_logo.png')} />
    const hours = props => <Avatar.Icon {...props} icon={require('../../assets/hours_icon.png')} />
    const percent_completed =100*(monthlyHours)/requiredMonthlyHours;
    const fixed_percent = percent_completed.toFixed()

    return (
        <SafeAreaView>
        <ScrollView style={styles.container}>
            <Appbar title="Home"></Appbar>
            <Button onPress={() => props.setCallMode(true)} style={{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: "green"
            }}>
            </Button>
            <Card style={styles.card}>
                <Card.Title title="Shift" left = {penn_logo} titleStyle={styles.blackText}/>
                    <Card.Content>
                        <Title style={styles.blackText}>Next Shift</Title>
                        <Paragraph style={styles.blackText}>Start Time: {nextShift?.startTime.toString()}</Paragraph>
                        <Paragraph style={styles.blackText}>End Time: {nextShift?.endTime.toString()}</Paragraph>
                        <Paragraph style={styles.blackText}>Shift Type: {nextShift?.shiftType}</Paragraph>
                    </Card.Content>
                <Card.Actions>
                </Card.Actions>
            </Card>
    
            <Card style={styles.card}>
                <Card.Title title="Hours" left = {hours} titleStyle={styles.blackText}/>
                <Card.Content>
                    <CircularProgress percent = {percent_completed}></CircularProgress>
                    <Paragraph style={styles.blackText}>You've completed {fixed_percent}% of Your Required Hours</Paragraph>
                </Card.Content>
                <Card.Actions>
                </Card.Actions>
            </Card>
        </ScrollView>  
        </SafeAreaView>
    );   
}