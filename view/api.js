import axios from "axios";

const Api = axios.create({
  baseURL: "https://31d8-91-186-254-202.ngrok-free.app",
});

export default Api;
