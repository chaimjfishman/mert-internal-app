import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import * as db from '../../utils/db';
import * as auth from '../../utils/auth';
import { AuthStackScreenProps } from '../../constants/navigationScreenTypes'
import { User, Shift} from '../../constants/collectionTypes'


export default function RegistrationScreen(props: AuthStackScreenProps<'Registration'>) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        console.log('onFooterLinkPress registration')
        props.navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
       console.log('onRegisterPress')

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

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
                takenAthleticShift: false
            };

            const shiftData: Shift = {
                userId: uid,
                nextShiftStart: "", //list of shifts
                hoursRemaining: 0
            };

            await db.createUserDocument(uid, userData);
            await db.createShiftsDocument(uid, shiftData);

            //TODO: handle navigation properly: https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
            // props.navigation.navigate('Home', {user: userData})
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
                    source={require('../../../assets/icon.png')}
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