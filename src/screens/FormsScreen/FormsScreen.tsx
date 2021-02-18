import React, {useEffect, useState} from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import FormLink from '../../components/FormLink';
import LogoutBtn from '../../components/LogoutBtn'
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import * as storage from '../../utils/storage';

import { ScrollView } from 'react-native-gesture-handler';
export default function FormsScreen(props: BottomTabScreenProps<'Forms'>) {
    const [protocol, setProtocolform] = useState<String | null>(null);

    useEffect(() => {
        async function getInfo() {
            try {
                const protocol = await storage.getPAProtocol();
                console.log(protocol);
                setProtocolform(protocol)
                

            } catch (err) {
                alert(err);
            }
        }
        if (protocol == null) {
            //TODO add case if there is no upcoming shift
            console.log("No protocol form")
        }
        getInfo();
      }, []);

    return (
        <SafeAreaView>
        <View>
            <Appbar title="Forms"></Appbar>
                <View >
                    <FormLink 
                        title="PA Protocol"
                        link="https://www.health.pa.gov/topics/Documents/EMS/2020%20PA%20BLS%20Protocols.pdf"
                    />            
                    <FormLink
                        title="Probationary Logs"
                        link="https://docs.google.com/spreadsheets/d/1JwWX54awiqbkUmAZoGOjP5DgkO30EMyK7vPrUyH9frU/edit#gid=0"
                    />
                    <FormLink
                        title="MERT Equipment Checkout Form"
                        link='https://docs.google.com/forms/d/e/1FAIpQLSeCPymiaEl2AgXcFctGIuE9jurxku6evYMS5RO1w1ywrPU5-w/viewform'
                    />
                    <FormLink
                        title="Probationary Logs"
                        link='https://docs.google.com/spreadsheets/d/163IBjttNdGNvjn3-k9jIHE82uoupQFl4FG_XhJOCtBg/edit?ts=5b718fe6#gid=0'
                    />
                </View>
        </View>
        </SafeAreaView>

    );
}