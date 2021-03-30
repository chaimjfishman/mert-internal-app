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

import Constants from 'expo-constants'; //TODO: remove for production


export default function LoginScreen(props: AuthStackScreenProps<'Login'>) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        props.navigation.navigate('Registration');
    }

    const goToForgotPassword = () => {
        props.navigation.navigate('ForgotPassword');
    }
    
    const onLoginPress = async () => {
        try {
            const uid: string = await auth.loginWithEmail(email, password);
            const user: User = await db.getUserDocument(uid);

            //TODO: remove check for production!!!
            let webBrowsers: string[] = ['Safari', 'Chrome'];
            console.log(`deviceName: ${Constants.deviceName}`)
            // Ensure app is running on physical device; push notifications won't work on simulator
            if (Constants.isDevice && !webBrowsers.includes(Constants.deviceName)) {
                let token = await notif.registerForPushNotificationsAsync();
                await db.updatePushToken(uid, token)
            } 

            login(user);
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
                <View style={styles.footerView}>
                    <Text onPress={goToForgotPassword} style={styles.footerLink}>Forgot Password?</Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}