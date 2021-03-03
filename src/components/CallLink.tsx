import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';

type CallLinkProps = {
    title: string,
    link: string
}

const CallLink = ({title, link}: CallLinkProps) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${link}`)} style={{padding: 10}}>
            <Text style={styles.callButton}> {title} </Text>
        </TouchableOpacity>
    );   
}

export default CallLink;
