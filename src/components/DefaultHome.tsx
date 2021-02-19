import React, { useEffect, useState, useContext } from 'react';
import styles from './styles';
import { BottomTabScreenProps } from '../constants/navigationScreenTypes';
import { AuthContext } from "../providers/AuthProvider";
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native';


import Appbar from './Appbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextShift from './NextShift';
import HoursCard from './HoursCard';


export default function DefaultHome(props: any) {

    return (
        <SafeAreaView>
        <ScrollView style={styles.container}>
            <Appbar title="Home"></Appbar>
            <Button onPress={() => props.setCallMode(true)} style={{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: "green"
            }}>
            </Button>
            <NextShift/>
            <HoursCard/>
        </ScrollView>  
        </SafeAreaView>
    );   
}