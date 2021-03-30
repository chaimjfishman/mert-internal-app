import React, { Component, Fragment } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './styles'
import { Button } from 'react-native-paper'
import { AuthStackScreenProps } from '../../constants/navigationScreenTypes';
import * as auth from '../../utils/auth';

export default function ForgotPassword(props: AuthStackScreenProps<'ForgotPassword'>){
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .label('Email')
          .email('Enter a valid email')
          .required('Please enter a registered email')
      })

      const handlePasswordReset = async (values, actions) => {
        const { email } = values
      
        try {
          await auth.passwordReset(email)
          console.log('Password reset email sent successfully')
          props.navigation.navigate('Login')
        } catch (error) {
          actions.setFieldError('general', error.message)
        }
      }

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            handlePasswordReset(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit
          }) => (
            <Fragment>
            <TextInput
                style={styles.input}
                placeholder='Enter email'
                placeholderTextColor="#aaaaaa"
                onChangeText={handleChange('email')}
                value={values.email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
                <Text onPress={handleSubmit} style={styles.buttonTitle}>Send Email</Text>
            </View>
            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    )
}


