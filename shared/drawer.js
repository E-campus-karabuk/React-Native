import React, { useState, Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getRole = async () => {
  const role = await SecureStore.getItemAsync("role");
  return JSON.parse(role);
};

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, isLecturer }) => {
  const [role, setRole] = useState(null);

  const handlerRole = async () => {
    const role = await getRole();
    if (role[0] === "Academician") setRole("Lecturer");
  };
  handlerRole();
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    navigation.navigate("E-campus");
  };

  const handleDrawerItemPress = (screenIdentifier) => {
    let isLec;
    if (screenIdentifier === "Academician") {
      isLec = "true";
    }
    const screenName = isLec ? `Lecturer${screenIdentifier}` : screenIdentifier;
    navigation.navigate(screenName);
    setIsDrawerOpen(false); // Close the drawer after navigating
  };
  console.log(role);
  return (
    <View style={styless.container}>
      <View style={styless.navBar}>
        <TouchableOpacity onPress={toggleDrawer} style={styless.menuButton}>
          <Ionicons
            name={isDrawerOpen ? "close" : "menu"}
            size={35}
            color="white"
          />
        </TouchableOpacity>
        {role === "Academician" && (
          <Text style={styless.title}>Lecturer Campus</Text>
        )}
        {role !== "Academician" && <Text style={styless.title}>E-Campus</Text>}
      </View>

      {/*  Drawer Content Goes Here */}
      {isDrawerOpen && (
        <View style={styless.drawer}>
          <TouchableOpacity
            onPress={() => handleDrawerItemPress(`${role}Profile`)}
          >
            <Text style={styless.drawerContent}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDrawerItemPress("Requests")}>
            <Text style={styless.drawerContent}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress("Courses")}>
            <Text style={styless.drawerContent}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress("SPgroups")}>
            <Text style={styless.drawerContent}>Senior Project Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress("Department")}>
            <Text style={styless.drawerContent}>Department</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styless.button} onPress={handleLogOut}>
            <Text style={styless.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#223F76",
    paddingHorizontal: 10,
    padding: "5%",
  },
  menuButton: {
    position: "absolute",
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  drawer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 50,
    backgroundColor: "#223F76",
  },
  drawerContent: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 40,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: "15%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Drawer;
