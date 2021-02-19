import React, {useEffect, useState} from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import FormLink from '../../components/FormLink';
import LogoutBtn from '../../components/LogoutBtn'
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import * as storage from '../../utils/storage';
import Contacts from '../../components/Contacts';


import { ScrollView } from 'react-native-gesture-handler';
export default function ContactsScreen(props: BottomTabScreenProps<'Contacts'>) {


    return (
        <SafeAreaView>
            <Appbar title="Contacts"></Appbar>
            <Contacts/>
        </SafeAreaView>

    );
}