import React, {useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function AlertScreen({ navigation }) {

  const [perigo, setPerigo] = useState(true);
  const [textoBotaoPerigo, setTextoBotaoPerigo] = useState("Fora de perigo");
  const [textoCentral, setTextoCentral] = useState("Atenção! Você está em uma zona de RISCO");
  const [textoContato, setTextoContato] = useState("Seus contatos de emergência já foram acionados!");
  const [disabledBotaoCamera, setDisabledBotaoCamera] = useState(true);

  const clickBotaoPerigo = () => {
    if (perigo) {
      setPerigo(false);
      setTextoBotaoPerigo("Estou em perigo");
      setTextoCentral("Você está em uma zona fora de risco");
      setTextoContato("");
      setDisabledBotaoCamera(false);
    } else {
      setPerigo(true);
      setDisabledBotaoCamera(true);
      setTextoBotaoPerigo("Fora de perigo");
      setTextoCentral("Atenção! Você está em uma zona de RISCO");
      setTextoContato("Seus contatos de emergência já foram acionados!");
    }

  }

  return (
    <Background>
      <Logo />
      <Header>PERIGO!!!</Header>
      <Paragraph>
       {textoCentral}
      </Paragraph>
      <Paragraph>
        {textoContato}
      </Paragraph>
      <Button
        mode="outlined"
        onPress={clickBotaoPerigo}
      >
        {textoBotaoPerigo}
      </Button>
      <Button
        mode="outlined"
        disabled={disabledBotaoCamera}
        onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'CameraApp' }],
            })
          }
      >
        Registrar foto
      </Button>
      <Button
        mode="outlined"
        disabled
        onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'MapView' }],
            })
          }
      >
        Visualizar Mapa
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
      >
        Dashboard
      </Button>
    </Background>
  )
}
