import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import axios from "axios";
import { MasonryFlashList } from "@shopify/flash-list";
import PreviewModal from "../../components/PreviewModal";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://nekos.best/api/v2/search`, {
        params: {
          query,
          type: 1, // Assuming type and category are fixed values
          amount: 10,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const getImageStyle = (height: number) => ({
    width: 180,
    height,
    resizeMode: "cover" as const, // Correcting this line
    backgroundColor: "#0553",
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={query}
        onChangeText={setQuery}
        autoFocus={true} // Autofocus the input field
        placeholderTextColor="#ccc" // To ensure the placeholder text is visible
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MasonryFlashList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.photo}
          numColumns={2}
          estimatedItemSize={276} // Adding estimatedItemSize
          renderItem={({ item }: any) => (
            <TouchableOpacity
           
              onPress={() => openModal(item.url)}
            >
              <Image
                source={{ uri: item.url }}
                style={[styles.box, getImageStyle(200 + Math.random() * 100)]} // Adjust height dynamically
              />
              <Text style={styles.imageText}>{item.anime_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <PreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUrl={selectedImageUrl}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123752",
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#326384",
  },
  box: {
    borderRadius: 20,
    width: 180,
    margin: 5,
    borderWidth: 2,
    borderColor: "#9b9b9b",
    overflow: "hidden",
    height: "auto",
  },
  imageText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  list: {
    alignItems: "center",
  },
  resultItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  animeName: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  image: {
    width: 175,
    height: 230,
    resizeMode: "cover",
  },
  photo: {
    paddingHorizontal: 5,
  },
});
