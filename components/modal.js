import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Button, Image, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Text, View } from '@/components/Themed';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

export default function ModalScreen({ modalVisible, setModalVisible, type }) {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');

  const getImage = async () => {
    const url = `https://nekos.best/api/v2/${type}?amount=1`;
    try {
      const response = await axios.get(url);
      setImageUrl(response.data.results[0].url);
      setName(response.data.results[0].anime_name)
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      getImage();
    }
  }, [modalVisible]);

  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + imageUrl.split('/').pop();
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Image downloaded successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to download image');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
      <Text style={styles.text}>{name}</Text>
        <View style={styles.modalView}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.modalText}>Loading...</Text>
          )}
        </View>
          <View style={styles.buttonContainer}>
         
            <Button title="Download Image" onPress={handleDownload} />
            <Button title="Next" onPress={getImage} />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191E31",
  },
  modalView: {
    borderRadius: 20,
    width: 360,
    height: 300,
    margin: 5,
    borderWidth: 2,
    borderColor: "#9b9b9b",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: 'cover',

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "transparent",

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text:{
     color:"white",
     fontSize:23,
     marginTop:5,
     textAlign:"center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
