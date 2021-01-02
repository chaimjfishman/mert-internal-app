import React, { useEffect, useState, useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { BottomTabScreenProps } from '../../constants/navigationScreenTypes';
import { AuthContext } from "../../providers/AuthProvider";


export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const { user } = useContext(AuthContext);

    if (user === null) return;

    const userID = user.id;

    return (
        <View>
            <Text>
                Home Screen Here
            </Text>
        </View>
    );
}
