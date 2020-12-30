import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function HomeScreen(props: any) {

    const userID = props.extraData.id

    return (
        <View>
            <Text>
                Home Screen Here
            </Text>
        </View>
    )
}
