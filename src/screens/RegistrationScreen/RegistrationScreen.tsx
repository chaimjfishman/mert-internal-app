import React, { useState, useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import * as db from '../../utils/db';
import * as auth from '../../utils/auth';
import * as notif from '../../utils/notifications'; 
import { AuthStackScreenProps } from '../../constants/navigationScreenTypes';
import { User } from '../../constants/collectionTypes';
import { AuthContext } from "../../providers/AuthProvider";
import Constants from "expo-constants";



export default function RegistrationScreen(props: AuthStackScreenProps<'Registration'>) {
    const { login } = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [expoPushToken, setExpoPushToken] = useState<string | null>('');

    const onFooterLinkPress = () => {
        props.navigation.navigate('Login');
    }

    const onRegisterPress = async () => {
        let isWhitelisted: boolean = await db.confirmWhitelist(email);
        if (!isWhitelisted) {
            alert("The email you entered does not have the permissions to register on this app.\n\nIf you believe this is an error, confirm with the MERT admin that your email has been added to the white list.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password == "123456" || password == "password") {
            alert("Please provide a stronger password.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters.')
            return;
        }

        if (password == "123456" || password == "password") {
            alert("Please provide a stronger password.");
            return;
        }


        //TODO: remove check for production!!!
        let webBrowsers: string[] = ['Safari', 'Chrome'];
        console.log(`deviceName: ${Constants.deviceName}`)
        // Ensure app is running on physical device; push notifications won't work on simulator
        if (Constants.isDevice && !webBrowsers.includes(Constants.deviceName)) {
            // Get user's notification push token
            await notif.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        } else {
            setExpoPushToken(null)
        }

        try {
            const uid: string = await auth.signUp(email, password);

            const userData: User = {
                id: uid,
                email,
                fullName,
                rank: "",
                gradYear: null,
                boardPosition: "",
                dateJoinedMERT: "",
                profileImagePath: `profileImages/${email}.png`,
                formCompleted: false,
                takenAthleticShift: false,
                pushToken: expoPushToken
            };

            await db.createUserDocument(uid, userData);
            login(userData);
        } catch (err) {
            alert(err);
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