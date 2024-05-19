import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { useRouter } from "expo-router";
  
  export default function HeaderNav() {
    const router = useRouter();
  
    // Function to navigate to the home page with the selected category
    const handleCategoryPress = (category: string,) => {
        router.push({ pathname: "/home/anime", params: { category} });
    };
  
    return (
      <View style={styles.box}>
        <Text style={styles.textsub}>Categories </Text>
        <View style={styles.scrollView}>
          <View style={styles.imgBox}>
              <TouchableOpacity onPress={() => handleCategoryPress("Husbando")}>
            <ImageBackground
              source={require("../assets/images/husbando2.jpeg")}
              style={styles.imageTwo}
            >
                <Text style={styles.text}>Husbando</Text>
            </ImageBackground>
              </TouchableOpacity>
          </View>
          <View style={styles.imgBox}>
              <TouchableOpacity onPress={() => handleCategoryPress("Kitsune")}>
            <ImageBackground
              source={require("../assets/images/kitsune.jpeg")}
              style={styles.imageTwo}
            >
                <Text style={styles.text}>Kitsune</Text>
            </ImageBackground>
              </TouchableOpacity>
          </View>
          <View style={styles.imgBox}>
              <TouchableOpacity onPress={() => handleCategoryPress("Neko")}>
            <ImageBackground
              source={require("../assets/images/neko.jpeg")}
              style={styles.imageTwo}
            >
                <Text style={styles.text}>Neko</Text>
            </ImageBackground>
              </TouchableOpacity>
          </View>
          <View style={styles.imgBox}>
              <TouchableOpacity onPress={() => handleCategoryPress("Waifu")}>
            <ImageBackground
              source={require("../assets/images/waifu.jpeg")}
              style={styles.imageTwo}>
                <Text style={styles.text}>Waifu</Text>
            </ImageBackground>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    scrollView: {
      flexDirection: "row", // Ensure horizontal scrolling
      flexWrap: "nowrap",
      paddingVertical: 10,
      marginLeft: 10,
      paddingRight: 15,
      gap: 10,
    },
    imageTwo: {
      width: "100%",
      height: 100,
      resizeMode: "cover",
      marginRight: 5,
      justifyContent:"flex-end",
      // padding:5
    },
    imgBox: {
      borderRadius: 10,
      overflow: "hidden",
      width: 80,
    },
    text:{
      // padding: 10,
      fontSize:10,
      borderRadius:5,
      overflow:"hidden",
      fontWeight:"600",
      backgroundColor: "#00A3FF",
      color:"white",
      textAlign:"center",
      margin:5,
      padding:5,
    },
    textsub: {
      color: "white",
      fontSize: 15,
      // marginBottom:5,
      fontWeight: "600",
    },
    box: {
      padding: 10,
    },
  });
  