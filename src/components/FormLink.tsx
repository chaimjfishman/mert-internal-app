import React from 'react';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Button } from 'react-native-paper';
import { Platform } from 'react-native';

type FormLinkProps = {
    title: string,
    link: string,
    style: []
}

const openLink = (link : string) => {
    if(Platform.OS == 'web'){
        window.open(link, '_blank');
    } else {
        Linking.openURL(link); // normal Linking react-native
    }
}

const FormLink = ({title, link}: FormLinkProps) => {
    return (
        <Button style={[styles.formsButton, {margin: 5}]} color="white" mode="outlined" compact onPress={() => openLink(link)}>
            {title}
        </Button>
    );   
}

export default FormLink;

