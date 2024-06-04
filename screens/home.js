import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const Home = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const stylesArr = ["redrec", "greenrec", "bluerec", "yellowrec"];
  const cardsArr = [
    "courseCardRed",
    "courseCardGreen",
    "courseCardBlue",
    "courseCardYellow",
  ];
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [lessons, setLessons] = useState(null);

  useLayoutEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/auth/current`,
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

  useLayoutEffect(() => {
    const fetchLessons = async () => {
      try {
        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/course/list/mine?filter=current`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //  console.log(data);
          setLessons(data);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchLessons();
  }, [token]);

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
            <Text style={styles.maintext}>
              Welcome{" "}
              <Text style={styles.subtext}>
                {response?.user?.firstName} {response?.user?.lastName}
              </Text>{" "}
              !
            </Text>
            <Text style={styles.heading}>Today’s Schedule</Text>

            <View style={styles.card}>
              <View style={styles.smallcardcontainer}>
                <View style={styles.smallcard}>
                  <Text style={styles.month}>
                    {new Date().toLocaleString("en-TR", { month: "long" })}
                  </Text>
                  <Text style={styles.day}>{new Date().getDate()}</Text>
                  <Text style={styles.weekday}>
                    {new Date().toLocaleString("en-TR", { weekday: "long" })}
                  </Text>
                </View>
                <View style={styles.smallcardlessons}>
                  <Text style={styles.lessons}>Lessons</Text>
                  <ScrollView>
                    {/* TODO: FIX THE COLORS */}
                    {lessons?.map((lesson, index) => {
                      return (
                        <View style={styles.whiterec} key={index}>
                          <Text style={styles.lessongray}>
                            {lesson.courseName.length > 15
                              ? lesson.courseName.substring(0, 15) + "..."
                              : lesson.courseName}
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.recscontainer}>
                <Text style={styles.subhead}>Timeline</Text>
                <ScrollView>
                  {lessons?.map((item, index) => (
                    <View
                      key={index}
                      style={styles[stylesArr[index % stylesArr.length]]}
                    >
                      <Text style={styles.subsubtext}>{item.time}</Text>
                      <Text style={styles.subsubredtext}>
                        {item.courseName}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <Text style={styles.heading}>My Current Courses</Text>
            <ScrollView
              horizontal
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              <View style={styles.cardContainer}>
                {lessons?.map((lesson, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles[cardsArr[index % cardsArr.length]]}
                      onPress={() =>
                        navigation.navigate("CourseDetails", {
                          courseId: lesson._id,
                          courseName: "Mathematics",
                          instructor: "Dr. Alex",
                        })
                      }
                    >
                      <Text style={styles.cardGrayText}>
                        {lesson.courseCode}
                      </Text>
                      <Text style={styles.cardBlueText}>
                        {lesson.courseName}
                      </Text>
                      <Text style={styles.lessonred}>
                        {lesson.lecturer[0].firstName}{" "}
                        {lesson.lecturer[0].lastName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
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
  maintext: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#223F76",
  },

  subtext: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#C8272E",
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
  subhead: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    marginLeft: "10%",
    marginTop: 5,
    color: "#223F76",
  },
  month: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#595959",
    marginTop: 10,
  },
  day: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#C8272E",
    marginBottom: 5,
    marginTop: 5,
  },
  weekday: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#223F76",
  },
  lessons: {
    fontSize: 12,
    textAlign: "left",
    color: "#223F76",
    marginLeft: "10%",
    fontWeight: "bold",
    marginBottom: 5,
  },
  lessongray: {
    fontSize: 9,
    textAlign: "left",
    marginLeft: "10%",
    marginTop: 2,
    color: "#595959",
  },
  lessonred: {
    fontSize: 9,
    textAlign: "left",
    marginLeft: "10%",
    marginTop: 2,
    color: "#C8272E",
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
  card: {
    flexDirection: "row",
    width: 360,
    height: 322,
    backgroundColor: "#f8f8f8",
    borderRadius: 4,
    shadowOpacity: 50,
    shadowOffset: 90,
    shadowColor: "#E8E8E8",
    padding: 5,
    marginLeft: 16,
  },
  smallcard: {
    width: 110,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  smallcardlessons: {
    width: 110,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  smallcardcontainer: {
    flex: 0,
    marginLeft: 5,
  },
  recscontainer: {
    flex: 1,
    marginBottom: 10,
  },

  redrec: {
    width: "88%",
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFE6E6",
    marginBottom: 3,
    padding: 2,
    alignItems: "left",
    paddingHorizontal: 10,
    marginLeft: "10%",
  },
  greenrec: {
    width: "88%",
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#E6FFEF",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
    marginLeft: "10%",
  },
  yellowrec: {
    width: "88%",
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FDFFE0",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
    marginLeft: "10%",
  },

  bluerec: {
    width: "88%",
    height: 35,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#E0EBFF",
    alignItems: "left",
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 10,
    marginLeft: "10%",
  },
  whiterec: {
    width: "95%",
    height: 20,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    alignItems: "left",
    marginBottom: 3,
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 3,
    marginTop: 20,
    marginBottom: 15,
  },

  courseCardRed: {
    width: 114,
    height: 183,
    borderRadius: 4,
    backgroundColor: "#FFE6E6",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    padding: 4,
  },

  courseCardGreen: {
    width: 114,
    height: 183,
    borderRadius: 4,
    backgroundColor: "#E6FFEF",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    padding: 4,
  },

  courseCardBlue: {
    width: 114,
    height: 183,
    borderRadius: 4,
    backgroundColor: "#E0EBFF",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    padding: 4,
    marginBottom: 40,
  },

  courseCardYellow: {
    width: 114,
    height: 183,
    borderRadius: 4,
    backgroundColor: "#FDFFE0",
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    padding: 4,
    marginBottom: 40,
  },

  gradient: {
    flex: 1,
    width: "100%",
    backgroundImage: "linear-gradient(to bottom, #ff0000, #0000ff)",
  },
  cardGrayText: {
    fontSize: 15,
    textAlign: "left",
    marginLeft: "10%",
    marginTop: "50%",
    marginBottom: 7,
    color: "#595959",
  },
  cardBlueText: {
    fontSize: 13,
    textAlign: "left",
    color: "#223F76",
    marginLeft: "10%",
    fontWeight: "bold",
    marginBottom: 5,
  },

  bottomNavBar: {
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
});

export default Home;
