import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../shared/styles";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// TODO: ADD THE NOTIFICATION FUNCTIONALITY

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const Notifications = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);

  useLayoutEffect(() => {
    const fetchTokenAndNotis = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/notification/`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //  console.log(data);
          setResponse(data);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchTokenAndNotis();
  }, [token]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleLogOut = () => {
    navigation.navigate("E-campus");
  };

  const handleDrawerItemPress = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false); // Close the drawer after navigating
  };
  const handleBottomNavBar = (screenName) => {
    navigation.navigate(screenName);
  };
  const getTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const notificationTime = new Date(createdAt);
    const timeDifference = currentTime - notificationTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
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
          <Text style={styles.heading}>Notifications</Text>
          <View style={styles.tableHeaderNotification}>
            <TouchableOpacity style={styles.whiteFilterButtonNotification}>
              <Text style={styles.whiteFilterButtonTextNotification}>
                Filter
              </Text>
              <MaterialCommunityIcons
                name="filter-menu"
                size={15}
                color="#C8272E"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteFilterButtonNotification}>
              <Text style={styles.whiteFilterButtonTextNotification}>
                Show All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteFilterButtonNotification}>
              <Text style={styles.whiteFilterButtonTextNotification}>
                Unread
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {response?.noti?.map((notification) => {
              return (
                <TouchableOpacity
                  style={styles.smallcard}
                  key={notification._id}
                >
                  <Image
                    source={require("../assets/profile-user.png")}
                    style={styles.ProfilePicIcon}
                  />
                  <View style={styles.textContainerTable}>
                    <Text style={styles.tableCardHeading}>
                      {notification.title}
                    </Text>
                    <Text style={styles.tableCardMsgPreview}>
                      {notification.content}..
                    </Text>
                  </View>

                  <View style={styles.textContainerTable}>
                    <View style={styles.cardIconTable}>
                      <Text style={styles.notificationTime}>
                        {getTimeAgo(notification.createdAt)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
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
};

export default Notifications;
