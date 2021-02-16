import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, Image, StyleSheet, StatusBar, Alert } from 'react-native';
import styles from './styles';
import FormLink from '../../components/FormLink';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { User, Shift} from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import WeekView from 'react-native-week-view';


const generateDates = (hours, minutes) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    if (minutes != null) {
      date.setMinutes(minutes);
    }
    return date;
  };

//Sync with data in database once scheduling parser is completed
const mertShifts = [
    {
      id: 1,
      description: 'Event 1',
      startDate: generateDates(0),
      endDate: generateDates(2),
      color: 'blue',
    },
    {
      id: 2,
      description: 'Event 2',
      startDate: generateDates(1),
      endDate: generateDates(4),
      color: 'red',
    },
    {
      id: 3,
      description: 'Event 3',
      startDate: generateDates(-5),
      endDate: generateDates(-3),
      color: 'green',
    },
  ];

  class App extends React.Component {
    state = {
      events: mertShifts,
      selectedDate: new Date(),
    };
  
    onEventPress = ({id, color, startDate, endDate}) => {
      Alert.alert(
        `event ${color} - ${id}`,
        `start: ${startDate}\nend: ${endDate}`,
      );
    };
  
    onGridClick = (event, startHour, date) => {
      const dateStr = date.toISOString().split('T')[0];
      Alert.alert(`Date: ${dateStr}\nStart hour: ${startHour}`);
    };
  
    render() {
      const {events, selectedDate} = this.state;
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            <WeekView
              ref={r => {
                this.componentRef = r;
              }}
              events={events}
              selectedDate={selectedDate}
              numberOfDays={3}
              onEventPress={this.onEventPress}
              onGridClick={this.onGridClick}
              headerStyle={styles.header}
              headerTextStyle={styles.headerText}
              hourTextStyle={styles.hourText}
              eventContainerStyle={styles.eventContainer}
              formatDateHeader="MMM D"
              hoursInDisplay={12}
              startHour={8}
            />
          </SafeAreaView>
        </>
      );
    }
  }
  
  const stylesss = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
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
      borderWidth: 1,
      borderColor: 'black',
    },
  });
  
  export default App;

// export default function ScheduleScreen(props: BottomTabScreenProps<'Schedule'>) {
//     const { user } = useContext(AuthContext);

//     return (
//         <SafeAreaView style={styles.schedContainer}>

//             <FormLink
//                 title="Click Here to See Full Schedule"
//                 link='https://docs.google.com/spreadsheets/d/1Pq4hw8gndR5udZWyPe-OUQprV2KWUIl4srjstPDu1AU/edit?usp=sharing'
//             />
//             {/* <Image source={require('../../../assets/Schedule.png')} 
//                     style={{ resizeMode: 'stretch', width: 1000, height: 750 }}/> */}
//             <FormLink
//                 title="Schedule Form"
//                 link='https://media1.giphy.com/media/3o72FkiKGMGauydfyg/giphy.gif'
//             />
//             <WeekView
//                 events={mertShifts}
//                 selectedDate={new Date()}
//                 numberOfDays={7}
//             />
//         </SafeAreaView>
//     );
// }