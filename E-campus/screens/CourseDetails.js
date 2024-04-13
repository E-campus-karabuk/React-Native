import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const CourseDetails = () => {
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

  const goToLecturerProfile = () => {
    navigation.navigate('LecturerProfile');
  };
  
  return (
   
   
    <View style={styles.container}>
      
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name={isDrawerOpen ? 'close' : 'menu'} size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>E-Campus</Text>
      </View>

       
    {/*  Drawer Content Goes Here */}
    {isDrawerOpen && (
        <View style={styles.drawer}>

          <TouchableOpacity onPress={() => handleDrawerItemPress('Profile')}>
            <Text style={styles.drawerContent}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress('Requests')} >
            <Text style={styles.drawerContent}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress('Courses')} >
            <Text style={styles.drawerContent}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress('SPgroups')} >
            <Text style={styles.drawerContent}>Senior Project Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDrawerItemPress('Department')} >
            <Text style={styles.drawerContent}>Department</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
        </View>
      )}
<ScrollView>
        <Text style={styles.heading}>PRG209 Programming</Text>
        <Text style={styles.describtion}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        <TouchableOpacity onPress={goToLecturerProfile}>
          <View style={styles.instructorRec}>
                <Image
                  source={require('../assets/avatar-man-square.png')}
                  style={styles.avatar}  
                /> 
                
                <View style={styles.textContainer}>
                  <Text style={styles.instructorRecText}>Dr. Sam Felix</Text>
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </View>
          </View>
          </TouchableOpacity>
          <Text style={styles.heading}>Notes & Related Links</Text>
          
           <View style={styles.tableHeader}>
           <Text style={styles.category}>Category Name</Text>
                 <View style={styles.searchBar}>
                    <Text style={styles.searchText}>Search</Text>
                    <EvilIcons name="search" size={15} color="gray" />
                 </View>
           <View style={styles.whiteFilterButton}>
              <Text style={styles.whiteFilterButtonText}>Sort By</Text>
           </View>
           <View style={styles.whiteFilterButton}>
              <Text style={styles.whiteFilterButtonText}>Filter</Text>
              <MaterialCommunityIcons name="filter-menu" size={10} color="#C8272E" />
           </View>
          </View>
          <View style={styles.card}>
          <ScrollView>
              <View style={styles.smallcard}>
                  <Image
                      source={require('../assets/pdf.png')}
                      style={styles.fileTypeImg}  
                    />
                    <View style={styles.textContainerTable}>
                        <Text style={styles.tableCardHeading}>Week 3 Exercises.pdf</Text>
                        <Text style={styles.tableCardDate}>1/1/2024</Text>
                    </View>
                    <View style={styles.cardIcon}><Entypo name="dots-three-horizontal" size={10} color="#1F3D75"/></View>
              </View>
              <View style={styles.smallcard}>
                  <Image
                      source={require('../assets/excel.png')}
                      style={styles.fileTypeImg}  
                    />
                    <View style={styles.textContainerTable}>
                        <Text style={styles.tableCardHeading}>Week 3 Exercises.pdf</Text>
                        <Text style={styles.tableCardDate}>1/1/2024</Text>
                    </View>
                    <View style={styles.cardIcon}><Entypo name="dots-three-horizontal" size={10} color="#1F3D75"/></View>
              </View>
              <View style={styles.smallcard}>
                  <Image
                      source={require('../assets/pptx.png')}
                      style={styles.fileTypeImg}  
                    />
                    <View style={styles.textContainerTable}>
                        <Text style={styles.tableCardHeading}>Week 3 Exercises.pdf</Text>
                        <Text style={styles.tableCardDate}>1/1/2024</Text>
                    </View>
                    <View style={styles.cardIcon}><Entypo name="dots-three-horizontal" size={10} color="#1F3D75"/></View>
              </View>
              <View style={styles.smallcard}>
                  <Image
                      source={require('../assets/docx.png')}
                      style={styles.fileTypeImg}  
                    />
                    <View style={styles.textContainerTable}>
                        <Text style={styles.tableCardHeading}>Week 3 Exercises.pdf</Text>
                        <Text style={styles.tableCardDate}>1/1/2024</Text>
                    </View>
                    <View style={styles.cardIcon}><Entypo name="dots-three-horizontal" size={10} color="#1F3D75"/></View>
              </View>
          </ScrollView>    
          </View>
          </ScrollView>    
<TouchableOpacity style={styles.chatpot}>
        <Ionicons name="help-circle-sharp" size={30} color="white" />
      </TouchableOpacity>
     
        <View style={styles.bottomNavBar}>
        <TouchableOpacity onPress={() => handleBottomNavBar('Notifications')}>
         <MaterialIcons name="notifications" size={24} color="white" style={styles.bottomNavBarContent}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => handleBottomNavBar('Home')}>
            <MaterialCommunityIcons name="home-variant" size={24} color="white" style={styles.bottomNavBarContent}/>
         </TouchableOpacity> 
          <TouchableOpacity onPress={() => handleBottomNavBar('Messages')}>
            <Ionicons name="mail-sharp" size={24} color="white" style={styles.bottomNavBarContent}/>
          </TouchableOpacity> 
        </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
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
  describtion: {
    fontSize: 15,
    textAlign: 'left',
    marginHorizontal:'7.5%',
    marginTop:2,
    color: '#C8272E'
  },
  instructorRec: {
    flexDirection: 'row', 
    height: 50,
    backgroundColor: '#223F76',
    width: 240,
    borderRadius: 4,
    marginTop: 30,
    marginLeft: '7.5%',
  },
  textContainer: {
    marginLeft: 10, 
    justifyContent: 'center', 
  },
  instructorRecText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewProfileText: {
    marginTop: 5,
    fontSize: 10,
    color: '#FFFFFF',
  },
  avatar: {
    width: 50, 
    height: 50, 
    alignSelf: 'center', 
    borderRadius:4,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    padding: 20,
    color: '#223F76'
  },
  tableHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 360,
    height: 37,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.32)',
    backgroundColor: 'rgba(210, 210, 210, 0.20)',
    marginLeft:16,
    borderWidth: 2, 
    borderColor:'#E8E8E8'
  },
  searchBar:{
    flexDirection: 'row',
    width: 121,
    height: 19,
    borderRadius: 4,
    backgroundColor: 'rgba(210, 210, 210, 0.60)', 
    padding:2
  },
  searchText: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft:7,
    marginRight:'45%',
    marginBottom:2,
    color: '#ffffff'
  },
  category: {
    fontSize: 10,
    textAlign: 'left',
    marginHorizontal:'3%',
    marginTop:2,
    color: '#C8272E'
  },
  whiteFilterButton:{
    flexDirection: 'row',
    width: 60,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#ffffff', 
    padding:2,
    marginLeft:5,
    alignItems: 'center',
  },
  whiteFilterButtonText: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft:10,
    marginRight:3,
    color: '#C8272E'
  },
  card: {
    width: 360,
    height: 322,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: 4,
    shadowOpacity:50,
    shadowOffset:60,
    shadowColor:'#E8E8E8',
    marginLeft: 16,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    marginBottom:'40%',
    paddingVertical:15
  },
  smallcard: {  
    flexDirection:'row',
    width: 340,
    height: 86,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom:7,
    marginLeft:8,
    paddingHorizontal:5,
 },
 cardIcon: {
  marginLeft: '20%', 
  marginTop:20,
  justifyContent: 'right', 
},
tableCardHeading: {
  fontSize: 13,
  fontWeight: 'bold',
  textAlign: 'left',
  marginLeft: '10%',
  marginTop:20,
  color: '#1F3D75'
},
textContainerTable:{
  alignItems: 'left',
},
fileTypeImg: {
  width: 57, 
  height: 70, 
  alignSelf: 'center', 
},
tableCardDate: {
  fontSize: 9,
  textAlign: 'left',
  marginTop:15,
  marginRight:'20%',
  marginLeft: '10%',
  color: '#1F3D75'
},

})

export default CourseDetails; 


