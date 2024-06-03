import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Drawer from "../../shared/drawer";
import { Feather } from "@expo/vector-icons";
import BottomNavBar from "../../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const CourseDetailsLecturer = ({ route }) => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const { courseId, courseName, instructor } = route.params;
  const goToLecturerProfile = () => {
    navigation.navigate("LecturerProfile");
  };

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL: ", err)
    );
  };

  useLayoutEffect(() => {
    const fetchTokenAndCourse = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/course/${courseId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log({data});
          setResponse(data);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchTokenAndCourse();
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

  return (
    <View style={styles.container}>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isLecturer={true}
      />
      {!isDrawerOpen && (
        <View style={styles.mainContent}>
          <ScrollView>
          <Text style={styles.code}>{response?.courseCode}</Text> 
            <Text style={styles.cName}> {response?.courseName}</Text>
            {/* <Text style={styles.describtion}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text> */}
            <TouchableOpacity onPress={goToLecturerProfile}>
              <View style={styles.instructorRec}>
                <Image
                  source={require("../../assets/avatar-man-square.png")}
                  style={styles.avatar}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.instructorRecText}>
                    Dr. {response?.lecturer[0].firstName}{" "}
                    {response?.lecturer[0].lastName}
                  </Text>
                  {/* <Text style={styles.viewProfileText}>View Profile</Text> */}
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.tableHeader}>
              <Text style={styles.headingRecText}> Notes & Related Files</Text>
            </View>

            {/* <View style={styles.tableHeader}>
              <Text style={styles.category}>Category Name</Text>
              <View style={styles.searchBar}>
              // TODO: HANDLE THE SERACH
                <TextInput
                  style={styles.textInput}
                  placeholder="Search"
                  placeholderTextColor="gray"
                />
                <EvilIcons
                  name="search"
                  size={18}
                  color="gray"
                  style={styles.icon}
                />
              </View>
              <TouchableOpacity style={styles.whiteFilterButton}>
                <Text style={styles.whiteFilterButtonText}>Sort By</Text>
              </TouchableOpacity>
              // TODO: HANDLE THE FILTER
              <TouchableOpacity style={styles.whiteFilterButton}>
                <Text style={styles.whiteFilterButtonText}>Filter</Text>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={10}
                  color="#C8272E"
                />
              </TouchableOpacity>
            </View> */}
            <View style={styles.card}>
              <ScrollView>
                {response?.notes?.map((note) => {
                  return (
                    <TouchableOpacity
                      style={styles.smallcard}
                      onPress={() =>
                        handlePress(
                          `${process.env.EXPO_PUBLIC_API_URL}/${note.file}`
                        )
                      }
                    >
                      <Image
                        source={require("../../assets/pdf.png")}
                        style={styles.fileTypeImg}
                      />
                      <View style={styles.textContainerTable}>
                        <Text style={styles.tableCardHeading}>
                          {note.title}
                        </Text>
                        <Text style={styles.tableCardDate}>
                          {new Date(note.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.cardIconContainer}>
                        <View style={styles.cardIcon}>
                          <Entypo
                            name="dots-three-horizontal"
                            size={13}
                            color="#1F3D75"
                          />
                        </View>
                        {/* TODO: HANDLE THE EDIT */}
                        <View style={styles.cardIcon}>
                          <Feather name="edit-2" size={13} color="#1F3D75" />
                        </View>
                        {/* TODO: HANDLE THE DELETE */}
                        <View style={styles.cardIcon}>
                          <AntDesign name="delete" size={13} color="#1F3D75" />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
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

      {!isDrawerOpen && <BottomNavBar isLecturer={true} />}
    </View>
  );
};

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
  describtion: {
    fontSize: 15,
    textAlign: "left",
    marginHorizontal: "7.5%",
    marginTop: 2,
    color: "#C8272E",
  },
  instructorRec: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#223F76",
    width: 240,
    borderRadius: 4,
    marginTop: 30,
    marginLeft: "5%",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  instructorRecText: {
    fontSize: 12,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  viewProfileText: {
    marginTop: 5,
    fontSize: 10,
    color: "#FFFFFF",
  },
  avatar: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: "#223F76",
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 37,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(245, 245, 245, 0.32)",
    backgroundColor: "rgba(210, 210, 210, 0.20)",
    marginLeft: 16,
    marginTop:25,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  searchBar: {
    flexDirection: "row",
    width: 121,
    height: 19,
    borderRadius: 4,
    backgroundColor: "rgba(210, 210, 210, 0.60)",
    padding: 2,
  },
  searchText: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: 7,
    marginRight: "45%",
    marginBottom: 2,
    color: "#ffffff",
  },
  category: {
    fontSize: 10,
    textAlign: "left",
    marginHorizontal: "3%",
    marginTop: 2,
    color: "#C8272E",
  },
  whiteFilterButton: {
    flexDirection: "row",
    width: 60,
    height: 19,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    padding: 2,
    marginLeft: 5,
    alignItems: "center",
  },
  whiteFilterButtonText: {
    fontSize: 10,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 3,
    color: "#C8272E",
  },
  card: {
    width: 360,
    height: 322,
    backgroundColor: "rgba(245, 245, 245, 0.1)",
    borderRadius: 4,
    shadowOpacity: 50,
    shadowOffset: 60,
    shadowColor: "#E8E8E8",
    marginLeft: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    marginBottom: "40%",
    paddingVertical: 15,
  },
  smallcard: {
    flexDirection: "row",
    width: 340,
    height: 86,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginBottom: 7,
    marginLeft: 8,
    paddingHorizontal: 5,
  },
  cardIconContainer: {
    marginLeft: "20%",
    marginTop: 20,
    marginBottom: "10%",
    justifyContent: "right",
  },

  cardIcon: {
    marginBottom: "30%",
    justifyContent: "right",
  },
  tableCardHeading: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "10%",
    marginTop: 20,
    color: "#1F3D75",
  },
  textContainerTable: {
    alignItems: "left",
  },
  fileTypeImg: {
    width: 57,
    height: 70,
    alignSelf: "center",
  },
  tableCardDate: {
    fontSize: 9,
    textAlign: "left",
    marginTop: 15,
    marginRight: "20%",
    marginLeft: "10%",
    color: "#1F3D75",
  },
  icon: {
    marginLeft: "40%",
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    marginLeft: "7%",
  },
  headingRec: {
    flexShrink: 0,
    height: 37,
    backgroundColor: "#E8E8E8",
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 10,
  },
  headingRecText: {
    marginLeft:10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#C8272E",
  },
  code: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    padding: 20,
    color: "#C8272E",
  },
  cName: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: '3.5%',
    color: "#223F76",
  },
});

export default CourseDetailsLecturer;
