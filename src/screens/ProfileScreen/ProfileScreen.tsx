import React, { useEffect, useState, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import * as db from '../../utils/db';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Shift } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";


export default function ProfileScreen(props: BottomTabScreenProps<'Profile'>) {

    const { user } = useContext(AuthContext);
    const [shifts, setShifts] = useState<Shift[]>([]);

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
                // const shiftData: Shift = await db.getShifts(user.uid);
            } catch (err) {
                alert(err);
            }
        }
        getShifts();
      }, []);

    return (
        <SafeAreaView style={styles.horizontalContainer}>
            <View style={styles.verticalContainer}>
                <View style={styles.horizontalContainer}>
                    <Text> Name: {fullName} </Text>
                    <Text> Email: {userEmail} </Text>
                    <Text> Graduation year: {gradYear} </Text>
                    <Text> Rank: {rank} </Text>
                    <Text> ID: {userID} </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}