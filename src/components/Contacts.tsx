


import React, { useEffect, useState } from 'react';
import {  View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Card, Button, Avatar, Title, Paragraph} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as db from '../utils/db';
import { Contact } from '../constants/collectionTypes';
import CallLink from './CallLink';




const Contacts = () => {
    const [contacts, setContacts] = useState<Contact[] | null>([]);
    const contactsListArray = [];
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
      <View>
          <Title style={styles.blackText}>{curr.name}</Title>
          <Paragraph style={styles.blackText}>
              <CallLink title="Call" link = {curr.phoneNumber}/>
          </Paragraph>
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