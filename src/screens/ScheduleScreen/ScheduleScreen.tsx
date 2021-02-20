import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, View, SafeAreaView, Image } from 'react-native';
import { Paragraph, Dialog, Portal } from 'react-native-paper';
// import styles from './styles';
import FormLink from '../../components/FormLink';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { User, Shift} from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import Appbar from '../../components/Appbar';
import * as db from '../../utils/db';

import {Calendar } from 'react-native-calendars';
import NextShift from '../../components/NextShift';

export default function ScheduleScreen(props: BottomTabScreenProps<'Schedule'>) {
    const { user } = useContext(AuthContext);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [visible, setDialogVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const hideDialog = () => setDialogVisible(false);

    // useEffect(() => {
    //     async function getShifts() {
    //         try {
    //             const shifts = await db.getAllShifts();
    //             setShifts(shifts)
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getShifts();
    //   }, []);


    function onDateClick(day) {
        console.log(day);
        setSelectedDate(day.dateString)
        setDialogVisible(true)
    }

    return (
        <SafeAreaView>

            <Appbar title="Schedule"></Appbar> 

            <Calendar
                // Collection of dates that have to be marked. Default = {}
                markedDates={{
                    '2021-02-16': {marked: true},
                    '2021-02-17': {marked: true},
                    '2021-02-20': {selected: true, selectedColor: 'red'},
                    '2021-02-21': {selected: true, selectedColor: 'red'},
                }}
                horizontal={true}
                pagingEnabled={true}
                enableSwipeMonths={true}
                onDayPress={(day) => {onDateClick(day)}}
            /> 

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title> {selectedDate} </Dialog.Title>
                        <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
                            <NextShift/>
                            <NextShift/>
                            <NextShift/>
                            <NextShift/>
                            <NextShift/>
                        </ScrollView>
                    </Dialog.ScrollArea>                        
                </Dialog>
            </Portal>

        </SafeAreaView>
    );
}