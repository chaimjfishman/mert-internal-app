import React from 'react';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import Contacts from '../../components/Contacts';


import { ScrollView } from 'react-native-gesture-handler';
export default function ContactsScreen(props: BottomTabScreenProps<'Contacts'>) {

    return (
        <ScrollView>
            <Appbar title="Contacts"></Appbar>
            <ScrollView>
                <Contacts/>
            </ScrollView>
        </ScrollView>
    );
}