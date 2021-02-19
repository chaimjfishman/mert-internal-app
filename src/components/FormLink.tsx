import React from 'react';
import {  View, TouchableOpacity, Text, Platform} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const FormLink = ({title, link}) => {
    return (
        <SafeAreaView>
                <Button style={[styles.callButton, {margin: 25, alignSelf: 'center'}]} mode="outlined" compact onPress={() => Linking.openURL(link)}>
                    {title}
                </Button>
        </SafeAreaView>
    );   
}

export default FormLink;

