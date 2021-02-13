import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from '../providers/AuthProvider';
import ForwardLink from './ForwardLink'

const ShowContacts = () => {

  const [contactList, setContactList] = useState(['test']);
                
  useEffect(() => {
    async function getContactList() {
      try {
        const contacts = await db.getContacts();
        console.log('contacts:')
        console.log(contacts)
        setContactList(contacts);
        console.log('contactList:')
        console.log(contactList)
      } catch (err) {
        console.log('FAILED!')
        alert(err);
      }
    }
    getContactList();
  }, []);


  return (
    <View>
      <Text> Contacts:</Text>
      <FlatList
        data={contactList}
        renderItem={Text}
        renderItem={({item}) => <ForwardLink href={"tel:" + item.phoneNumber} text={item.name}> </ForwardLink>}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default ShowContacts;
