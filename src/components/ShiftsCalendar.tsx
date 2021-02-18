import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Alert} from 'react-native';
import WeekView from 'react-native-week-view';


export default function ShiftsCalendar(props: any) {

    const startDate1 = new Date();
    const endDate1 = new Date(startDate1.getTime() + 180*60000);
    const startDate2 = new Date(startDate1.getTime() + 60*60000);
    const endDate2 = new Date(startDate1.getTime() + 120*60000);

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F00',
          paddingTop: 22,
        },
        header: {
          backgroundColor: '#4286f4',
          borderColor: '#fff',
        },
        headerText: {
          color: 'white',
        },
        hourText: {
          color: 'black',
        },
        eventContainer: {
          borderWidth: 5,
          borderColor: 'black',
        },
      });

    const myEvents = [
        {
            id: 1,
            description: 'Event1',
            startDate: startDate1,
            endDate: endDate1,
            color: 'red',
          },
          {
            id: 2,
            description: 'Event2',
            startDate: startDate2,
            endDate: endDate2,
            color: 'red',
          }
    ]

    return (
        <SafeAreaView style={styles.container}>
        <WeekView
            // ref={r => {
            // this.componentRef = r;
            // }}
            events={myEvents}
            // selectedDate={selectedDate}
            numberOfDays={7}
            // onEventPress={this.onEventPress}
            // onGridClick={this.onGridClick}
            headerStyle={styles.header}
            headerTextStyle={styles.headerText}
            hourTextStyle={styles.hourText}
            eventContainerStyle={styles.eventContainer}
            // formatDateHeader="MMM D"
            hoursInDisplay={12}
            startHour={8}
        />
      </SafeAreaView>
    );   
}

