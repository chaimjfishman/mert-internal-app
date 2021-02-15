import React, { useEffect, useState, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import * as db from '../../utils/db';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Shift } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import UpdateProfile from '../../components/UpdateProfile';
import Appbar from '../../components/Appbar';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CircularProgress from '../../components/CircularProgress';

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
    const profileImagePath = user.profileImagePath;
    const getTextColor = () => {
        let completed_color;
        if(user.formCompleted) {
            completed_color = "#3cb371";
        } else {
            completed_color = "#ff4500";
        }
        return completed_color
    }
    

                
    useEffect(() => {
        async function getShifts() {
            try {
                // TODO: get shifts from db
                // const shiftData = await db.getUserShifts(userID);
                // setShifts(shiftData)
                const monthlyHours = await db.getMonthlyHours(userID);
                setMonthlyHours(monthlyHours)

            } catch (err) {
                alert(err);
            }
        }
        getShifts();
      }, []);
      const percent_completed =100*(monthlyHours)/requiredMonthlyHours;
      const fixed_percent = percent_completed.toFixed()
    return (
        <SafeAreaView style={styles.container}>
            <Appbar></Appbar>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.titleBar}>
            </View>

            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require("../../../assets/penn_logo.png")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.fullName}</Text>
                <Text style={[styles.text, { fontWright: "100", fontSize: 24, color: "#AEB5BC" }]}>{user.rank}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{monthlyHours}</Text>
                    <Text style={[styles.text, styles.subText]}>Monthly Hours Completed</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{user.gradYear}</Text>
                    <Text style={[styles.text, styles.subText]}>Graduation Year</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{user.dateJoinedMERT}</Text>
                    <Text style={[styles.text, styles.subText]}>Date Joined</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <CircularProgress>percent = {percent_completed}</CircularProgress>
                <Text style={[styles.text, { fontSize: 24, color: "#AEB5BC", textTransform: "uppercase" }]}>You've completed {fixed_percent}% of Your Required Hours</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontSize: 20, textTransform: "uppercase" }]}>Board Position: {user.boardPosition}</Text>
                <Text style={[styles.text, { color: getTextColor(), fontSize: 20, textTransform: "uppercase" }]}>Schedule Form Completed: {user.formCompleted.toString()}</Text>
                <Text style={[styles.text, { color: getTextColor(), fontSize: 20, textTransform: "uppercase" }]}>Athletic Shift Complete: {user.takenAthleticShift.toString()}</Text>
            </View>
            <UpdateProfile/>


        </ScrollView>
    </SafeAreaView>
);
}



