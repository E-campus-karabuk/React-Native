import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const STDProfile = () => {
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);

  useLayoutEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/student/current`,
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

    fetchTokenAndProfile();
  }, [token]);

  const [selectedDay, setSelectedDay] = useState("Mon");
  const [courseData, setCourseData] = useState(null);

  useLayoutEffect(() => {
    const fetchCourses = async () => {
      try {
        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/course/list/mine?day=${selectedDay}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCourseData(data);
          // console.log({ courses: data });
        }
      } catch (error) {
        console.log({ erorr: error.message });
      }
    };
    fetchCourses();
  }, [token, selectedDay]);

  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  // Initial selected day is Monday

  const renderTimetable = () => {
    // Logic to render timetable based on selected day

    return (
      <>
        {/* Timetable for Monday */}

        {courseData?.map((course) => {
          return (
            <View style={styles.redrec} key={course._id}>
              <Text style={styles.subsubtext}>{course.time}</Text>
              <Text style={styles.subsubredtext}>
                {course.courseCode} {course.courseName}
              </Text>
            </View>
          );
        })}
      </>
    );
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
            <View style={styles.HeaderRed}>
              {response?.user?.sex === "male" && (
                <Image
                  source={require(`../assets/profile-user.png`)}
                  style={styles.avatar}
                />
              )}
              {response?.user?.sex === "female" && (
                <Image
                  source={require(`../assets/avatar-girl.png`)}
                  style={styles.avatar}
                />
              )}
            </View>
            <Text style={styles.username}>
              {response?.user?.firstName} {response?.user?.lastName}
            </Text>
            <Text style={styles.stdNum}>{response?.user?.registerNo}</Text>
            <View style={styles.majorRec}>
              <Text style={styles.majorRecText}>
                <FontAwesome name="graduation-cap" size={20} color="white" />
                {response?.data?.department} - {response?.data?.faculty}
              </Text>
            </View>

            <View style={styles.smallRedRecContainer}>
              <View style={styles.smallRedRec}>
                <Text style={styles.majorRecText}>
                  Class {response?.data?.level}
                </Text>
              </View>
              <View style={styles.smallRedRec}>
                <Text style={styles.majorRecText}>
                  ANO {response?.data?.gpa}
                </Text>
              </View>
              <View style={styles.smallRedRec}>
                <Text style={styles.majorRecText}>
                  AGNO {response?.data?.agpa}
                </Text>
              </View>
            </View>

            <Text style={styles.heading}>My Timetable</Text>
            <View style={styles.card}>
              <View style={styles.weekdaysContainer}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.weekdayRec,
                      selectedDay === day && { backgroundColor: "#C8272E" },
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.weekdayText,
                        selectedDay === day && { color: "#FFFFFF" },
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Render timetable based on the selected day */}
              <ScrollView>
                <View style={styles.recscontainer}>{renderTimetable()}</View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
      {!isDrawerOpen && (
        <TouchableOpacity style={styles.chatpot}>
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

  HeaderRed: {
    width: "100%",
    height: 196,
    borderRadius: 4,
    backgroundColor: "#FFE6E6",
    elevation: 4,
    alignItems: "left",
    padding: 4,
  },

  avatar: {
    width: 120,
    height: 120,
    marginTop: "35%",
    marginLeft: "7%",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "42%",
    marginTop: 15,
    color: "#223F76",
    textTransform: "capitalize",
  },
  stdNum: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "42%",
    color: "#C8272E",
  },

  majorRec: {
    flexShrink: 0,
    alignItems: "center",
    height: 30,
    backgroundColor: "#223F76",
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 2,
    width: 375,
    borderRadius: 4,
    marginTop: 30,
    marginHorizontal: 10,
  },
  majorRecText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },

  smallRedRecContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  smallRedRec: {
    flexShrink: 0,
    alignItems: "center",
    height: 26,
    backgroundColor: "#C8272E",
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 2,
    width: 91,
    borderRadius: 4,
    marginHorizontal: 15,
  },
  card: {
    width: 360,
    height: 360,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    shadowOpacity: 50,
    shadowOffset: 60,
    shadowColor: "#E8E8E8",
    padding: 5,
    marginLeft: 16,
    marginBottom: "40%",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginLeft: 2,
    padding: 20,
    color: "#223F76",
  },
  weekdaysContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 30,
  },

  weekdayRec: {
    flexShrink: 0,
    alignItems: "center",
    height: 32,
    backgroundColor: "#FFFFFF",
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 2,
    width: 40,
    borderRadius: 4,
    marginRight: 15,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  weekdayText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
    padding: 2,
    color: "#C8272E",
  },
  recscontainer: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },

  redrec: {
    width: 330,
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFE6E6",
    marginBottom: 3,
    padding: 2,
    alignItems: "left",
    paddingHorizontal: 10,
  },
  greenrec: {
    width: 330,
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#E6FFEF",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
  },
  yellowrec: {
    width: 330,
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FDFFE0",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
  },

  bluerec: {
    width: 330,
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#E0EBFF",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
  },

  subsubtext: {
    fontSize: 10,
    textAlign: "left",
    color: "#223F76",
  },
  subsubredtext: {
    fontSize: 12,
    textAlign: "center",
    color: "#C8272E",
  },
});

export default STDProfile;
