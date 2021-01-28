import React, { useEffect, useState, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './styles';
import * as db from '../../utils/db';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Shift } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import LogoutBtn from '../../components/LogoutBtn'
import UpdateProfile from '../../components/UpdateProfile'
import ProfileImage from '../../components/ProfileImage'


export default function ProfileScreen(props: BottomTabScreenProps<'Profile'>) {

    const { user } = useContext(AuthContext);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);

    if (user === null) return;

    const userID = user.id;
    const userEmail = user.email;
    const fullName = user.fullName;
    const gradYear = user.gradYear;
    const rank = user.rank;
    const profileImagePath = user.profileImagePath;

                
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

    return (
        <><Appbar.Header>
            <Appbar.Content title="Profile Page" />
            <LogoutBtn />
        </Appbar.Header>
        <SafeAreaView style={styles.horizontalContainer}>
            <View style={styles.verticalContainer}>
                <ProfileImage image={profileImagePath} style={{ resizeMode: 'cover', width: 120, height: 120 }}/>
                <View style={styles.horizontalContainer}>
                    <Text> Name: {fullName} </Text>
                    <Text> Email: {userEmail} </Text>
                    <Text> Graduation year: {gradYear} </Text>
                    <Text> Rank: {rank} </Text>
                    <Text> ID: {userID} </Text>
                    <Text> Monthly Hours: {monthlyHours} </Text>
                </View>
            </View>
            <UpdateProfile />
        </SafeAreaView></>
    );
}

