import React, { useEffect, useState, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
import * as db from '../../utils/db';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Shift } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import UpdateProfile from '../../components/UpdateProfile';
import Appbar from '../../components/Appbar';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import CircularProgress from '../../components/CircularProgress';
import ProfileImage from '../../components/ProfileImage'
import ShowContacts from '../../components/ShowContacts'


//TODO 
//Fix profile image path
export default function ProfileScreen(props: BottomTabScreenProps<'Profile'>) {

    const { user } = useContext(AuthContext);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);

    if (user === null) return;
    const requiredMonthlyHours = 30;
    const userID = user.id;
    const userEmail = user.email;
    const fullName = user.fullName;
    const gradYear = user.gradYear;
    const rank = user.rank;
    const boardPosition = user.boardPosition;
    const profileImagePath = user.profileImagePath;
    const joined = user.dateJoinedMERT;
    const getFormTextColor = () => {
        let completed_color;
        if(user.formCompleted) {
            completed_color = "#3cb371";
        } else {
            completed_color = "#ff4500";
        }
        return completed_color
    }
    const getShiftTextColor = () => {
        let completed_color;
        if(user.takenAthleticShift) {
            completed_color = "#3cb371";
        } else {
            completed_color = "#ff4500";
        }
        return completed_color
    }


                
    useEffect(() => {
        async function getShifts() {
            try {
                const shifts = await db.getUserShifts(userID);
                setShifts(shifts)
                const monthlyHours = await db.getMonthlyHours(userID);
                setMonthlyHours(monthlyHours)
            } catch (err) {
                alert(err);
            }
        }
        getShifts();
      }, []);

      const listShifts = shifts.map((curr) =>
      <View style={styles.mediaImageContainer} >
          <Text style={styles.shiftData}>
              Start: {curr.startTime.toString()}
          </Text>
          <Text  style={styles.shiftData}>
              End: {curr.endTime.toString()}
          </Text>
          <Text style={styles.shiftData}>
              Type: {curr.shiftType}
          </Text>
      </View>
      );

      const percent_completed =100*(monthlyHours)/requiredMonthlyHours;
      const fixed_percent = percent_completed.toFixed()
    return (
        <SafeAreaView style={styles.container}>
            <Appbar></Appbar>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.titleBar}>
            </View>

            <View style={{ alignSelf: "center" }}>
                {/* <View style={styles.profileImage}>
                    <Image source={require("../../../assets/penn_logo.png")} style={styles.image} resizeMode="center"></Image>
                </View> */}
                <UpdateProfile/>

                <View style={styles.active}></View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{fullName}</Text>
                <Text style={[styles.text, { fontWright: "100", fontSize: 24, color: "#AEB5BC" }]}>{rank}</Text>
                <Text style={[styles.text, { fontWright: "100", fontSize: 20, color: "#AEB5BC" }]}>{userEmail}</Text>

            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{monthlyHours}</Text>
                    <Text style={[styles.text, styles.subText, {textAlign:"center"}]}>Monthly Hours Completed</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{gradYear}</Text>
                    <Text style={[styles.text, styles.subText]}>Graduation Year</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{joined}</Text>
                    <Text style={[styles.text, styles.subText]}>Date Joined</Text>
                </View>
            </View>
            <View style={[styles.infoContainer, {alignItems:"center"}]}>
                <CircularProgress percent ={percent_completed}></CircularProgress>
                <Text style={[styles.text, { fontSize: 20, color: "#AEB5BC" , alignSelf:"center", textAlign:"center"}]}>You've completed {fixed_percent}% of Your Required Hours</Text>
            </View>
            <View style={styles.mediaCount}>
                <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{shifts.length}</Text>
                <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase", textAlign: "center" }]}>Shifts Scheduled</Text>
            </View>
            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listShifts}
                </ScrollView>
                <View style={[styles.infoContainer, {marginBottom:24}]}>
                <Text style={[styles.text, { fontSize: 12, textTransform: "uppercase" }]}>Board Position: {boardPosition}</Text>
                <Text style={[styles.text, { color: getFormTextColor(), fontSize: 12, textTransform: "uppercase" }]}>Schedule Form Completed: {user.formCompleted.toString()}</Text>
                <Text style={[styles.text, { color: getShiftTextColor(), fontSize: 12, textTransform: "uppercase" }]}>Athletic Shift Complete: {user.takenAthleticShift.toString()}</Text>
            </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}
//         <><Appbar.Header>
//             <Appbar.Content title="Profile Page" />
//             <LogoutBtn />
//         </Appbar.Header>
//         <SafeAreaView style={styles.horizontalContainer}>
//             <View style={styles.verticalContainer}>
//                 <ProfileImage image={profileImagePath} style={{ resizeMode: 'cover', width: 120, height: 120 }}/>
//                 <View style={styles.horizontalContainer}>
//                     <Text> Name: {fullName} </Text>
//                     <Text> Email: {userEmail} </Text>
//                     <Text> Graduation year: {gradYear} </Text>
//                     <Text> Rank: {rank} </Text>
//                     <Text> ID: {userID} </Text>
//                     <Text> Monthly Hours: {monthlyHours} </Text> 
//                 </View>   
//             </View>
//             <ShowContacts/> 
//             <UpdateProfile />
//         </SafeAreaView></>
//     );
// }