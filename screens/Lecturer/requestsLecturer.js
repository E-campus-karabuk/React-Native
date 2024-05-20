import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import  Drawer from '../../shared/drawer';
import  BottomNavBar from '../../shared/bottomNavbar';

const RequestsLecturer = () => {
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
  const requestList = [
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship' },
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
    { receiver: 'Prof.Ilhami ORAK', requestType: 'Internship'},
  ];
  return (  
   
    <View style={styles.container}>
    <Drawer
    isDrawerOpen={isDrawerOpen}
    setIsDrawerOpen={setIsDrawerOpen}
    isLecturer={true}/>

{!isDrawerOpen && (
<View style={styles.mainContent}>
  <ScrollView>
    <Text style={styles.heading}>Requests</Text>
        <View style={styles.tableHeader}>
              <Text style={styles.headerTitle}>Active Requests</Text>
              <View style={styles.whiteFilterButton}>
                <Text style={styles.whiteFilterButtonText}>Filter</Text>
                <MaterialCommunityIcons name="filter-menu" size={10} color="#C8272E" />
              </View>
        </View>
             <View style={styles.card}>
                <View style={styles.courseCardRed}>
                    <View style={styles.headerCardRed}>
                        <Text style={styles.headerCardTitle}>Reciver</Text>
                    </View>
                    <ScrollView>
                      
                    {requestList.map((item, index) => (
                              <View key={index} style={styles.smallCardRed}>
                              <TouchableOpacity onPress={goToLecturerProfile}>
                                  <Text style={styles.smallCardTextRed}>{item.receiver}</Text>
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
                  
                    {requestList.map((item, index) => (
                              <View key={index+10} style={styles.smallCardGreen}>
                              <Text style={styles.smallCardTextGreen}>{item.requestType}</Text>
                              </View>

                    ))}
                    </ScrollView>
                </View>
                <View style={styles.courseCardBlue}>
                   <View style={styles.headerCardBlue}>
                       <Text style={styles.headerCardTitle}>Action</Text>
                   </View>
                   <ScrollView>
                     
                   {requestList.map((item, index) => (
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
              <Text style={styles.headerTitle2}>Past Requests</Text>
              <View style={styles.whiteFilterButton}>
                <Text style={styles.whiteFilterButtonText}>Filter</Text>
                <MaterialCommunityIcons name="filter-menu" size={10} color="#C8272E" />
              </View>
        </View>
             <View style={styles.card2}>
             <ScrollView horizontal={true}>
             <View style={styles.courseCardRed2}>
                    <View style={styles.headerCardRed2}>
                        <Text style={styles.headerCardTitle2}>Reciver</Text>
                    </View>
                    <ScrollView>
                      
                    {requestList.map((item, index) => (
                              <View key={index} style={styles.smallCardRed2}>
                              <TouchableOpacity onPress={goToLecturerProfile}>
                                  <Text style={styles.smallCardTextRed2}>{item.receiver}</Text>
                               </TouchableOpacity>
                              </View>
                    ))}
                    </ScrollView>
                </View>
                <View style={styles.courseCardGreen2}>
                    <View style={styles.headerCardGreen2}>
                       <Text style={styles.headerCardTitle2}>Request Type</Text>
                    </View>
                    <ScrollView>
                     

                    {requestList.map((item, index) => (
                              <View key={index+10} style={styles.smallCardGreen2}>
                              <Text style={styles.smallCardTextGreen2}>{item.requestType}</Text>
                              </View>

                    ))}
                    </ScrollView>
                </View>
                <View style={styles.courseCardYellow2}>
                    <View style={styles.headerCardYellow2}>
                       <Text style={styles.headerCardTitle2}>Request Type</Text>
                    </View>
                    <ScrollView>
                     
                    {requestList.map((item, index) => (
                              <View key={index+20} style={styles.smallCardYellow2}>
                              <Text style={styles.smallCardTextYellow2}>{item.requestType}</Text>
                              </View>

                    ))}
                    </ScrollView>
                </View>
                <View style={styles.courseCardBlue2}>
                   <View style={styles.headerCardBlue2}>
                       <Text style={styles.headerCardTitle2}>Action</Text>
                   </View>
                   <ScrollView>
                        
                   {requestList.map((item, index) => (
                      <View style={styles.smallCardBlue2}>
                          <View style={styles.smallCardWhite2}>
                              <Text style={styles.smallCardTextBlue2}>Show</Text>    
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


{!isDrawerOpen && (
 <BottomNavBar 
 isLecturer={true}/>
)} 
</View>
 );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff'
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
    borderColor:'#E8E8E8',
    
  },
  
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft:'35%',
    marginRight:30,
    marginTop:2,
    color: '#223F76',
    fontWeight: 'bold',
  },
  headerTitle2: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft:'35%',
    marginRight:42,
    marginTop:2,
    color: '#223F76',
    fontWeight: 'bold',
  },
  whiteFilterButton:{
    flexDirection: 'row',
    width: 77,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#ffffff', 
    padding:2,
    alignItems: 'center',
  },
  whiteFilterButtonText: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft:15,
    marginRight:3,
    color: '#C8272E'
  },
  card: {
    width: 360,
    height: 322,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: 4,
    marginLeft: 16,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    marginBottom:'5%',
    paddingVertical:15,
    flexDirection:'row'
  },
  card2: {
    width: 360,
    height: 322,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: 4,
    marginLeft: 16,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    marginBottom:'40%',
    paddingVertical:15,
    flexDirection:'row'
  },
  courseCardRed: {
    width: 108, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#FFE6E6',
    marginRight:10,
    marginLeft:10,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
  },
  headerCardRed: {
    width: 105, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#E88287',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  smallCardRed: {
    width: 95, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#E88287',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:5,
    marginTop:7,
  },
  smallCardTextRed: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
  smallCardGreen: {
    width: 100, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#E88287',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  courseCardGreen: {
    width: 122, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#E6FFEF',
    marginRight:10,
    alignItems: 'left',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardGreen: {
    width: 123, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#9DF6BB',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  smallCardGreen: {
    width: 108, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#9DF6BB',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  smallCardTextGreen: {
    color: '#223F76',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
  courseCardBlue: {
    width: 87, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#E0EBFF',
    elevation: 4,
    marginRight:10,
    alignItems: 'left',
    marginBottom:40,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardBlue: {
    width: 88, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#87A4DA',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  headerCardTitle: {
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  smallCardBlue: {
    width: 74, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#87A4DA',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  smallCardWhite: {
    width: 56, 
    height: 20,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    alignItems:'center',
    marginTop:2,
  },
  smallCardTextBlue: {
    color: '#C8272E',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
 
  courseCardRed2: {
    width: 97, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#FFE6E6',
    marginRight:10,
    marginLeft:10,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
  },
  headerCardRed2: {
    width: 97, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#E88287',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  smallCardRed2: {
    width: 85, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#E88287',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:5,
    marginTop:7,
  },
  smallCardTextRed2: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
  smallCardGreen2: {
    width: 78, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#9DF6BB',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  courseCardGreen2: {
    width: 90, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#E6FFEF',
    marginRight:10,
    alignItems: 'left',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardGreen2: {
    width: 90, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#9DF6BB',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  
  smallCardTextGreen2: {
    color: '#223F76',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
  smallCardYellow2: {
    width: 78, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#F4FBA3;',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  courseCardYellow2: {
    width: 90, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#FDFFE0',
    marginRight:10,
    alignItems: 'left',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardYellow2: {
    width: 90, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#F4FBA3;',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  
  smallCardTextYellow2: {
    color: '#595959',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
  courseCardBlue2: {
    width: 76, 
    height: 253,
    borderRadius: 4,
    backgroundColor: '#E0EBFF',
    elevation: 4,
    marginRight:10,
    alignItems: 'left',
    marginBottom:40,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerCardBlue2: {
    width: 76, 
    height: 27,
    borderRadius: 4,
    backgroundColor: '#87A4DA',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center'
  },
  headerCardTitle2: {
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  smallCardBlue2: {
    width: 65, 
    height: 35,
    borderRadius: 4,
    backgroundColor: '#87A4DA',
    alignItems: 'left',
    padding:4,
    borderWidth: 2, 
    borderColor:'#E8E8E8',
    alignItems:'center',
    marginLeft:7,
    marginTop:7,
  },
  smallCardWhite2: {
    width: 50, 
    height: 20,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    alignItems:'center',
    marginTop:2,
  },
  smallCardTextBlue2: {
    color: '#C8272E',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    margin:5,
  },
})

export default RequestsLecturer; 


