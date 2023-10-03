import { StyleSheet, View, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image
        style={styles.splashImage}
        source={require("../assets/logobg-removebg-preview.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00CED1", // Adjust background color as needed
  },
  splashImage: {
    width: 200, // Adjust the width and height to fit your logo
    height: 200,
  },
});

export default SplashScreen;
