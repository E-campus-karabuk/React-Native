import React from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

export default function RequestDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Request Detail:</Text>

      <View style={styles.rowContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Sender Name:</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Request Type:</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Request Date:</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Request Status:</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View style={styles.filesContainer}>
        <Text style={styles.filesLabel}>Request Files:</Text>
        <View style={styles.fileCard}>
          <View style={styles.fileRow}>
            <View style={styles.fileItem}>
              <Image
                source={require("../assets/pdf.png")}
                style={styles.fileImage}
              />
              <Text style={styles.fileExtension}>Week 3 Notes.xls</Text>
            </View>
            <View style={styles.fileItem}>
              <Image
                source={require("../assets/pdf.png")}
                style={styles.fileImage}
              />
              <Text style={styles.fileExtension}>Week 3 Notes.ppt</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.contentLabel}>Request Content:</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris
        </Text>
      </View>

      <Text style={styles.replyLabel}>Reply:</Text>
      <View style={styles.replyContainer}>
        <TextInput style={styles.replyInput} multiline={true} />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
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
