import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

export default function RequestDetailScreen({ route }) {
  const { requestId } = route.params;
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);

  useLayoutEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await getToken();
        setToken(token);
        // console.log({ requestId });
        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/request/single/student/${requestId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setResponse(data);
        }
      } catch (error) {
        console.log({ errorRequestPage: error.message });
      }
    };

    fetchTokenAndData();
  }, [token]);

  // console.log({ responseReq: response });
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerItemPress = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };

  const handleBottomNavBar = (screenName) => {
    navigation.navigate(screenName);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isLecturer={false}
      />

      {!isDrawerOpen && (
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.title}>Request Details</Text>

            <View style={styles.rowContainer}>
              <View style={styles.card}>
                <Text style={styles.label}>Receiver Name:</Text>
                <Text style={styles.textValue}>
                  {response?.receiver?.firstName} {response?.receiver?.lastName}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>Request Type:</Text>
                <Text style={styles.textValue}>{response?.type}</Text>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.card}>
                <Text style={styles.label}>Request Date:</Text>
                <Text style={styles.textValue}>
                  {formatDate(response?.createdAt)}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.label}>Request Status:</Text>
                <Text style={styles.textValue}>{response?.status}</Text>
              </View>
            </View>

            <Text style={styles.contentLabel}>Request Content:</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>
                {response?.content ? response.content : "No content available"}
              </Text>
            </View>

            <Text style={styles.replyLabel}>Reply:</Text>
            <View style={styles.replyContainer}>
              <Text style={styles.replyInput}>
                {response?.receiverReply
                  ? response?.receiverReply
                  : "No reply available yet"}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}

      {!isDrawerOpen && (
        <TouchableOpacity
          style={styles.chatpot}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="help-circle-sharp" size={30} color="white" />
        </TouchableOpacity>
      )}

      {!isDrawerOpen && <BottomNavBar isLecturer={false} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    zIndex: 0,
    height: "82%",
    left: 0,
    right: 0,
  },
  scrollViewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#223F76",
    paddingHorizontal: 10,
    zIndex: 100,
  },
  menuButton: {
    marginRight: 102,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#223F76",
    padding: 50,
    zIndex: 99,
  },
  drawerContent: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#C8272E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 148,
    borderRadius: 5,
    marginLeft: "25%",
    marginTop: 74,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    backgroundColor: "#223F76",
    paddingLeft: 10,
    paddingRight: 60,
    paddingBottom: 20,
  },
  bottomNavBarContent: {
    textAlign: "center",
    color: "#FFFFFF",
    marginHorizontal: "16%",
  },
  chatpot: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#223F76",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 80,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: "#223F76",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#223F76",
    fontFamily: "mukta vaani",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
    color: "#1F3D75",
  },
  textValue: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    color: "#1F3D75",
  },
  filesContainer: {
    marginTop: 20,
  },
  filesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F3D75",
  },
  fileCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 3,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fileRow: {
    flexDirection: "row",
    marginLeft: 20,
  },
  fileItem: {
    alignItems: "center",
  },
  fileImage: {
    width: 35,
    height: 35,
    marginBottom: 5,
    marginRight: 20,
  },
  fileExtension: {
    marginRight: 20,
    color: "#1F3D75",
    fontSize: 10,
  },
  contentContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 15,
    color: "#1F3D75",
  },
  contentText: {
    fontSize: 14,
    color: "#1F3D75",
  },
  replyLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 15,
    color: "#1F3D75",
  },
  replyContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  replyInput: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  doneButton: {
    marginBottom: 60,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
  },
  doneButtonText: {
    color: "red",
    fontWeight: "500",
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});
