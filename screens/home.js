import React, { useState } from "react";
import {
  View,
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
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";

import * as SecureStore from "expo-secure-store";

const Home = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scheduleData = [
    { time: "10:00", subject: "MAT209 Mathematics", style: "redrec" },
    { time: "11:00", subject: "PHY101 Physics", style: "greenrec" },
    { time: "12:00", subject: "CHE102 Chemistry", style: "bluerec" },
    { time: "01:00", subject: "BIO103 Biology", style: "redrec" },
    { time: "02:00", subject: "CSE104 Computer Science", style: "greenrec" },
    { time: "03:00", subject: "ENG105 English", style: "bluerec" },
    { time: "04:00", subject: "HIS106 History", style: "redrec" },
    { time: "05:00", subject: "GEO107 Geography", style: "greenrec" },
    { time: "06:00", subject: "ART108 Art", style: "bluerec" },
  ];

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(JSON.parse(token));
  };

  getToken();

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
              Welcome <Text style={styles.subtext}>Nisreen</Text> !
            </Text>
            <Text style={styles.heading}>Today’s Schedule</Text>

            <View style={styles.card}>
              <View style={styles.smallcardcontainer}>
                <View style={styles.smallcard}>
                  <Text style={styles.month}>March</Text>
                  <Text style={styles.day}>03</Text>
                  <Text style={styles.weekday}>Monday</Text>
                </View>
                <View style={styles.smallcardlessons}>
                  <ScrollView>
                    <Text style={styles.lessons}>Lessons</Text>
                    <View style={styles.whiterec}>
                      <Text style={styles.lessonred}>Mathematics</Text>
                    </View>
                    <View style={styles.whiterec}>
                      <Text style={styles.lessongray}>Programming</Text>
                    </View>
                    <View style={styles.whiterec}>
                      <Text style={styles.lessonred}>Mathematics</Text>
                    </View>
                    <View style={styles.whiterec}>
                      <Text style={styles.lessongray}>Programming</Text>
                    </View>
                  </ScrollView>
                </View>
              </View>

              <View style={styles.recscontainer}>
                <Text style={styles.subhead}>Timeline</Text>
                <ScrollView>
                  {scheduleData.map((item, index) => (
                    <View key={index} style={styles[item.style]}>
                      <Text style={styles.subsubtext}>{item.time}</Text>
                      <Text style={styles.subsubredtext}>{item.subject}</Text>
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
                <TouchableOpacity
                  style={styles.courseCardRed}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      courseId: "MAT202",
                      courseName: "Mathematics",
                      instructor: "Dr. Alex",
                    })
                  }
                >
                  <Text style={styles.cardGrayText}>MAT202</Text>
                  <Text style={styles.cardBlueText}>Mathematics</Text>
                  <Text style={styles.lessonred}>Dr. Alex</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.courseCardGreen}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      courseId: "MAT202",
                      courseName: "Mathematics",
                      instructor: "Dr. Alex",
                    })
                  }
                >
                  <Text style={styles.cardGrayText}>MAT202</Text>
                  <Text style={styles.cardBlueText}>Mathematics</Text>
                  <Text style={styles.lessonred}>Dr. Alex</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.courseCardBlue}
                  onPress={() =>
                    navigation.navigate("CourseDetails", {
                      courseId: "MAT202",
                      courseName: "Mathematics",
                      instructor: "Dr. Alex",
                    })
                  }
                >
                  <Text style={styles.cardGrayText}>PRG202</Text>
                  <Text style={styles.cardBlueText}>Programming</Text>
                  <Text style={styles.lessonred}>Dr. Alex</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    shadowOpacity: 50,
    shadowOffset: 60,
    shadowColor: "#E8E8E8",
    padding: 5,
    marginLeft: 16,
  },
  smallcard: {
    width: 100,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  smallcardlessons: {
    width: 100,
    height: 100,
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
    paddingHorizontal: 16,
    marginTop: 20,
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

  gradient: {
    flex: 1,
    width: "100%",
    backgroundImage: "linear-gradient(to bottom, #ff0000, #0000ff)",
  },
  cardGrayText: {
    fontSize: 15,
    textAlign: "left",
    marginLeft: "10%",
    marginTop: "90%",
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
