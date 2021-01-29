import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Button } from 'react-native-paper';


export default function DefaultHome(props: any) {

    const { user } = useContext(AuthContext);

    if (user === null) return null;

    const userID = user.id;

    return (
        <View>
              <Button icon="ambulance" mode="contained" onPress={() => props.setCallMode(true)}>
                    Call mode
                </Button>

            <Text>
                Home Screen Here
            </Text>
        </View>
    );   
}