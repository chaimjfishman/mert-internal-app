import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import * as storage from '../../utils/storage';
import Forms from '../../components/Forms';
import { AuthContext } from '../../providers/AuthProvider';
import { Card } from 'react-native-paper';


export default function FormsScreen(props: BottomTabScreenProps<'Forms'>) {
    const { user } = useContext(AuthContext);
    const [protocol, setProtocolform] = useState<String | null>(null);

    useEffect(() => {
        async function getInfo() {
            try {
                const protocol = await storage.getPAProtocol();
                setProtocolform(protocol)
                

            } catch (err) {
                alert(err);
            }
        }
        if (protocol == null) {
            //TODO add case if there is no upcoming shift
        }
        getInfo();
      }, []);

    let FormScreen = typeof user?.rank != undefined && user?.rank != null && user.rank 
    ?
        <SafeAreaView>
            <Appbar title="Forms"></Appbar>
            <SafeAreaView >
                <Forms rank={user?.rank}/>
            </SafeAreaView>
        </SafeAreaView>
    : 
        <ScrollView>
            <SafeAreaView>
                <Appbar title="Forms"></Appbar>
                <Card.Title title="Please have an admin update your rank before accessing forms." titleStyle={styles.blackText}/>
            </SafeAreaView>
        </ScrollView>
    return (FormScreen);
}