import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import styles from './styles';
import FormLink from '../../components/FormsScreen/FormLink';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { User, Shift} from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";


export default function ScheduleScreen(props: BottomTabScreenProps<'Schedule'>) {
    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.schedContainer}>

            <FormLink
                title="Click Here to See Full Schedule"
                link='https://docs.google.com/spreadsheets/d/1Pq4hw8gndR5udZWyPe-OUQprV2KWUIl4srjstPDu1AU/edit?usp=sharing'
            />
            <Image source={require('../../../assets/Schedule.png')} 
                    style={{ resizeMode: 'stretch', width: 1000, height: 750 }}/>
            <FormLink
                title="Schedule Form"
                link='https://media1.giphy.com/media/3o72FkiKGMGauydfyg/giphy.gif'
            />
        </SafeAreaView>
    );
}