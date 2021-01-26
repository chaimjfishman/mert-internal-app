import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { Contact } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import ForwardLink from '../../components/ForwardLink';


export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const { user } = useContext(AuthContext);

    if (user === null) return;

    const userID = user.id;

    const contacts: Contact[] = []

    return (
        <View>
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
