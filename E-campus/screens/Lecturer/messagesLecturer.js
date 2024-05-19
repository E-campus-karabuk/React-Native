import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import styles from '../../shared/styles'
import  Drawer from '../../shared/drawer';
import  BottomNavBar from '../../shared/bottomNavbar';

const MessagesLecturer = () => {
    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
     };
  const handleLogOut = () => {
    navigation.navigate('E-campus');
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
    isLecturer={true}/>

{!isDrawerOpen && (
<View style={styles.mainContent}>
  
      <Text style={styles.heading}>Messages</Text>
          <View style={styles.tableHeader}>
          <View style={styles.searchBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor="gray"
              />
              <EvilIcons name="search" size={20} color="gray" style={styles.icon} />
         </View>
              <TouchableOpacity style={styles.whiteFilterButton}>
                  <Text style={styles.whiteFilterButtonText}>Sort By</Text>
                  <MaterialCommunityIcons name="filter-menu" size={10} color="#C8272E" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.whiteFilterButton}>
                  <Text style={styles.whiteFilterButtonText}>Lecturers</Text>
                  <MaterialCommunityIcons name="filter-menu" size={10} color="#C8272E" />
              </TouchableOpacity>
          </View>
          <ScrollView>
              <TouchableOpacity style={styles.smallcard}>
                    <Image
                        source={require('../../assets/profile-user.png')}
                        style={styles.ProfilePicIcon}  
                      />
                      <View style={styles.textContainerTable}>
                          <Text style={styles.tableCardHeading}>Sender Name</Text>
                          <Text style={styles.tableCardMsgPreview}>Message Text preview...</Text>
                      </View>
                      
                      <View style={styles.textContainerTable}>
                          <View style={styles.cardIconTable}>
                          <Text style={styles.tableCardDate}>11/11/2020</Text>
                              </View>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallcard}>
                    <Image
                        source={require('../../assets/profile-user.png')}
                        style={styles.ProfilePicIcon}  
                      />
                      <View style={styles.textContainerTable}>
                          <Text style={styles.tableCardHeading}>Sender Name</Text>
                          <Text style={styles.tableCardMsgPreview}>Message Text preview...</Text>
                      </View>
                      
                      <View style={styles.textContainerTable}>
                          <View style={styles.cardIconTable}>
                          <Text style={styles.tableCardDate}>11/11/2020</Text>
                              </View>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallcard}>
                    <Image
                        source={require('../../assets/profile-user.png')}
                        style={styles.ProfilePicIcon}  
                      />
                     <View style={styles.textContainerTable}>
                          <Text style={styles.tableCardHeading}>Sender Name</Text>
                          <Text style={styles.tableCardMsgPreview}>Message Text preview...</Text>
                      </View>
                      
                      <View style={styles.textContainerTable}>
                          <View style={styles.cardIconTable}>
                          <Text style={styles.tableCardDate}>11/11/2020</Text>
                              </View>
                      </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallcard}>
                    <Image
                        source={require('../../assets/profile-user.png')}
                        style={styles.ProfilePicIcon}  
                      />
                      <View style={styles.textContainerTable}>
                          <Text style={styles.tableCardHeading}>Sender Name</Text>
                          <Text style={styles.tableCardMsgPreview}>Message Text preview...</Text>
                      </View>
                      
                      <View style={styles.textContainerTable}>
                          <View style={styles.cardIconTable}>
                          <Text style={styles.tableCardDate}>11/11/2020</Text>
                              </View>
                      </View>
                </TouchableOpacity>
                </ScrollView>
              
              </View>

              )} 
              {!isDrawerOpen && (
              <TouchableOpacity style={styles.chatpot}>
              <Ionicons name="help-circle-sharp" size={30} color="white" />
              </TouchableOpacity>
              )} 


              {!isDrawerOpen && (
              <BottomNavBar 
              isLecturer={true}/>
              )} 
              </View>
              );
              };



export default MessagesLecturer; 


