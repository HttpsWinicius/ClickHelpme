/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { firebaseConfig } from '../config/firebaseconfig'
import { getAuth, sendPasswordResetEmail  } from "firebase/auth"

export default function ResetPasswordScreen({ navigation }) {
  const auth = getAuth();

  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
      sendPasswordResetEmail(auth, email.value)
      .then(() => {
        navigation.navigate('LoginScreen')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Resetar senha</Header>
      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Você receberá um link em seu e-mail para atualizar sua senha"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Siga as instruções
      </Button>
    </Background>
  )
}
