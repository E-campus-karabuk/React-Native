import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        navigation.navigate("Home");
      }
    };

    checkLogin();
  }, []);

  const handleLogin2 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
        {
          email: username,
          password: password,
        }
      );

      await SecureStore.setItemAsync("token", JSON.stringify(data?.token));
      await SecureStore.setItemAsync("role", JSON.stringify(data?.role));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      console.log(process.env.EXPO_PUBLIC_API_URL);
    }
  };

  const handleLogin = () => {
    if (
      username === "20102135@ogrenci.karabuk.edu.tr" &&
      password === "123456"
    ) {
      navigation.navigate("Home"); // Navigate to student screen
    } else if (username === "lec" && password === "p") {
      navigation.navigate("HomeLecturer"); // Navigate to lecturer screen
    } else {
      console.log("Invalid credentials");
    }

    // Clear the input fields after logging in
    setUsername("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={require("../assets/login_background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require("../assets/kbu_logo.png")} style={styles.logo} />

        <Text style={styles.title}>Welcome to E-campus!</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.subsubtitle}>Forgot your password?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin2}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 360,
    height: 408,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#223F76",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#C8272E",
  },
  subsubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#223F76",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#C8272E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 148,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 70,
    marginBottom: 27,
  },
});

export default Login;
