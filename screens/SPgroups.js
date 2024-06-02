import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const SPgroups = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [reports, setReports] = useState(null);

  useLayoutEffect(() => {
    const fetchTokenAndGroup = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/senior/studentGroup`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //  console.log(data);
          setResponse(data.group);
          setReports(data.reports);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchTokenAndGroup();
  }, []);

  console.log({ response: response?.students });
  console.log({ reports });

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
  const goToLecturerProfile = () => {
    navigation.navigate("LecturerProfile");
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
          <ScrollView>
            <Text style={styles.heading}>Senior Project Group</Text>
            <View style={styles.courseCardRed}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                  color="#C8272E"
                />
                <Text style={styles.redHeading}> Members</Text>
              </View>
              <View style={styles.membersContainer}>
                {response?.students?.map((student, index) => {
                  return (
                    <Text style={styles.members} key={index}>
                      {" "}
                      {index + 1}.{student.firstName} {student.lastName}
                    </Text>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity onPress={goToLecturerProfile}>
              <View style={styles.instructorRec}>
                <Image
                  source={require("../assets/avatar-man-square.png")}
                  style={styles.avatar}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.instructorRecText}>
                    Dr. {response?.lecturer?.firstName}{" "}
                    {response?.lecturer?.lastName}
                  </Text>
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.tableHeader}>
              <Text style={styles.category}>Files & Reports</Text>
            </View>
            <View style={styles.card}>
              <ScrollView>
                {reports?.map((report, index) => {
                  return (
                    <TouchableOpacity key={index} style={styles.smallcard}>
                      <TouchableOpacity
                        key={index}
                        style={styles.smallcard}
                        onPress={() => {
                          const fixedURL =
                            `${process.env.EXPO_PUBLIC_API_URL}/${report?.file}`.replace(
                              /\\/g,
                              "/"
                            );
                          Linking.openURL(fixedURL);
                        }}
                      >
                        <Image
                          source={require("../assets/pdf.png")}
                          style={styles.fileTypeImg}
                        />
                        <View style={styles.textContainerTable}>
                          <Text style={styles.tableCardHeading}>
                            {report?.title}
                          </Text>
                          <Text style={styles.tableCardDate}>
                            {new Date(report.createdAt).toLocaleDateString()}
                          </Text>
                        </View>
                      </TouchableOpacity>
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

      {!isDrawerOpen && <BottomNavBar isLecturer={false} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainContent: {
    zIndex: 0,
    height: "82%",
    left: 0,
    right: 0,
  },
  membersContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2px",
    justifyContent: "center",
    marginLeft: 10,
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
  courseCardRed: {
    width: 340,
    minHeight: 129,
    borderRadius: 4,
    backgroundColor: "#FFE6E6",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 25,
    alignItems: "left",
    padding: 4,
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
  redHeading: {
    fontSize: 12,
    textAlign: "center",
    marginLeft: "5%",
    marginTop: 5,
    color: "#C8272E",
  },
  cardIcon: {
    alignItems: "center",
    marginLeft: "36%",
    marginTop: 7,
    flexDirection: "row",
  },
  members: {
    fontSize: 13,
    textAlign: "center",
    marginLeft: "5%",
    marginTop: 10,
    color: "#223F76",
  },
  instructorRec: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#223F76",
    width: 240,
    borderRadius: 4,
    marginVertical: 30,
    marginLeft: "7.5%",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  instructorRecText: {
    fontSize: 12,
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
    marginLeft: "4%",
    marginRight: "27%",
    marginTop: 2,
    color: "#C8272E",
  },
  whiteFilterButton: {
    flexDirection: "row",
    width: 77,
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
    marginLeft: 15,
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
  cardIconTable: {
    marginLeft: 70,
    marginTop: 20,
    justifyContent: "right",
    flexDirection: "column ",
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
});

export default SPgroups;
