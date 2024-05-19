import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import PreviewModal from "../../components/PreviewModal";
import { MasonryFlashList } from "@shopify/flash-list";
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-2514671156039106/5736657114';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Index = () => {
  const [images, setImages] = useState<string[]>([]);
  const [exclude, setExclude] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [is404, setIs404] = useState(false);
  const params = useLocalSearchParams();
  const category = params.category ? params.category.toString().toLowerCase()  : "neko";
  const type = params.type ? params.type.toString(): "sfw";
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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
    const endpoint = category || "neko";
    const url = `https://api.waifu.pics/many/${type}/${endpoint}`;

    try {
      const response = await axios.post(url, { exclude });
      setExclude((prevExclude) => [...prevExclude, ...response.data.files]);
      setImages(response.data.files);
      setImageCallCount(prevCount => prevCount + 1);
    } catch (error) {
      if (retry) {
        setExclude([]);
        getImages(false);
      } else {
        setIs404(true);
      }
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (imageCallCount === 4 && loaded) {
      rewarded.show();
      setImageCallCount(0); // Reset the counter after showing the ad
    }
  }, [imageCallCount, loaded]);

  useEffect(() => {
    if (category) {
      getImages();
    }
  }, [category]);

  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
    setImageCallCount(prevCount => prevCount + 1);

  };

  const getImageStyle = (height: number) => ({
    width: 180,
    height,
    borderWidth: 2,
    borderColor: "#9b9b9b",
    resizeMode: "cover" as const,
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
          estimatedItemSize={276}
          renderItem={({ item }: any) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image
                source={{ uri: item }}
                style={[styles.box, getImageStyle(200 + Math.random() * 100)]}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={100}
                // Replace placeholder and contentFit with appropriate properties if necessary
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
  box: {
    // height: "auto",
  },
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
  button: {
    position: "absolute",
    bottom: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "80%",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 5,
    textAlign: "center",
  },
  loading:{
    position:"absolute",
    zIndex:9,
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

export default Index;
