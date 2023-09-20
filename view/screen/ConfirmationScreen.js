import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { steps } from "../data";
import { useContext } from "react";
import { UserData } from "../UserContext";

const ConfirmationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  const { fetchAddresses, addresses } = useContext(UserData);

  //   useEffect(() => {
  //     fetchAddresses();
  //   }, []);

  console.log("*********////////", addresses);

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                  backgroundColor: "#FAFAFA",
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
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

                  <Text
                    style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}
                  >
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text
                    style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}
                  >
                    {item?.street}
                  </Text>

                  <Text
                    style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}
                  >
                    Jordan, Amman
                  </Text>

                  <Text
                    style={{ fontSize: 15, color: "#333333", marginBottom: 7 }}
                  >
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
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable style={{}}>
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;
const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "#90CAF9", // Light Blue
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#64B5F6", // Darker Blue
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: "#EF9A9A", // Light Red
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E57373", // Darker Red
    marginRight: 5,
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
