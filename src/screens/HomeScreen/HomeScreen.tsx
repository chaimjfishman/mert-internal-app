import React, { useState, useContext } from 'react';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";
import { ScrollView } from 'react-native';
import DefaultHome from '../../components/DefaultHome';
import CallMode from '../../components/CallMode';

export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const [isCallMode, setCallMode] = useState<boolean>(false);
    const { user } = useContext(AuthContext);

    if (user === null) return;

    let HomeScreen = isCallMode 
        ?
            <CallMode setCallMode={setCallMode}/> 
        : 
            <ScrollView>  
                <DefaultHome setCallMode={setCallMode}/>
            </ScrollView>;

    return (HomeScreen);
}
