import axios from "axios";

const Api = axios.create({
  baseURL: "https://7f7f-178-77-173-220.ngrok-free.app",
});

export default Api;
