import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { BottomTabScreenProps } from '../../../types'

export default function HomeScreen(props: BottomTabScreenProps<'Home'>) {
    const userID = props.extraData.id

    return (
        <View>
            <Text>
                Home Screen Here
            </Text>
        </View>
    )
}
