import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Shift } from '../../constants/collectionTypes';
import * as db from '../../utils/db';

import DefaultHome from '../../components/DefaultHome'
import CallMode from '../../components/CallMode'




export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const [isCallMode, setCallMode] = useState<boolean>(false);

    if (user === null) return;
    const [shifts, setShifts] = useState<Shift[]>([]);
    // const currShifts = db.getShifts(user.id);
    const currShifts: Shift =  db.getShifts(user.id);

    console.log("Shifts: " + currShifts);
    // const userID = user.id;
    const LeftContent = props => <Avatar.Icon {...props} icon={require('../../../assets/penn_Logo.png')} />

    return (
    <Card>
        <Card.Title title="Shift" left = {LeftContent}/>
            <Card.Content>
                <Title>Next Shift</Title>
                <Paragraph>shift:</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../../../assets/Penn_MERT_Logo.png')} />
        <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
        </Card.Actions>
    </Card>
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
