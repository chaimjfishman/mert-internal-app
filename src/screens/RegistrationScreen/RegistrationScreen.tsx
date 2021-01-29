import React, { useState, useEffect, useContext, useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Notifications from 'expo-notifications';
import styles from './styles';
import * as db from '../../utils/db';
import * as auth from '../../utils/auth';
import * as notif from '../../utils/notifications'; 
import { AuthStackScreenProps } from '../../constants/navigationScreenTypes';
import { User, Shift } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";


export default function RegistrationScreen(props: AuthStackScreenProps<'Registration'>) {
    const { login } = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
  
         // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
  
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
  
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const onFooterLinkPress = () => {
        props.navigation.navigate('Login');
    }

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters')
            return;
        }

        notif.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        try {
            const uid: string = await auth.signUp(email, password);

            const userData: User = {
                id: uid,
                email,
                fullName,
                rank: "",
                gradYear: 2021,
                boardPosition: "",
                dateJoinedMERT: "",
                profileImagePath: `profileImages/${email}.png`,
                formCompleted: false,
                takenAthleticShift: false,
                pushToken: expoPushToken
            };

            const shiftData: Shift = {
                userId: uid,
                nextShiftStart: "", //list of shifts
                hoursRemaining: 0
            };

            await db.createUserDocument(uid, userData);
            await db.createShiftsDocument(uid, shiftData);
            login(userData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/Penn_MERT_Logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}