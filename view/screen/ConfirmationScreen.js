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
import { useDispatch, useSelector } from "react-redux";

import { steps } from "../data";
import { useContext } from "react";
import { UserData } from "../UserContext";
import Api from "../api";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartRedux";

const ConfirmationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { addresses, userId } = useContext(UserData);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const total = useSelector((state) => state.cart.total);
  const cart = useSelector((state) => state.cart.cart);
  // const total = cart
  //   ?.map((item) => item.price * item.quantity)
  //   .reduce((curr, prev) => curr + prev, 0);

  console.log(total);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await Api.post("/api/v1/orders", orderData);

      if (response.status === 200) {
        navigation.navigate("order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pay = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await Api.post("/api/v1/orders", orderData);

      if (response.status === 200) {
        navigation.navigate("order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
            <View
              key={index}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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

                <View style={{ marginLeft: 4 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
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
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#008397",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 20,
                        }}
                      >
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

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Choose your delivery options
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome5
                name="dot-circle"
                size={20}
                color="#008397"
                onPress={() => setOption(!option)}
              />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm
              </Text>{" "}
              - FREE delivery with your Prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#008397",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Method
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text> Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => {
              if (selectedOption === "cash" || selectedOption === "card") {
                setCurrentStep(3);
              } else {
                Alert.alert(
                  "Payment Method Required",
                  "Please select a payment method (Cash or Card) before proceeding.",
                  [{ text: "OK" }]
                );
              }
            }}
            style={{
              backgroundColor: "#008397",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Items
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>${total}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Delivery
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>$0</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                ${total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#008397",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white" }}>Place your order</Text>
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
