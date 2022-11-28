import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { db } from '../config/firebaseconfig'
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { set } from 'react-native-reanimated'

export default function CriarUsuarioScreen ({ navigation }) {

  const [name, setName] = useState({ value: '', error: '' })
  const [celular, setCelular] = useState({ value: '', error: '' })
  const [contatoSalvo, setContatoSalvo] = useState();

  const criarContatoEmergencia = () => {
    const nameError = nameValidator(name.value)

    if (nameError) {
      setName({ ...name, error: nameError })
      return
    }

    criarContato(name.value, celular.value);
  }

  const criarContato = (nome, telefone) => {
    
    addDoc(collection(db, "contato"), 
    {
    nome: nome,
    telefone: telefone,
    })
    .then( () => {
        setContatoSalvo("Contato cadastrado com sucesso!");
    })
    .catch(error => {
        console.log(error);
    })

  }

   const visualizarContato = async () => {

    alert("Os contatos serão exibidos no console");

    const querySnapshot = await getDocs(collection(db, "contato"));

    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
        });
  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Criar Contato</Header>
      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Celular"
        returnKeyType="next"
        value={celular.value}
        onChangeText={(text) => setCelular({ value: text, error: '' })}
        autoCapitalize="none"
        keyboardType="phone-pad"
      />
      <Button
        mode="contained"
        onPress={criarContatoEmergencia}
        style={{ marginTop: 24 }}
      >
        Salvar Contato
      </Button>
      <Paragraph>
        {contatoSalvo}
      </Paragraph>
      <Button
        mode="contained"
        onPress={visualizarContato}
        style={{ marginTop: 24 }}
      >
        Visualizar Contatos
      </Button>
      <Button
        mode="text"
        onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
      >
        Cancelar
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
