import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  updateTotal,
} from "../redux/CartRedux";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  console.log(total);

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const navigation = useNavigation();

  return (
    <ScrollView style={{ marginTop: 33, flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable
        onPress={() => {
          if (cart.length > 0) {
            // Dispatch the action to update total in global state
            dispatch(updateTotal(total));
            navigation.navigate("Confirm");
          } else {
            // Display an alert if cart is empty
            Alert.alert(
              "Cart Empty",
              "Please add items to your cart before proceeding.",
              [{ text: "OK" }]
            );
          }
        }}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  {item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={styles.minusButton}
                  >
                    <AntDesign name="minus" size={24} color="white" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={styles.deleteButton}
                  >
                    <AntDesign name="delete" size={24} color="white" />
                  </Pressable>
                )}

                <Pressable style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={styles.plusButton}
                >
                  <Feather name="plus" size={24} color="white" />
                </Pressable>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{ ...styles.customButton, marginLeft: 3 }}
                >
                  <Text style={styles.customButtonText}>Delete</Text>
                </Pressable>
              </View>
            </Pressable>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <Pressable style={styles.customButton}>
                <Text style={styles.customButtonText}>Save For Later</Text>
              </Pressable>

              <Pressable style={styles.customButton}>
                <Text style={styles.customButtonText}>See More Like This</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  minusButton: {
    backgroundColor: "#F5A623",
    padding: 7,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#D0021B",
    padding: 7,
    borderRadius: 6,
  },
  plusButton: {
    backgroundColor: "#4A90E2",
    padding: 7,
    borderRadius: 6,
  },
  customButton: {
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  customButtonText: {
    color: "#2A2D34",
  },
  quantityContainer: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  quantityText: {
    fontSize: 16,
  },
});
