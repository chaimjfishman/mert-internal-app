import styles from './styles';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import { Avatar, Card, Paragraph } from 'react-native-paper';
import HoursProgress from './HoursProgress';
import CircularProgress from './CircularProgress';
import * as db from '../utils/db';
const HoursCard = () => {

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

    const hours = props => <Avatar.Icon style={styles.avatarContainer} {...props} icon={require('../../assets/hours_icon.png')} />
    const percent_completed =100*(monthlyHours)/requiredMonthlyHours;
    const fixed_percent = percent_completed.toFixed()



    return (
        <Card style={styles.card}>
            <Card.Title title="Hours" left = {hours} titleStyle={styles.blackText}/>
            <Card.Content>
                <CircularProgress percent = {percent_completed}></CircularProgress>
                <Paragraph style={[styles.blackText, {alignItems:"center"}]}>You've completed {monthlyHours} hours, {fixed_percent}% of your requirement</Paragraph>
            </Card.Content> 
        </Card>
    );   
}

export default HoursCard;