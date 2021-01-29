import React, { useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Contact } from '../constants/collectionTypes';
import ForwardLink from '../components/ForwardLink';
import { Button } from 'react-native-paper';


export default function DefaultHome(props: any) {

    const { user } = useContext(AuthContext);

    if (user === null) return null;

    const userID = user.id;

    const contacts: Contact[] = []

    return (
        <View>
              <Button icon="ambulance" mode="contained" onPress={() => props.setCallMode(true)}>
                    Call mode
                </Button>


            <Text>
                Home Screen Here
            </Text>
            <Text>
                Contacts:
            </Text>
            <FlatList
                data={contacts}
                renderItem={Text}
                renderItem={({item}) => <ForwardLink href={item.href} text={item.name}> </ForwardLink>}
                // keyExtractor={(item) => item.id}
                removeClippedSubviews={true}
            />
        </View>
    );   
}