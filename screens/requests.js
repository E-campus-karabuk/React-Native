import React, { useLayoutEffect, useState } from "react";
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
import Drawer from "../shared/drawer";
import BottomNavBar from "../shared/bottomNavbar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const Requests = () => {
  const [token, setToken] = useState(null);

  // current
  const [currentRequests, setCurrentRequests] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTotalPage, setTotalCurrentPage] = useState(1);
  const [currentTypeFilter, setCurrentTypeFilter] = useState("");

  const handleCurrentType = (key) => {
    setCurrentTypeFilter(key);
    setShowPicker(false); // Hide the picker after selection
  };

  // past
  const [pastRequests, setPastRequests] = useState(null);
  const [pastPage, setPastPage] = useState(1);
  const [pastTotalPage, setTotalPastPage] = useState(1);
  const [pastTypeFilter, setPastTypeFilter] = useState("");

  const handlePastType = (key) => {
    setPastTypeFilter(key);
  };

  const [showPicker, setShowPicker] = useState(false);

  const filterItems = [
    {
      key: "",
      label: "All",
    },
    {
      key: "internship",
      label: "Internship",
    },
    {
      key: "gradeObjection",
      label: "Grade Objection",
    },
    {
      key: "recommendationLetter",
      label: "Recommendation Letter",
    },
  ];

  // current fetch
  useLayoutEffect(() => {
    const fetchCurrentRequests = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/request/student?status=unreplied&page=${currentPage}&type=${currentTypeFilter}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //  console.log(data);
          setCurrentRequests(data.studentRequests);
          setTotalCurrentPage(data.totalPages);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchCurrentRequests();
  }, [token, currentPage, currentTypeFilter]);

  // past fetch
  useLayoutEffect(() => {
    const fetchPastRequests = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in stat

        if (token) {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/request/student?status=replied&page=${pastPage}&type=${pastTypeFilter}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPastRequests(data.studentRequests);
          setTotalPastPage(data.totalPages);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchPastRequests();
  }, [token, pastPage, pastTypeFilter]);

  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            <View style={styles.row}>
              <Text style={styles.heading}>Requests</Text>
              {/* <View style={styles.buttonRequest}>
                <Text style={styles.buttonRequestText}>Send Request</Text>
              </View> */}
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerTitle}>Active Requests</Text>
              <TouchableOpacity
                style={styles.whiteFilterButton}
                onPress={() => setShowPicker(!showPicker)}
              >
                <Text style={styles.whiteFilterButtonText}>Filter</Text>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={20} // Adjust size if needed
                  color="#C8272E"
                />
              </TouchableOpacity>

              {/* TODO: ADD THE FILTERING */}
              {/* TODO: ADD THE PAGINATION */}
              {/* {showPicker && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={currentTypeFilter}
                    onValueChange={(itemValue) => handleCurrentType(itemValue)}
                    style={styles.picker}
                  >
                    {filterItems.map((item) => (
                      <Picker.Item
                        key={item.key}
                        label={item.label}
                        value={item.key}
                      />
                    ))}
                  </Picker>
                </View>
              )} */}
            </View>
            <View style={styles.card}>
              <View style={styles.courseCardRed}>
                <View style={styles.headerCardRed}>
                  <Text style={styles.headerCardTitle}>Receiver</Text>
                </View>
                <ScrollView>
                  {currentRequests?.map((request) => (
                    <View key={request._id} style={styles.smallCardRed}>
                      <TouchableOpacity onPress={goToLecturerProfile}>
                        <Text style={styles.smallCardTextRed}>
                          {request.receiver.firstName +
                            " " +
                            request.receiver.lastName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.courseCardGreen}>
                <View style={styles.headerCardGreen}>
                  <Text style={styles.headerCardTitle}>Request Type</Text>
                </View>
                <ScrollView>
                  {currentRequests?.map((request) => (
                    <View key={request._id} style={styles.smallCardGreen}>
                      <Text style={styles.smallCardTextGreen}>
                        {request.type}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.courseCardBlue}>
                <View style={styles.headerCardBlue}>
                  <Text style={styles.headerCardTitle}>Action</Text>
                </View>
                <ScrollView>
                  {currentRequests?.map((request) => (
                    <View style={styles.smallCardBlue}>
                      <View style={styles.smallCardWhite}>
                        <Text style={styles.smallCardTextBlue}>Show</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerTitle}>Past Requests</Text>
              <View style={styles.whiteFilterButton}>
                <Text style={styles.whiteFilterButtonText}>Filter</Text>
                <MaterialCommunityIcons
                  name="filter-menu"
                  size={10}
                  color="#C8272E"
                />
              </View>
            </View>

            <View style={styles.card2}>
              <ScrollView horizontal={true}>
                <View style={styles.courseCardRed}>
                  <View style={styles.headerCardRed}>
                    <Text style={styles.headerCardTitle}>Receiver</Text>
                  </View>
                  <ScrollView>
                    {pastRequests?.map((request) => (
                      <View key={request._id} style={styles.smallCardRed}>
                        <TouchableOpacity onPress={goToLecturerProfile}>
                          <Text style={styles.smallCardTextRed}>
                            {request.receiver.firstName +
                              " " +
                              request.receiver.lastName}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.courseCardGreen}>
                  <View style={styles.headerCardGreen}>
                    <Text style={styles.headerCardTitle}>Request Type</Text>
                  </View>
                  <ScrollView>
                    {pastRequests?.map((request) => (
                      <View key={request._id} style={styles.smallCardGreen}>
                        <Text style={styles.smallCardTextGreen}>
                          {request.type}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.courseCardBlue}>
                  <View style={styles.headerCardBlue}>
                    <Text style={styles.headerCardTitle}>Action</Text>
                  </View>
                  <ScrollView>
                    {pastRequests?.map((request) => (
                      <View style={styles.smallCardBlue}>
                        <View style={styles.smallCardWhite}>
                          <Text style={styles.smallCardTextBlue}>Show</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
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
  pickerContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
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
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 20,
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
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },

  headerTitle: {
    fontSize: 15,
    textAlign: "center",
    marginLeft: "35%",
    marginRight: 30,
    marginTop: 2,
    color: "#223F76",
    fontWeight: "bold",
  },
  headerTitle2: {
    fontSize: 15,
    textAlign: "center",
    marginLeft: "35%",
    marginRight: 42,
    marginTop: 2,
    color: "#223F76",
    fontWeight: "bold",
  },
  whiteFilterButton: {
    flexDirection: "row",
    width: 77,
    height: 19,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    padding: 2,
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
    marginLeft: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    marginBottom: "5%",
    paddingVertical: 15,
    flexDirection: "row",
  },
  card2: {
    width: 360,
    height: 322,
    backgroundColor: "rgba(245, 245, 245, 0.1)",
    borderRadius: 4,
    marginLeft: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    marginBottom: "40%",
    paddingVertical: 15,
    flexDirection: "row",
  },
  courseCardRed: {
    width: 108,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#FFE6E6",
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  headerCardRed: {
    width: 105,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#E88287",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  smallCardRed: {
    width: 95,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#E88287",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 7,
  },
  smallCardTextRed: {
    textTransform: "capitalize",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  smallCardGreen: {
    width: 100,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#E88287",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  courseCardGreen: {
    width: 122,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#E6FFEF",
    marginRight: 10,
    alignItems: "left",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardGreen: {
    width: 123,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#9DF6BB",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  smallCardGreen: {
    width: 108,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#9DF6BB",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  smallCardTextGreen: {
    color: "#223F76",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  courseCardBlue: {
    width: 87,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#E0EBFF",
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    marginBottom: 40,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardBlue: {
    width: 88,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#87A4DA",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  headerCardTitle: {
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
  },
  smallCardBlue: {
    width: 74,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#87A4DA",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  smallCardWhite: {
    width: 56,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginTop: 2,
  },
  smallCardTextBlue: {
    color: "#C8272E",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },

  courseCardRed2: {
    width: 97,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#FFE6E6",
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  headerCardRed2: {
    width: 97,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#E88287",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  smallCardRed2: {
    width: 85,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#E88287",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 7,
  },
  smallCardTextRed2: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  smallCardGreen2: {
    width: 78,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#9DF6BB",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  courseCardGreen2: {
    width: 90,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#E6FFEF",
    marginRight: 10,
    alignItems: "left",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardGreen2: {
    width: 90,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#9DF6BB",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },

  smallCardTextGreen2: {
    color: "#223F76",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  smallCardYellow2: {
    width: 78,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#F4FBA3;",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  courseCardYellow2: {
    width: 90,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#FDFFE0",
    marginRight: 10,
    alignItems: "left",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardYellow2: {
    width: 90,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#F4FBA3;",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },

  smallCardTextYellow2: {
    color: "#595959",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  courseCardBlue2: {
    width: 76,
    height: 253,
    borderRadius: 4,
    backgroundColor: "#E0EBFF",
    elevation: 4,
    marginRight: 10,
    alignItems: "left",
    marginBottom: 40,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardBlue2: {
    width: 76,
    height: 27,
    borderRadius: 4,
    backgroundColor: "#87A4DA",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
  },
  headerCardTitle2: {
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
  },
  smallCardBlue2: {
    width: 65,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#87A4DA",
    alignItems: "left",
    padding: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: 7,
    marginTop: 7,
  },
  smallCardWhite2: {
    width: 50,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginTop: 2,
  },
  smallCardTextBlue2: {
    color: "#C8272E",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
  row: {
    flexDirection: "row",
  },
  buttonRequest: {
    width: 95,
    height: 35,
    borderRadius: 4,
    backgroundColor: "#E88287",
    padding: 3,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: "center",
    marginLeft: "25%",
    marginTop: 30,
  },
  buttonRequestText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
    margin: 5,
  },
});

export default Requests;
