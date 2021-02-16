import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';


const FormLink = ({title, link}) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.appButtonContainer}>
            <Text style={{textAlign: 'center'}}> {title} </Text>
        </TouchableOpacity>
    );   
}

export default FormLink;