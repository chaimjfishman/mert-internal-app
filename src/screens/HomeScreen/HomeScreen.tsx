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
    const { user } = useContext(AuthContext);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);
    const [nextShift, setShifts] = useState<Shift | null>(null);
    if (user === null) return;
    useEffect(() => {
        async function getShifts() {
            try {
                // TODO: get shifts from db
                const nextShift = await db.getNextShift(user.id);
                setShifts(nextShift)
                console.log(nextShift);
                const monthlyHours = await db.getMonthlyHours(user.id);
                setMonthlyHours(monthlyHours)

            } catch (err) {
                alert(err);
            }
        }
        getShifts();
      }, []);

    const LeftContent = props => <Avatar.Icon {...props} icon={require('../../../assets/penn_Logo.png')} />
    console.log(nextShift?.startTime);
    return (
    <Card>
        <Card.Title title="Shift" left = {LeftContent}/>
            <Card.Content>
                <Title>Next Shift</Title>
                <Paragraph>shift: </Paragraph>
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
