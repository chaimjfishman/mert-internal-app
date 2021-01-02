import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import * as db from '../../utils/db';
import { User, Shift } from '../../../types'
import { BottomTabScreenProps } from '../../../types'
// import { UserContext } from '../../../app'

export default function ProfileScreen(props: BottomTabScreenProps<'Profile'>) {

    const [shifts, setShifts] = useState<Shift[]>([]);

    const userID = props.extraData.id
    const userEmail = props.extraData.email
    const fullName = props.extraData.fullName
    const gradYear = props.extraData.gradYear
    const rank = props.extraData.rank
    const profileImagePath = props.extraData.profileImagePath

                
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
    )
}