import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Shift} from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import Appbar from '../../components/Appbar';
import * as db from '../../utils/db';
import * as PropTypes from 'prop-types';



import {Calendar } from 'react-native-calendars';
import ShiftCard from '../../components/ShiftCard';

const propTypes = {
    markedDates: PropTypes.any,
    horizontal: PropTypes.bool,
    pagingEnabled: PropTypes.bool,
    enableSwipeMonths: PropTypes.bool,
    onDayPress: PropTypes.func,
    style: PropTypes.any
  };
ScheduleScreen.propTypes = propTypes;


export default function ScheduleScreen(props: BottomTabScreenProps<'Schedule'>) {
    const { user } = useContext(AuthContext);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [visible, setDialogVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState(null);
    const [dateShifts, setDateShifts] = useState(null);

    const hideDialog = () => setDialogVisible(false);

    useEffect(() => {
        async function getShifts() {
            try {
                const shifts = await db.getUserShifts(user.id);
                setShifts(shifts)
                createMarkedDays(shifts);
            } catch (err) {
                console.log(err);
            }
        }
        getShifts();
      }, []);

    function createMarkedDays(shifts: Shift[]) {
        let markedDates = {};
        const marking = {selected: true, selectedColor: 'red'}
        shifts.forEach(shift => {
            let month = ('0' + (shift.start.getMonth()+1)).slice(-2)
            let day = ('0' + shift.start.getDate()).slice(-2)
            let shiftDate = shift.start.getFullYear() + '-' + month + '-' + day;
            markedDates[shiftDate] = marking;
        });
        setMarkedDates(markedDates);
    }

    async function onDateClick(day: any) {
        let month = ('0' + day.month).slice(-2);
        let dayOfMonth = ('0' + day.day).slice(-2);
        let shiftDate = day.year + '-' + month + '-' + dayOfMonth;
        setSelectedDate(day.dateString)
        let dateShift = await db.getShiftsForDay(shiftDate);
        console.log(dateShift);
        const listItems = dateShift.map((curr) =>
            <ShiftCard shift={curr}/>
      );
        setDateShifts(listItems)
        setDialogVisible(true)
    }
    async function onDayPress() {
        (day) => {onDateClick(day)}
    }



    return (
        <SafeAreaView>

            <Appbar title="Schedule"></Appbar> 

            <Calendar
                // Collection of dates that have to be marked. Default = {}
                
                markedDates={markedDates}
                horizontal={true}
                pagingEnabled={true}
                enableSwipeMonths={true}
                onDayPress={(day) => {onDateClick(day)}}
            /> 

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={{maxHeight: '100%'}}>
                    <Dialog.Title> {selectedDate} </Dialog.Title>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
                                {dateShifts}
                            </ScrollView>
                        </Dialog.ScrollArea>                        
                </Dialog>
            </Portal>

        </SafeAreaView>
    );
}
