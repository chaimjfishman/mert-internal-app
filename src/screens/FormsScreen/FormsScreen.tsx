import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import * as storage from '../../utils/storage';
import Forms from '../../components/Forms';
import { AuthContext } from '../../providers/AuthProvider';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


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
        <ScrollView>
            <Appbar title="Forms"></Appbar>
            <Forms rank={user?.rank}/>
        </ScrollView>
    : 
        <ScrollView>
            <Appbar title="Forms"></Appbar>
            <Card.Title title="Please have an admin update your rank before accessing forms." titleStyle={styles.blackText}/>
        </ScrollView>

    return (FormScreen);
}