import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import Api from "./api";

const UserData = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [addresses, setAddresses] = useState([]);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
  };

  const fetchAddresses = async () => {
    try {
      const response = await Api.get(`/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <UserData.Provider
      value={{
        userId,
        setUserId,
        fetchUser,
        fetchAddresses,
        setAddresses,
        addresses,
      }}
    >
      {children}
    </UserData.Provider>
  );
};

export { UserData, UserContext };
