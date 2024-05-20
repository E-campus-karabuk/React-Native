import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import  Drawer from '../shared/drawer';
import  BottomNavBar from '../shared/bottomNavbar';


const Courses = () => {
    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);



  const CourseDetailsScreen = ({ route }) => {
    // Extract course details from route.params
    const { courseId, courseName, instructor } = route.params;
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Course ID: {courseId}</Text>
        <Text>Course Name: {courseName}</Text>
        <Text>Instructor: {instructor}</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
    <Drawer
    isDrawerOpen={isDrawerOpen}
    setIsDrawerOpen={setIsDrawerOpen}
    isLecturer={false}/>

{!isDrawerOpen && (
<View style={styles.mainContent}>
  
      <ScrollView>

<Text style={styles.heading}>Courses</Text>

<View style={styles.headingRec}>
            <Text style={styles.headingRecText}> Current Courses</Text>
            </View>
        <ScrollView
      horizontal
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
        <View style={styles.cardContainer}>

        <TouchableOpacity
          style={styles.courseCardRed}
          onPress={() =>
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
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
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
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
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
            })
          }
        >
          <Text style={styles.cardGrayText}>PRG202</Text>
          <Text style={styles.cardBlueText}>Programming</Text>
          <Text style={styles.lessonred}>Dr. Alex</Text>
        </TouchableOpacity>
      
        </View>
        </ScrollView>

        <View style={styles.headingRec}>
            <Text style={styles.headingRecText}> Past Courses</Text>
            </View>
        <ScrollView
      horizontal
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
        <View style={styles.bottomcardContainer}>
        <TouchableOpacity
          style={styles.courseCardRed}
          onPress={() =>
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
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
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
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
            navigation.navigate('CourseDetails', {
              courseId: 'MAT202',
              courseName: 'Mathematics',
              instructor: 'Dr. Alex',
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


    {!isDrawerOpen && (
      <BottomNavBar 
      isLecturer={false}/>
    )} 
    </View>
    );
    };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  mainContent: {
    zIndex: 0,
    height: '82%',
    left:0,
    right:0
  },
 navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#223F76',
    paddingHorizontal: 10,
    zIndex: 100,
  },
  menuButton: {
    marginRight: 102,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },

  drawer: {
    position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: '#223F76',
  padding: 50,
  zIndex: 99,
  },
  drawerContent: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#FFFFFF',
    marginBottom:10,
    marginTop:30
  },
  button: {
    backgroundColor: '#C8272E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:148,
    borderRadius: 5,
    marginLeft:'25%',
    marginTop:74
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  
  bottomNavBar:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#223F76',
    paddingLeft:10,
    paddingRight:60,
    paddingBottom:20,
    
   },
   
   bottomNavBarContent:{
   
    textAlign: 'center',
    color: '#FFFFFF',
    marginHorizontal:'16%'
   },
   
   

  chatpot: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    
    backgroundColor: '#223F76', 
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
    marginBottom:80
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: '#223F76'
  },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  bottomcardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom:60
  },
  
  courseCardRed: {
    width: 114, 
    height: 183,
    borderRadius: 4,
    backgroundColor: '#FFE6E6',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight:10,
    alignItems: 'left',
    padding:4,
  },
  
  courseCardGreen: {
    width: 114, 
    height: 183,
    borderRadius: 4,
    backgroundColor: '#E6FFEF',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight:10,
    alignItems: 'left',
    padding:4,
  },

  courseCardBlue: {
    width: 114, 
    height: 183,
    borderRadius: 4,
    backgroundColor: '#E0EBFF',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    marginRight:10,
    alignItems: 'left',
    padding:4,
    marginBottom:40
    
  },

  gradient:{
    flex: 1,
    width: '100%',
    backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
  },
  cardGrayText: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft:'10%',
    marginTop:'90%',
    marginBottom:7,
    color: '#595959',
    
  },
  cardBlueText: {
    fontSize: 13,
    textAlign: 'left',
    color: '#223F76',
    marginLeft:'10%',
    fontWeight: 'bold',
    marginBottom:5
  },
  lessonred: {
    fontSize: 9,
    textAlign: 'left',
    marginLeft:'10%',
    marginTop:2,
    color: '#C8272E'
  },

  headingRec:{
    
    flexShrink: 0,
    height: 37,
    backgroundColor: '#E8E8E8',
    paddingTop:5,
    paddingBottom:2,
    paddingHorizontal:15,
    width: 375,
    borderRadius:4,
    marginTop:20,
    marginHorizontal:10,
    marginBottom:10,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
},
headingRecText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'left',
  color: '#C8272E',
 
},

 

})

export default Courses; 


