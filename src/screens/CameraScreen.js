import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Dimensions,Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';

export default function CamepraApp ({ navigation }) {

  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  
  const cameraRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const res = await MediaLibrary.requestPermissionsAsync();
      if (res.granted) {
        MediaLibrary.getAlbumsAsync()
        .then((albums) => console.log(albums))
        .catch((err) => console.warn(err))
      }})();
  },[]);

  if (hasPermission === null) {
    return <View/>
  }
  if (hasPermission === false) {
    return <Text style={{fontSize:30}}>Acesso negado!</Text>
  }
  
  const takePhoto = async () => {
   if (cameraRef) {
    const uriPhoto = await cameraRef.current.takePictureAsync();
    setPhoto(uriPhoto.uri);
    setOpenModal(true);
   }
  }

  const savePhoto = async () => {
      const asset = await MediaLibrary.createAssetAsync(photo)
      .then(() => {
          alert('Salvo com sucesso')
          setOpenModal(false);
      })
      .catch(error => {
        console.log("err", error)
      })
  }
  return (
    <View style={styles.container}>
       <View style={styles.viewText}>
        <Text style={styles.text}>App Camera e Map!</Text>
      </View>
      <Camera 
        style={styles.camera} 
        type={typeCamera} 
        ref={cameraRef}>
        <TouchableOpacity 
          style={styles.touchButton} onPress={() => {
            setTypeCamera(
              typeCamera === Camera.Constants.Type.back 
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back)
          }}>
          <Text style={styles.textButton}>Alterar câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={takePhoto}>
          <Text style={styles.textButton}>Registrar foto</Text>
        </TouchableOpacity>
        { photo && 
          <Modal
            animationType="slide"
            transparent={false}
            visible={openModal}
          >
            <View style={styles.viewModal}>
              <Text style={styles.text}>Minha foto!</Text>
              <Image
                style={{margin: 20, width: 320, height: 500}}
                source={{uri:photo}}
              />
              <TouchableOpacity
                style={styles.touchButton}
                onPress={savePhoto}>
                <Text>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchButton}
                onPress={() => {setOpenModal(false)}}>
                <Text>Voltar</Text>
              </TouchableOpacity>
            </View>
          </Modal>       
        }    
      </Camera> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35,
  },
  viewText: {
    flex: 0.1,
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',    
  },
  camera: {
    flex: 0.7,
    margin: 40,
  },
  viewButton: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  }, 
  touchButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  button: {
    flex: 0.5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    margin:2,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
  viewModal: {
    flex:1,
    alignItems: 'center',
    margin: 30,
    padding: 20
  },
  
});