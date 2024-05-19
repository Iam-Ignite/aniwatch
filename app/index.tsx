import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import gifts from "../components/data/Gifs";
import { useRouter } from "expo-router"; // Fixed import statement
import HeaderNav from "../components/headerNav";
import ModalScreen from "../components/modal";
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2514671156039106/9895393975';

const Index = () => {
  const categories = Object.keys(gifts);
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });

    // Preload an app open ad
    appOpenAd.load();

    const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Ad Loaded');
      appOpenAd.show();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Function to navigate to the home page with the selected category
  const handleCategoryPress = (category:string, type:string) => {
    router.push({ pathname: "/home", params: { category, type } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type={type}
      />
      <View>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/header.png")}
            style={styles.headerimageTwo}
          />
        </View>
        <Text style={styles.textHeader}>GIFs</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {categories.map((category, index) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setType(category);
              }}
              key={index}
              style={styles.button}
            >
              <Text style={styles.text}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <HeaderNav />
        <View style={styles.box}>
          <Text style={styles.textSub}>Uncensored</Text>
          <View style={styles.grid}>
            <View style={styles.imgBox}>
              <ImageBackground
                source={require("../assets/images/husbando.jpeg")}
                style={styles.image}
              >
                <TouchableOpacity onPress={() => handleCategoryPress("Blowjob", "nsfw")}>
                  <Text style={styles.txt}>Blowjob</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.imgBox}>
              <ImageBackground
                source={require("../assets/images/trap.jpeg")}
                style={styles.image}
              >
                <TouchableOpacity onPress={() => handleCategoryPress("Trap", "nsfw")}>
                  <Text style={styles.txt}>Trap</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.imgBox}>
              <ImageBackground
                source={require("../assets/images/neko2.jpeg")}
                style={styles.image}
              >
                <TouchableOpacity onPress={() => handleCategoryPress("Neko", "nsfw")}>
                  <Text style={styles.txt}>Neko</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.imgBox}>
              <ImageBackground
                source={require("../assets/images/waifu2.jpeg")}
                style={styles.image}
              >
                <TouchableOpacity onPress={() => handleCategoryPress("Waifu", "nsfw")}>
                  <Text style={styles.txt}>Waifu</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191E31",
    padding: 10,
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    justifyContent: "flex-end",
  },
  search: {
    flexDirection: "row",
    gap: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#326384",
  },
  scrollView: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingVertical: 10,
    marginLeft: 10,
    paddingRight: 15,
  },
  headerimageTwo: {
    width: 100,
    height: 20,
    resizeMode: "cover",
  },
  imageTwo: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
    borderCurve: "continuous",
  },
  image: {
    width: 170,
    height: 220,
    resizeMode: "cover",
    justifyContent: "flex-end",
    padding: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
  },
  imgBox: {
    borderRadius: 10,
    overflow: "hidden",
    width: 170,
  },
  box: {
    padding: 10,
    gap: 5,
  },
  button: {
    marginHorizontal: 6,
    padding: 10,
    backgroundColor: "#00A3FF",
    borderRadius: 5,
    alignItems: "center",
  },
  btnLink: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textHeader: {
    color: "white",
    fontSize: 16,
    paddingLeft: 15,
    fontWeight: "600",
  },
  textSub: {
    color: "white",
    fontSize: 14,
    marginTop: -14,
    marginBottom: 5,
    fontWeight: "600",
  },
  text2: {
    color: "white",
    fontSize: 8,
    marginTop: 2,
  },
  txt: {
    backgroundColor: "#00A3FF",
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    margin: 5,
    fontWeight: "600",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Index;
