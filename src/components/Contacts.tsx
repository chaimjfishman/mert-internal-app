import React, { useEffect, useState } from 'react';
import {  View} from 'react-native';
import styles from './styles';
import { Card, Avatar, Title, Paragraph} from 'react-native-paper';
import * as db from '../utils/db';
import { Contact } from '../constants/collectionTypes';
import CallLink from './CallLink';
import ForwardLink from './ForwardLink';




const Contacts = () => {
    const [contacts, setContacts] = useState<Contact[] | null>([]);
    const contact = props => <Avatar.Icon {...props} icon={require('../../assets/phone_icon.png')} />

    useEffect(() => {
        async function getInfo() {
            try {
                const contacts = await db.getContacts();
                setContacts(contacts)

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const listItems = contacts.map((curr) =>
        <View key={curr.name} style={{flexDirection: 'row'}}>
            {/* <Paragraph style={styles.blackText} >
                <CallLink title="Call" link = {curr.phoneNumber}/>
            </Paragraph>
            <Title style={styles.blackText}> {curr.name}</Title> */}
            <CallLink title={curr.name} link = {curr.phoneNumber}/>
        </View>
    );

    return (
        <Card style={styles.card}>
            <Card.Title title="Important Contacts" left = {contact} titleStyle={styles.blackText}/>
            <Card.Content  style={styles.blackText}>
                {listItems}
            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );   
}

export default Contacts;