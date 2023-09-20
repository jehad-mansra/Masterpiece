import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserData } from "../UserContext";

import Header from "../components/Header";

const AddressScreen = () => {
  const navigation = useNavigation();

  const { fetchAddresses, addresses } = useContext(UserData);

  useEffect(() => {
    fetchAddresses();
  }, []);

  // refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
            marginBottom: 15,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#E5E5E5",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                backgroundColor: "#FAFAFA",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: "bold", flex: 1 }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="#FF3D00" />
              </View>

              <Text style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}>
                Jordan, Amman
              </Text>

              <Text style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}>
                Phone No: {item?.mobileNo}
              </Text>

              <Text
                style={{ fontSize: 15, color: "#333333", marginBottom: 10 }}
              >
                Pin Code: 11592
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>

                <Pressable style={styles.removeButton}>
                  <Text style={styles.buttonText}>Remove</Text>
                </Pressable>

                <Pressable style={styles.defaultButton}>
                  <Text style={styles.buttonText}>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "#90CAF9", // Light Blue
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#64B5F6", // Darker Blue
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: "#EF9A9A", // Light Red
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E57373", // Darker Red
    marginRight: 10,
  },
  defaultButton: {
    backgroundColor: "#A5D6A7", // Light Green
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#81C784", // Darker Green
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000", // Black
  },
});
