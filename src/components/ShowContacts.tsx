import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import * as db from '../utils/db';
import { AuthContext } from '../providers/AuthProvider';
import ForwardLink from './ForwardLink'
import { firebase } from '../utils/firebaseConfig';

const ShowContacts = () => {

  const [contacts, setContacts] = useState([{phoneNumber: "", name: "No contacts found"}]);
                
  // useEffect(() => {
  //   async function getContactList() {
  //     try {
  //       const contactList = await db.getContacts();
  //       // setContacts([{phoneNumber: "+1", name: "ahdskjahk", id: 777}]);
  //       setContacts(contactList);
  //       console.log(contactList)
  //     } catch (err) {
  //       alert(err);
  //     }
  //   }
  //   getContactList();
  // }, []);


  const contactsRef = firebase.firestore().collection('contacts')

  useEffect(() => {
    contactsRef
      .orderBy("name", "asc")
      .onSnapshot(
        querySnapshot => {
          const contactList = []
          querySnapshot.forEach(doc => {
            const contact = doc.data()
            contactList.push(contact)
          });
          setContacts(contactList)
        },
        error => {
          console.log(error)
        }
      )
  }, [])

  return (
    <View>
      <Text> Contacts:</Text>
      <FlatList
          data={contacts}
          renderItem={Text}
          renderItem={({item}) => <ForwardLink href={"tel:" + item.phoneNumber} text={"  " + item.name}> </ForwardLink>}
          // keyExtractor={(item) => item.ids}
          removeClippedSubviews={true}
      />
    </View>
  );
};

export default ShowContacts;
