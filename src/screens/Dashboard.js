/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation }) {


  return (
    <Background>
      <Logo />
      <Header>Olá</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'AlertScreen' }],
          })
        }
      >
        Estou em perigo
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'CriarUsuarioScreen' }],
          })
        }
      >
        Criar Contato
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Sair da conta
      </Button>
    </Background>
  )
}
