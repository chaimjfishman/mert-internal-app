import React, { useEffect, useState, useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Shift } from '../../constants/collectionTypes';
import * as db from '../../utils/db';





export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const { user } = useContext(AuthContext);

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
}
