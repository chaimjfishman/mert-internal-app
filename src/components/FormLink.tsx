import React from 'react';
import {  View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import * as Linking from 'expo-linking';
import { Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const FormLink = ({title, link}) => {
    return (
        // <TouchableOpacity onPress={() => window.open(link)} style={styles.appButtonContainer}>
        //     <Text style={{textAlign: 'center'}}> {title} </Text>
        // </TouchableOpacity>
        // <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.appButtonContainer}>
        //     <Text style={{textAlign: 'center'}}> {title} </Text>
        // </TouchableOpacity>
        <SafeAreaView>
            <View>
                <Button style={styles.appButtonContainer} mode="outlined" compact onPress={() => window.open(link)}>
                    {title}
                </Button>
                {/* <Card style={styles.card}>
                    <Card.Title title={title}/>                    
                    <Card.Actions> */}
                        {/* <Button style={{alignItems: "center"}}mode="outlined" compact onPress={() => window.open(link)}>
                            {/* Open
                        </Button> */}
                    {/* </Card.Actions>
                </Card> */}
            </View>
        </SafeAreaView>
    );   
}

export default FormLink;

