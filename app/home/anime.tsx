import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { MasonryFlashList } from "@shopify/flash-list";
import PreviewModal from "../../components/PreviewModal";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-2514671156039106/5736657114';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Anime = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [is404, setIs404] = useState(false);
  const params = useLocalSearchParams();
  const query = params.category ? params.category.toString() : "Senko";
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [imageCallCount, setImageCallCount] = useState(0);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const getImages = async (retry = true) => {
    setIsLoading(true);
    const url = `https://nekos.best/api/v2/${query}?amount=10`;

    try {
      const response = await axios.get(url);
      setImages(response.data.results);
      setImageCallCount(prevCount => prevCount + 1);
    } catch (error) {
      if (retry) {
        getImages(false);
      } else {
        setIs404(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (imageCallCount === 4 && loaded) {
      rewarded.show();
      setImageCallCount(0); // Reset the counter after showing the ad
    }
  }, [imageCallCount, loaded]);

  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageCallCount(prevCount => prevCount + 1);
    setModalVisible(true);
  };

  const getImageStyle = (height: number) => ({
    width: 180,
    height,
    borderWidth: 2,
    borderColor: "#9b9b9b",
    resizeMode: "cover" as const,  // Correcting this line
    backgroundColor: "#0553",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {is404 && <Text style={styles.errorText}>404 Not Found</Text>}
      <View style={styles.listContainer}>
        <MasonryFlashList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.photo}
          numColumns={2}
          estimatedItemSize={276}  // Adding estimatedItemSize
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openModal(item.url)}
            >
              <Image
                source={{ uri: item.url }}
                style={[styles.box, getImageStyle(200 + Math.random() * 100)]} // Adjust height dynamically
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={100}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <PreviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        imageUrl={selectedImageUrl}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => getImages()}
      >
        <Text style={styles.textStyle}>Get more</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191E31",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: 8,
  },
  box: {},
  btnItem: {
    flexDirection: "row",
  },
  imageText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  loading: {
    position: "absolute",
    zIndex: 9,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "80%",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderWidth: 2,
    borderColor: "#2196F3",
    width: "80%",
  },
  photo: {
    paddingHorizontal: 5,
  },
});

export default Anime;
