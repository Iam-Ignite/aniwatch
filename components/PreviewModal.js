import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Button,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Text, View } from "@/components/Themed";
import * as MediaLibrary from "expo-media-library";
import { NativeModules } from "react-native";


const { WallpaperModule } = NativeModules;

export default function PreviewModal({
  modalVisible,
  setModalVisible,
  imageUrl,
}) {
  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + imageUrl.split("/").pop();
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Alert.alert("Image downloaded successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to download image");
    }
  };



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.btnItem}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleDownload}
          >
            <Text style={styles.textStyle}>Download</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose2]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle2}>Close !</Text>
          </Pressable>
        
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingBottom:35,
    // marginTop:-90,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#191E31",
  },
  btnItem: {
    // flexDirection: "row",
    alignContent:"center",
    gap:5,
    backgroundColor: "transparent",
    marginTop:10,
    width:"90%"


  },
  modalView: {
    borderRadius: 20,
    width: "95%",
    height: 650,
    margin: 5,
    borderWidth: 2,
    borderColor: "#9b9b9b",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 700,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:"100%"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderWidth:2,
    borderColor:"#2196F3",
    width:"100%"
    
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    paddingHorizontal:5,
    textAlign: "center",
  },
  buttonClose2: {
    backgroundColor: "transparent",
    borderWidth:2,
    borderColor:"#9b9b9b",
    width:"100%"
    
  },
  textStyle2: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal:4,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
