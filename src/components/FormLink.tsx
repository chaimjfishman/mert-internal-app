import React from 'react';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Button } from 'react-native-paper';

type FormLinkProps = {
    title: string,
    link: string
}

const FormLink = ({title, link}: FormLinkProps) => {
    return (
        <Button style={[styles.callButton, {margin: 5, alignSelf: 'center'}]} mode="outlined" compact onPress={() => Linking.openURL(link)}>
            {title}
        </Button>
    );   
}

export default FormLink;

