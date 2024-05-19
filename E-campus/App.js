
import React, { useState } from 'react';
import { View, Text,StatusBar, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Login from './screens/login'; 
import STDProfile from './screens/profile'; 
import Requests from './screens/requests'; 
import Courses from './screens/courses'; 
import SPgroups from './screens/SPgroups'; 
import Department from './screens/department'; 
import Notifications from './screens/notifications'; 
import Messages from './screens/messages'; 
import CourseDetails from './screens/CourseDetails'; 
import LecturerProfile from './screens/LecturerProfile'; 
import HomeLecturer from './screens/Lecturer/homeLecturer';
import ProfileLecturer from './screens/Lecturer/profileLecturer';
import RequestsLecturer from './screens/Lecturer/requestsLecturer';
import CoursesLecturer from './screens/Lecturer/coursesLecturer';
import CourseDetailsLecturer from './screens/Lecturer/courseDetailsLecturer';
import SPSingleGroupLecturer from './screens/Lecturer/SPSingleGroupLecturer';
import DepartmentLecturer from './screens/Lecturer/departmentLecturer';
import MessagesLecturer from './screens/Lecturer/messagesLecturer';
import NotificationsLecturer from './screens/Lecturer/notificationsLecturer';
import SPgroupsLecturer from './screens/Lecturer/SPgroupsLecturer';
import Drawer from './shared/drawer'; 


import MyLayout from './layout/myLayout'; 
const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="E-campus">
{/* 
      <Stack.Screen name="MyLayout" component={MyLayout} /> */}

        <Stack.Screen name="E-campus" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={STDProfile} />
        <Stack.Screen name="Requests" component={Requests} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="SPgroups" component={SPgroups} />
        <Stack.Screen name="Department" component={Department} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
        <Stack.Screen name="LecturerProfile" component={LecturerProfile} />

        <Stack.Screen name="Drawer" component={Drawer} />

        <Stack.Screen name="HomeLecturer" component={HomeLecturer} />
        <Stack.Screen name="ProfileLecturer" component={ProfileLecturer} />
        <Stack.Screen name="RequestsLecturer" component={RequestsLecturer} />
        <Stack.Screen name="CoursesLecturer" component={CoursesLecturer} />
        <Stack.Screen name="CourseDetailsLecturer" component={CourseDetailsLecturer} />
        <Stack.Screen name="SPgroupsLecturer" component={SPgroupsLecturer} />
        <Stack.Screen name="SPSingleGroupLecturer" component={SPSingleGroupLecturer} />
        <Stack.Screen name="DepartmentLecturer" component={DepartmentLecturer} />
        <Stack.Screen name="MessagesLecturer" component={MessagesLecturer} />
        <Stack.Screen name="NotificationsLecturer" component={NotificationsLecturer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'

  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#223F76',
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight || 50,
  },
  menuButton: {
    marginRight: 102,
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    color:'#FFFFFF'
  },
  maintext: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:20,
    color:'#223F76'
  },
  subtext: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:20,
    color:'#C8272E'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'left',
    marginTop:10,
    marginLeft: 10,
    padding: 20,
    color:'#223F76'
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
  },
 
});

export default App;
