import styles from './styles';
import React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Shift} from '../constants/collectionTypes';

type ShiftCardProps = {
    shift: Shift,
}

const ShiftCard = ({shift}: ShiftCardProps) => {

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../assets/penn_logo.png')} />
    console.log(shift);

    return (
        <Card style={styles.card}>
            <Card.Title title="Shift" left = {penn_logo} titleStyle={styles.blackText}/>
            <Card.Content>
            <Title style={styles.blackText}>Next Shift</Title>
                {shift ?
                    <>
                        <Paragraph style={styles.blackText}>Start Time: {shift?.startTime.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.blackText}>End Time: {shift?.endTime.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.blackText}>Role: {shift?.role}</Paragraph>
                    </> 
                    : <Paragraph style={styles.blackText}> No Shift Data</Paragraph>
                }
            </Card.Content>
        </Card>
    );   
}

export default ShiftCard;