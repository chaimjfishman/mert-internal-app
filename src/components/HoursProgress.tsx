import styles from './styles';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import { Paragraph } from 'react-native-paper';
import * as db from '../utils/db';
import CircularProgress from './CircularProgress';
import View from 'react-native';

const HoursProgress = () => {

    const requiredMonthlyHours = 30;
    const { user } = useContext(AuthContext);
    const [monthlyHours, setMonthlyHours] = useState<number>(0.0);

    if (user === null) return null;

    const userID = user.id;

    useEffect(() => {
        async function getInfo() {
            try {
                const monthlyHours = await db.getMonthlyHours(user.id);
                setMonthlyHours(monthlyHours)

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const percent_completed =100*(monthlyHours)/requiredMonthlyHours;
    const fixed_percent = percent_completed.toFixed();



    return (
        <View>
            <CircularProgress percent = {percent_completed}></CircularProgress>
            <Paragraph style={styles.blackText}>You've completed {fixed_percent}% of Your Required Hours</Paragraph>
        </View>
    );   
}

export default HoursProgress;