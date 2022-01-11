import React, { useEffect, useState } from 'react';
import {  View} from 'react-native';
import styles from './styles';
import { Card, Avatar } from 'react-native-paper';
import * as db from '../utils/db';
import { Contact } from '../constants/collectionTypes';
import CallLink from './CallLink';

const Contacts = () => {
    const [contacts, setContacts] = useState<Contact[] | null>([]);
    const contact = props => <Avatar.Icon style={styles.avatarContainer} {...props} icon={require('../../assets/phone_icon.png')} />

    useEffect(() => {
        async function getInfo() {
            try {
                const contacts = await db.getContacts();
                console.log(contacts)
                setContacts(contacts)

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const listItems = contacts.map((curr) =>
        <View key={curr.name} style={{flexDirection: 'row'}}>
            <CallLink title={`${curr.name} - ${curr.number}`} link = {curr.number} />
        </View>
    );

    return (
        <Card style={styles.card}>
            <Card.Title title="Important Contacts" left = {contact} titleStyle={styles.blackText}/>
            <Card.Content>
                {listItems}
            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );   
}

export default Contacts;