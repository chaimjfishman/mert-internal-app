import styles from './styles';
import React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Call} from '../constants/collectionTypes';

type CallCardProps = {
    call: Call,
}

const CallCard = ({call}: CallCardProps) => {

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../assets/penn_logo.png')} />
    console.log(call);

    return (
        <Card style={styles.card}>
            <Card.Title title="Call" left = {penn_logo} titleStyle={styles.blackText}/>
            <Card.Content>
            <Title style={styles.blackText}>Call</Title>
                {shift ?
                    <>
                        <Paragraph style={styles.blackText}>Dispatch Time: {call?.dispatched.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.blackText}>Arrival Time: {call?.onScene.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.blackText}>Transport Time: {call?.tranScene}</Paragraph>
                        <Paragraph style={styles.blackText}>Complettion Time: {call?.completed}</Paragraph>

                    </> 
                    : <Paragraph style={styles.blackText}> No Call Data</Paragraph>
                }
            </Card.Content>
        </Card>
    );   
}

export default CallCard;