import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../shared/styles';
import  Drawer from '../../shared/drawer';
import  BottomNavBar from '../../shared/bottomNavbar';
const NotificationsLecturer = () => {
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
   
      <Text style={styles.heading}>Notifications</Text>
        <View style={styles.tableHeaderNotification}>
                <TouchableOpacity style={styles.whiteFilterButtonNotification}>
                    <Text style={styles.whiteFilterButtonTextNotification}>Filter</Text>
                    <MaterialCommunityIcons name="filter-menu" size={15} color="#C8272E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteFilterButtonNotification}>
                    <Text style={styles.whiteFilterButtonTextNotification}>Show All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteFilterButtonNotification}>
                    <Text style={styles.whiteFilterButtonTextNotification}>Unread</Text>
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
                              <Text style={styles.notificationTime}>10h</Text>
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
                          <Text style={styles.notificationTime}>10h</Text>
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
                          <Text style={styles.notificationTime}>10h</Text>
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
                          <Text style={styles.notificationTime}>10h</Text>
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



export default NotificationsLecturer; 


