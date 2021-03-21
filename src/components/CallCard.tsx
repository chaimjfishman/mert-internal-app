import styles from './styles';
import React,  {useEffect, useState, useContext } from 'react';
import { Portal, Avatar, Card, Title, Paragraph, Dialog, Button } from 'react-native-paper';
import { User} from '../constants/collectionTypes';
import * as db from '../utils/db';
import { AuthContext } from "../providers/AuthProvider";


// type CallCardProps = {
//     user: User,
// }

const CallCard = () => {
    console.log("nade it")
    const { user } = useContext(AuthContext);

    const [prevCalls, setPrevCalls] = useState<[] | null>(null)

    useEffect(() => {
        async function getInfo() {
            try {
                const prevCalls = await db.getUserCalls(user.id);
                setPrevCalls(prevCalls)
            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    async function getPrevCalls() {
        if (prevCalls) {
            const listItems = prevCalls.map((curr) =>
                    <>
                        <Paragraph style={styles.callText}>Dispatch Time: {curr.dispatched.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.callText}>Arrival Time: {curr.onScene.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.callText}>Transport Time: {curr.tranScene}</Paragraph>
                        <Paragraph style={styles.callText}>Complettion Time: {curr.completed}</Paragraph>

                    </> 
            );
        }
    }

    const penn_logo = props => <Avatar.Icon {...props} icon={require('../../assets/penn_logo.png')} />

    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog style={styles.card}>
                <Dialog.Title title="Call" left = {penn_logo} titleStyle={styles.blackText}/>
                <Dialog.Content>
                <Title style={styles.blackText}>Call</Title>
                    {shift ?
                        getPrevCalls()
                        : <Paragraph style={styles.blackText}> No Call Data</Paragraph>
                    }
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );   
}

export default CallCard;