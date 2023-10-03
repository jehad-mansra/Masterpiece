import React, { useEffect, useState, useContext } from "react";

import { UserData } from "../UserContext";

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Api from "../api";

const AddAddressScreen = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");

  const { userId, setUserId, fetchUser } = useContext(UserData);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAddAddress = async () => {
    const address = { name, mobileNo, houseNo, street };

    await Api.post("/api/v1/addresses", { address, userId })
      .then((response) => {
        Alert.alert("Success", "Addresses added successfully");
        setName("");
        setHouseNo("");
        setMobileNo("");
        setStreet("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header} />
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Add a New Address</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          style={styles.input}
        />
        <TextInput
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          placeholder="Flat, House No."
          style={styles.input}
        />
        <TextInput
          value={street}
          onChangeText={(text) => setStreet(text)}
          placeholder="Area, Street"
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={handleAddAddress}>
          <Text style={styles.addButtonLabel}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    height: 50,
    backgroundColor: "#00CED1",
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#FFC72C",
    padding: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  addButtonLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddAddressScreen;
