import React from 'react';
import { Text, View, Button } from 'react-native';
import * as notif from '../utils/notifications'; 
import styles from './styles';

const NotificationSender = (expoPushToken: any | undefined, notification: boolean | any | undefined) => {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        >
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    if (expoPushToken) {
                        await notif.sendPushNotification(expoPushToken);
                    }
                    
                }}
            />
        </View>
    );
}

export default NotificationSender;