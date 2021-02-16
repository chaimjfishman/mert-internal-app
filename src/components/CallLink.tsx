import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';


const FormLink = ({title, link}) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${link}`)}>
            <Text style={styles.callButton}> {title} </Text>
        </TouchableOpacity>
    );   
}

export default FormLink;
