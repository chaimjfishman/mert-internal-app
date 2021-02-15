import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar, Button, List, Card, Title, Paragraph } from 'react-native-paper';
import { Shift } from '../../constants/collectionTypes';
import * as db from '../../utils/db';
import {StyleSheet, View, ScrollView } from 'react-native';

import DefaultHome from '../../components/DefaultHome';
import CallMode from '../../components/CallMode';
import CircularProgress from '../../components/CircularProgress';
import Appbar from '../../components/Appbar';

export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const requiredMonthlyHours = 30;
    const [isCallMode, setCallMode] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);
    const [nextShift, setShifts] = useState<Shift | null>(null);
    const [contacts, setContacts] = useState<Shift | null>(null);
    if (user === null) return;
    useEffect(() => {
        async function getInfo() {
            try {
                const nextShift = await db.getNextShift(user.id);
                setShifts(nextShift)
                console.log(nextShift);
                const monthlyHours = await db.getMonthlyHours(user.id);
                setMonthlyHours(monthlyHours)
                const contacts = await db.getContacts();
                setContacts(contacts)

            } catch (err) {
                alert(err);
            }
        }
        getInfo();
      }, []);

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../../assets/penn_Logo.png')} />
    const contact = props => <Avatar.Icon {...props} icon={require('../../../assets/phone_icon.png')} />
    const hours = props => <Avatar.Icon {...props} icon={require('../../../assets/hours_icon.png')} />
    const percent_completed =100*(monthlyHours)/requiredMonthlyHours;

    console.log(contacts);
    console.log(monthlyHours)
    return (

    <ScrollView style={styles.container}>
        <Appbar></Appbar>
        <CallMode></CallMode>
        <Card style={styles.card}>
            <Card.Title title="Shift" left = {penn_logo}/>
                <Card.Content>
                    <Title>Next Shift</Title>
                    <Paragraph>Start Time: {nextShift?.startTime.toString()}</Paragraph>
                    <Paragraph>End Time: {nextShift?.endTime.toString()}</Paragraph>
                    <Paragraph>Shift Type: {nextShift?.shiftType}</Paragraph>
                </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
        <Card style={styles.card}>
            <Card.Title title="Important Contacts" left = {contact}/>
            <Card.Content>
                {/* {contacts.map((prop, key) => {
                    return (
                <Title style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Title>
                );
                })}
                <Title></Title> */}
            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
        <Card style={styles.card}>
            <Card.Title title="Hours" left = {hours}/>
            <Card.Content>
                <CircularProgress percent = {percent_completed}></CircularProgress>
                <Paragraph>You've completed {percent_completed}% of Your Required Hours</Paragraph>
            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    </ScrollView>  

    );

    if (isCallMode) {
        return (
            <CallMode  setCallMode={setCallMode}/>
        );
    } else {
        return (
            <DefaultHome setCallMode={setCallMode}/>
        );
    }

    // return (
    //     // <DefaultHome />
    //     <CallMode />
    //     // {isCallMode ? <CallMode /> : <DefaultHome />}
    // );
}



    