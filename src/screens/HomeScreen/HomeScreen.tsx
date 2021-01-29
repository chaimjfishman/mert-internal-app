import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";
import DefaultHome from '../../components/DefaultHome'
import CallMode from '../../components/CallMode'




export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const [isCallMode, setCallMode] = useState<boolean>(false);


    if (isCallMode) {
        return (
            <CallMode  setCallMode={setCallMode}/>
        );
    } else {
        return (
            <DefaultHome setCallMode={setCallMode}/>
        );
    }

    // return (
    //     // <DefaultHome />
    //     <CallMode />
    //     // {isCallMode ? <CallMode /> : <DefaultHome />}
    // );
}
