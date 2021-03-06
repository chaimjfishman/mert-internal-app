import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import { Shift} from '../constants/collectionTypes';
import * as db from '../utils/db';

import styles from './styles';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native';

import Appbar from './Appbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import HoursCard from './HoursCard';
import CallTimeInfo from './CallTimeInfo';
import ShiftCard from './ShiftCard';

export default function DefaultHome(props: any) {

    const { user } = useContext(AuthContext);
    const [nextShift, setShifts] = useState<Shift | null>(null);
    
    if (user === null) return null;

    useEffect(() => {
        async function getInfo() {
            try {
                const nextShift = await db.getNextShift(user.id);
                setShifts(nextShift)
            } catch (err) {
                const nextShift = null;
                setShifts(nextShift)
            }
        }
        getInfo();
        if (nextShift == null) {
        }
      }, []);

    return (
        <SafeAreaView>
            <Appbar title="Home"></Appbar>
        <ScrollView>
            <Button onPress={() => props.setCallMode(true)} color="white" style={{
                flex: 10, 
                justifyContent: 'center', 
                backgroundColor: "steelblue",
            }}>
                DISPATCHED
            </Button>
            <ShiftCard shift={nextShift}/>
            <CallTimeInfo/>
            <HoursCard/>
        </ScrollView>  
        </SafeAreaView>
    );   
}