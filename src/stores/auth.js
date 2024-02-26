import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    username: "",
    password: "",
    isConnected: false,
  }),
  actions: {
    setAuthData(username, password, isConnected) {
      this.username = username;
      this.password = password;
      this.isConnected = isConnected;
      localStorage.setItem(
        "authData",
        JSON.stringify({
          username: this.username,
          password: this.password,
          isConnected: this.isConnected,
        })
      );
    },
    loadAuthData() {
      const storedData = JSON.parse(localStorage.getItem("authData"));
      console.log("loadAuthData: storedData", storedData);
      if (storedData) {
        this.username = storedData.username;
        this.password = storedData.password;
        this.isConnected = storedData.isConnected;
        console.log(`loadAuthData: isConnected = ${this.isConnected}`);
      }
    },
    logout() {
      this.setAuthData("bob", "bob", false);
      console.log("User logged out");
    },
  },
});
