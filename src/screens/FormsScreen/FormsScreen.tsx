import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native';
import FormLink from '../../components/FormLink';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import Appbar from '../../components/Appbar';
import * as storage from '../../utils/storage';
import Forms from '../../components/Forms';


export default function FormsScreen(props: BottomTabScreenProps<'Forms'>) {
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

    return (
        <SafeAreaView>
            <Appbar title="Forms"></Appbar>
            <SafeAreaView >
                <Forms/>
            </SafeAreaView>
        </SafeAreaView>

    );
}